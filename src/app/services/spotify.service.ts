import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SpotifyService {

    constructor() { }

    public login(): void {
        window.location.href =
            `https://accounts.spotify.com/authorize` +
            `?client_id=${environment.spotifyClientId}` +
            `&response_type=code` +
            `&redirect_uri=${environment.spotifyCallbackUrl}` +
            `&scope=playlist-modify-public playlist-read-private playlist-modify-private`;
    }

    public getAuthToken(loginCode: string): Promise<any> {
        return fetch(
            `https://accounts.spotify.com/api/token` +
            `?code=${loginCode}` +
            `&grant_type=authorization_code` +
            `&redirect_uri=${environment.spotifyCallbackUrl}`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(`${environment.spotifyClientId}:${environment.spotifyId}`)}`,
            }
        });
    }

}
