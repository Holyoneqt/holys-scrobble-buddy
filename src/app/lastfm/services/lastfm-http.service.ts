import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LocalStorageKey, LocalStorageService } from '../../services/localstorage.service';

@Injectable({ providedIn: 'root' })
export class LastfmHttpService {

    private readonly LASTFM_API_URL = 'https://ws.audioscrobbler.com/2.0/';

    constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    }

    public getUserInfo(): Observable<any> {
        return this.getFromLastfm('user.getinfo', `user=${this.lastfmUserName()}`);
    }

    public getAsText(url: string): Observable<string> {
        return this.http.get(url, { responseType: 'text' });
    }

    private getFromLastfm<T = any>(method: string, ...additionalParams: string[]): Observable<T> {
        return this.http.get<T>(
            `${this.LASTFM_API_URL}/` +
            `?method=${method}` +
            `&api_key=${environment.lastfmClientId}` +
            `&format=json` +
            (additionalParams.length > 0 ? `&${additionalParams.join('&')}` : '')
        );
    }

    private lastfmUserName(): string {
        return this.localStorage.get(LocalStorageKey.LastfmName);
    }

}
