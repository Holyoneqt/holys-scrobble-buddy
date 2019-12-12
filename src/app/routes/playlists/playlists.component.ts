import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { DialogService } from 'src/app/services/dialog.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { SetUserPlaylists } from 'src/app/store/actions/app.actions';
import { State } from 'src/app/store/index.store';
import { getUserPlaylists, getUserProfile } from 'src/app/store/states/app.state';

@Component({
    selector: 'app-playlists',
    templateUrl: './playlists.component.html',
    styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

    public playlists$: Observable<PlaylistObjectSimplified[]>;

    constructor(private store: Store<State>, private spotify: SpotifyService, private dialogService: DialogService) { }

    public async ngOnInit(): Promise<void> {
        this.fetchPlaylists();

        // get user profile and user playlists, then filter the ones user created themselfes
        this.playlists$ = combineLatest(
            this.store.select(getUserProfile),
            this.store.select(getUserPlaylists),
        ).pipe(
            tap(([userProfile, userPlaylists]) => console.log(userProfile, userPlaylists)),
            filter(([userProfile, userPlaylists]) => userPlaylists !== undefined && userProfile !== undefined),
            map(([userProfile, userPlaylists]) => userPlaylists.filter(playlist => playlist.owner.id === userProfile.id)),
        );
    }

    public openCreatePlaylistDialog(): void {
        this.dialogService.openPromptDialog({
            label: 'Playlist Name',
            placeholder: 'Enter a name...',
            submitText: 'Create Playlist',
        }).subscribe(newPlaylistName => {
            console.log(newPlaylistName);
            // if (newPlaylistName) {
            //     this.spotify.createPlaylist(newPlaylistName).subscribe(() => {
            //         this.fetchPlaylists();
            //     });
            // }
        });
    }

    private fetchPlaylists(): void {
        this.spotify.getUserPlaylists().subscribe(playlistsResponse => {
            this.store.dispatch(new SetUserPlaylists(playlistsResponse.items));
        });
    }

}
