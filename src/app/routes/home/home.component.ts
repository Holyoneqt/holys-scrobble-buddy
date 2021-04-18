import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ScrappedItem } from 'src/app/lastfm/models/lastfm.models';
import { LastfmApiService } from 'src/app/lastfm/services/lastfm-api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { getCleanGeniusUrl } from 'src/app/util/global.util';

import { RewindDialogComponent, RewindDialogReturnData } from './components/rewind-dialog/rewind-dialog.component';

interface HomeTileData {
    icon: string;
    description: string;
    click?: () => void;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public readonly TILES: HomeTileData[] = [
        {
            icon: 'audiotrack',
            description: 'Browse last.fm',
            click: () => this.routeTo('browse'),
        },
        {
            icon: 'replay',
            description: 'It\'s rewind time',
            click: () => this.openRewindDialog(),
        },
    ];

    public loading$: BehaviorSubject<boolean>;
    public weeklyTopArtists$: Observable<ScrappedItem[]>;
    public currentlyPlayingTrack$: Observable<CurrentlyPlayingResponse>;

    constructor(private dialogService: DialogService, private lastfmApi: LastfmApiService, private spotify: SpotifyService,
                private router: Router) { }

    public ngOnInit(): void {
        this.loading$ = new BehaviorSubject(true);
        const lastWeek = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7));
        this.weeklyTopArtists$ = this.lastfmApi.get({
            type: 'artists',
            parameters: {
                from: lastWeek,
                to: new Date(),
            }
        }).pipe(
            map(artists => artists.map(a => ({ ...a, img: a.img.replace('/avatar70s', '') })).slice(0, 9)),
            finalize(() => this.loading$.next(false)),
        );

        this.currentlyPlayingTrack$ = this.spotify.getUsersCurrentlyPlayingTrack();
        // this.lastfm.getTopTracks(new Date(), new Date()).subscribe(r => console.log(r));
        // this.spotify.searchTrack('Astoria', 'STRFKR').subscribe(response => console.log(response));
    }

    public getGeniusUrl(track: CurrentlyPlayingResponse): string {
        return getCleanGeniusUrl(track.item.artists[0].name, track.item.name);
    }

    public routeTo(url: string): void {
        this.router.navigate([url]);
    }

    public openRewindDialog(): void {
        this.dialogService.open<RewindDialogReturnData>(RewindDialogComponent, {
            disableClose: false,
        }).subscribe((response: RewindDialogReturnData) => {
            console.log(response);
            this.router.navigate(['browse'], { queryParams: { from: response.from, to: response.to } });
        });
    }

}
