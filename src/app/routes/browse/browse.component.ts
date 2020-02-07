import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { DateSelectorComponent } from 'src/app/components/date-selector/date-selector.component';
import { ScrappedTrack } from 'src/app/models/lastfm.models';
import { LastfmService } from 'src/app/services/lastfm.service';
import { LocalStorageKey, LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

    public lastfmName: string;
    
    @ViewChild(DateSelectorComponent, { static: true })
    public dateSelector: DateSelectorComponent;

    public dateFrom: Date;
    public dateTo: Date;

    public loading$: BehaviorSubject<boolean>;
    public tracks$: Observable<ScrappedTrack[]>;

    private topScrobbels: number;
    
    constructor(private localStorage: LocalStorageService, private lastfm: LastfmService) { }

    public ngOnInit(): void {
        this.lastfmName = this.localStorage.get(LocalStorageKey.LastfmName);
        this.loading$ = new BehaviorSubject(false);
    }

    public searchLastfm(): void {
        this.loading$.next(true);
        this.dateSelector.closeExansionPanel();
        this.tracks$ = this.lastfm.getTopTracks(this.dateFrom, this.dateTo, this.lastfmName).pipe(
            tap(response => this.topScrobbels = response[0].scrobbels),
            finalize(() => this.loading$.next(false)),
        );
    }

    public calculateScrobbelsWidth(scrobbels: number): number {
        return (scrobbels * 100) / this.topScrobbels;
    }

}
