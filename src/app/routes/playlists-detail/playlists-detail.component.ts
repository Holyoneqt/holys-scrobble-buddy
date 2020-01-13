import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-playlists-detail',
    templateUrl: './playlists-detail.component.html',
    styleUrls: ['./playlists-detail.component.css']
})
export class PlaylistsDetailComponent implements OnInit, OnDestroy {

    private currentPlaylistId: string;
    public subscription: Subscription;
    public playlist: SinglePlaylistResponse;

    constructor(private spotify: SpotifyService, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.subscription = this.route.paramMap.pipe(
            switchMap(paramMap => {
                this.currentPlaylistId = paramMap.get('id');
                return this.spotify.getPlaylist(paramMap.get('id'));
            })
        ).subscribe(playlist => {
            this.playlist = playlist;
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public addTracksToPlaylist(tracks: TrackObjectFull[]): void {
        this.spotify.addTracksToPlaylist(this.currentPlaylistId, tracks).pipe(
            switchMap(() => this.spotify.getPlaylist(this.currentPlaylistId)),
            map(response => this.playlist = response),
        ).subscribe();
    }

}
