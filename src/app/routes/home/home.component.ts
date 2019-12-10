import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifyService } from 'src/app/services/spotify.service';
import { State } from 'src/app/store/index.store';
import { getUserProfile } from 'src/app/store/states/app.state';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public playlists$: Observable<ListOfCurrentUsersPlaylistsResponse>;

    constructor(private store: Store<State>, private spotify: SpotifyService) { }

    public async ngOnInit(): Promise<void> {
        // get user profile and user playlists, then filter the ones user created themselfes
        this.playlists$ = combineLatest(
            this.store.select(getUserProfile),
            this.spotify.getUserPlaylists(),
        ).pipe(
            map(([userProfile, playlistResponse]) => {
                return {
                    ...playlistResponse,
                    items: playlistResponse.items.filter(playlist => playlist.owner.id === userProfile.id),
                };
            }),
        );
    }

}
