import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { State } from '../store/index.store';
import { getUserProfile } from '../store/states/app.state';
import { LocalStorageKey, LocalStorageService } from './localstorage.service';

@Injectable({ providedIn: 'root' })
export class SpotifyService {

    private readonly SPOTIFY_API_URL = 'https://api.spotify.com/v1';
    private userProfile: CurrentUsersProfileResponse;

    constructor(private http: HttpClient, private localStorage: LocalStorageService, private store: Store<State>) {
        this.store.pipe(select(getUserProfile)).subscribe(userProfile => this.userProfile = userProfile);
    }

    public login(): void {
        window.location.href =
            `https://accounts.spotify.com/authorize` +
            `?client_id=${environment.spotifyClientId}` +
            `&response_type=token` +
            `&redirect_uri=${environment.spotifyCallbackUrl}` +
            `&scope=playlist-modify-public playlist-read-private playlist-modify-private`;
    }

    public getUserProfile(): Observable<CurrentUsersProfileResponse> {
        return this.get('me');
    }

    public getUserPlaylists(): Observable<ListOfCurrentUsersPlaylistsResponse> {
        return this.get('me/playlists?limit=50');
    }

    public getPlaylist(id: string): Observable<SinglePlaylistResponse> {
        return this.get(`playlists/${id}`);
    }

    public createPlaylist(name: string): Observable<CreatePlaylistResponse> {
        return this.post(`users/${this.userProfile.id}/playlists`, { name });
    }

    private get<T = any>(url: string): Observable<T> {
        return this.http.get<T>(`${this.SPOTIFY_API_URL}/${url}`, {
            headers: {
                Authorization: 'Bearer ' + this.localStorage.get(LocalStorageKey.AccessToken)
            }
        });
    }

    private post<T = any>(url: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.SPOTIFY_API_URL}/${url}`, body, {
            headers: {
                Authorization: 'Bearer ' + this.localStorage.get(LocalStorageKey.AccessToken)
            }
        });
    }

}
