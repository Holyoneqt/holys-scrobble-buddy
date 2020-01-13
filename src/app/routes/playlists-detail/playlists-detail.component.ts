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

    private currentPlaylistId: string;
    public playlist$: Observable<SinglePlaylistResponse>;

    constructor(private spotify: SpotifyService, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.playlist$ = this.route.paramMap.pipe(
            switchMap(paramMap => {
                console.log(paramMap.get('id'));
                this.currentPlaylistId = paramMap.get('id');
                return this.spotify.getPlaylist(paramMap.get('id'));
            })
        );
    }

    public addTracksToPlaylist(tracks: TrackObjectFull[]): void {
        this.spotify.addTracksToPlaylist(this.currentPlaylistId, tracks).subscribe(() => {
            this.playlist$ = this.spotify.getPlaylist(this.currentPlaylistId);
        });
    }

}
