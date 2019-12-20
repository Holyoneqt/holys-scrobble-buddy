import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artist } from 'src/app/models/lastfm.models';
import { DialogService } from 'src/app/services/dialog.service';
import { LastfmService } from 'src/app/services/lastfm.service';
import { LocalStorageKey, LocalStorageService } from 'src/app/services/localstorage.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public weeklyArtistsChart: Observable<Artist[]>;

    constructor(private localStorage: LocalStorageService, private dialogService: DialogService, private lastfm: LastfmService, private spotify: SpotifyService) { }

    public ngOnInit(): void {
        if (!this.localStorage.get(LocalStorageKey.LastfmName)) {
            this.dialogService.openPromptDialog({
                label: 'last.fm Username',
                placeholder: 'Enter your last.fm name...',
                submitText: 'Save',
            }).subscribe(lastfmName => {
                this.localStorage.set(LocalStorageKey.LastfmName, lastfmName);
                this.weeklyArtistsChart = this.lastfm.getWeeklyArtistChart().pipe(
                    map(response => response.weeklyartistchart.artist.slice(0, 5)),
                );
            });
        } else {
            this.weeklyArtistsChart = this.lastfm.getWeeklyArtistChart().pipe(
                map(response => response.weeklyartistchart.artist.slice(0, 5)),
            );
        }

        // this.lastfm.getTopTracks(new Date(), new Date()).subscribe(r => console.log(r));
        this.spotify.searchTrack('Astoria', 'STRFKR').subscribe(response => console.log(response));
    }

}
