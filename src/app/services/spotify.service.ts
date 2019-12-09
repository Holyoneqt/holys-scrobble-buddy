import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { LocalStorageKey, LocalStorageService } from './localstorage.service';

@Injectable({ providedIn: 'root' })
export class SpotifyService {

    private readonly SPOTIFY_API_URL = 'https://api.spotify.com/v1';

    constructor(private localStorage: LocalStorageService) { }

    public login(): void {
        window.location.href =
            `https://accounts.spotify.com/authorize` +
            `?client_id=${environment.spotifyClientId}` +
            `&response_type=token` +
            `&redirect_uri=${environment.spotifyCallbackUrl}` +
            `&scope=playlist-modify-public playlist-read-private playlist-modify-private`;
    }

    public getUserProfile(): Promise<any> {
        return this.get('me');
    }

    public getUserPlaylists(): Promise<any> {
        return this.get('me/playlists?limit=50');
    }

    private get<T = any>(url: string): Promise<T> {
        return fetch(`${this.SPOTIFY_API_URL}/${url}`, {
            headers: {
                Authorization: 'Bearer ' + this.localStorage.get(LocalStorageKey.AccessToken)
            }
        }).then(response => response.json());
    }

}
