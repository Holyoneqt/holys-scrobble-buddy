import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-playlists-detail',
    templateUrl: './playlists-detail.component.html',
    styleUrls: ['./playlists-detail.component.css']
})
export class PlaylistsDetailComponent implements OnInit {

    public playlist$: Observable<SinglePlaylistResponse>;

    constructor(private spotify: SpotifyService, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.playlist$ = this.route.paramMap.pipe(
            switchMap(paramMap => this.spotify.getPlaylist(paramMap.get('id')))
        );
        this.playlist$.subscribe(p => console.log(p));
    }

}
