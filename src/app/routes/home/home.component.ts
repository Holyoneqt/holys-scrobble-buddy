import { Component, OnInit } from '@angular/core';
import { ScrappedArtist } from 'src/app/models/lastfm.models';
import { DialogService } from 'src/app/services/dialog.service';
import { LastfmService } from 'src/app/services/lastfm.service';
import { LocalStorageKey, LocalStorageService } from 'src/app/services/localstorage.service';
import { SpotifyService } from 'src/app/services/spotify.service';

interface HomeTileData {
    icon: string;
    description: string;
    url: string;
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
            url: 'browse',
        },
        {
            icon: 'replay',
            description: 'It\'s rewind time',
            url: '',
        },
    ];

    public weeklyArtistsChart: ScrappedArtist[];

    constructor(private localStorage: LocalStorageService, private dialogService: DialogService, private lastfm: LastfmService, private spotify: SpotifyService) { }

    public ngOnInit(): void {
        if (!this.localStorage.get(LocalStorageKey.LastfmName)) {
            this.dialogService.openPromptDialog({
                label: 'last.fm Username',
                placeholder: 'Enter your last.fm name...',
                submitText: 'Save',
            }).subscribe(lastfmName => {
                this.localStorage.set(LocalStorageKey.LastfmName, lastfmName);
            });
        }

        let lastWeek = new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7));
        this.lastfm.getTopArtists(lastWeek, new Date()).subscribe(r => this.weeklyArtistsChart = r);
        // this.lastfm.getTopTracks(new Date(), new Date()).subscribe(r => console.log(r));
        // this.spotify.searchTrack('Astoria', 'STRFKR').subscribe(response => console.log(response));
    }

}
