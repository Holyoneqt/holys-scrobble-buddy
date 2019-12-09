import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private spotify: SpotifyService) { }

    public async ngOnInit(): Promise<void> {
        console.log(await this.spotify.getUserProfile());
        const playlists = await this.spotify.getUserPlaylists();
        console.log((await this.spotify.getUserPlaylists()).items.map(p => p.name));
    }

}
