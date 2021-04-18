import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DateSelectorComponent } from 'src/app/components/date-selector/date-selector.component';
import { LastfmListEvent } from 'src/app/components/lastfm/lastfm-list/lastfm-list.component';
import { LastfmApiGetCall, LastfmApiGetType, ScrappedItem } from 'src/app/lastfm/models/lastfm.models';
import { LastfmApiService } from 'src/app/lastfm/services/lastfm-api.service';
import { LocalStorageKey, LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit, AfterViewInit {

    public lastfmName: string;
    public selectedBrowseType: LastfmApiGetType = 'artists';

    @ViewChild(DateSelectorComponent, { static: true })
    public dateSelector: DateSelectorComponent;
    public params: { from: Date, to: Date };

    public loading$: BehaviorSubject<boolean>;
    public tracks$: Observable<ScrappedItem[]>;

    private shouldLoadAfterInit = false;
    private loadAfterInitParameters = {};

    constructor(private localStorage: LocalStorageService, public lastfmApi: LastfmApiService, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.lastfmApi.timePeriod.next({
                from: params.from ? new Date(params.from) : new Date(),
                to: params.to ? new Date(params.to) : new Date(),
            })

            if (params.from && params.to) {
                this.shouldLoadAfterInit = true;
                this.loadAfterInitParameters = { from: new Date(params.from), to: new Date(params.to) };
            }
        });

        this.lastfmName = this.localStorage.get(LocalStorageKey.LastfmName);
        this.loading$ = new BehaviorSubject(false);
    }

    public ngAfterViewInit(): void {
        if (this.shouldLoadAfterInit) {
            this.searchLastfm({ type: 'artists', parameters: this.loadAfterInitParameters });
        }
    }

    public handleLastfmListEvent(event: LastfmListEvent): void {
        switch (event.listItemClicked.type) {
            case 'artist':
                this.searchLastfm({ type: 'topTracksOfArtist', parameters: { artistName: event.listItemClicked.artist } });
                break;
            case 'album':
                this.searchLastfm({ type: 'albumDetail', parameters: { artistName: event.listItemClicked.artist, albumName: event.listItemClicked.album } });
                break;
            case 'track':
                // TODO: really do nothing
                // this.searchLastfm({ type: 'topTracksOfArtist', parameters: { artistName: event.listItemClicked.artist } });
                break;
            default:
                break;
        }
    }

    public selectBrowseType(browseType: LastfmApiGetType): void {
        this.selectedBrowseType = browseType;
        this.searchLastfm({ type: this.selectedBrowseType });
    }

    public searchLastfm(lastfmApiGetCall: LastfmApiGetCall): void {
        this.loading$.next(true);
        this.dateSelector.closeExansionPanel();
        this.tracks$ = this.lastfmApi.get(lastfmApiGetCall).pipe(
            finalize(() => this.loading$.next(false)),
        );
    }

}
