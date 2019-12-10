import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LocalStorageKey, LocalStorageService } from './localstorage.service';

@Injectable({ providedIn: 'root' })
export class SpotifyService {

    private readonly SPOTIFY_API_URL = 'https://api.spotify.com/v1';

    constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

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

    private get<T = any>(url: string): Observable<T> {
        return this.http.get<T>(`${this.SPOTIFY_API_URL}/${url}`, {
            headers: {
                Authorization: 'Bearer ' + this.localStorage.get(LocalStorageKey.AccessToken)
            }
        });
    }

}
