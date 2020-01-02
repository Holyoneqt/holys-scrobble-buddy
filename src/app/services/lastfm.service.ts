import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ScrappedTrack, WeeklyArtistsChartsResponse } from '../models/lastfm.models';
import { LocalStorageKey, LocalStorageService } from './localstorage.service';
import { ScrapperService } from './scrapper.service';

@Injectable({ providedIn: 'root' })
export class LastfmService {

    private readonly LASTFM_API_URL = 'http://ws.audioscrobbler.com/2.0/';

    constructor(private http: HttpClient, private localStorage: LocalStorageService, private scrapper: ScrapperService) {
    }

    public getUserInfo(): Observable<any> {
        return this.get('user.getinfo', `user=${this.lastfmUserName()}`);
    }

    public getWeeklyArtistChart(): Observable<WeeklyArtistsChartsResponse> {
        return this.get('user.getweeklyartistchart', `user=${this.lastfmUserName()}`);
    }

    public getTopTracks(from: Date, to: Date): Observable<ScrappedTrack[]> {
        return this.scrap(from, to);
    }

    private scrap(from: Date, to: Date): Observable<ScrappedTrack[]> {
        return this.http.get(`
            https://cors-anywhere.herokuapp.com/` + 
            `https://www.last.fm/user/${this.lastfmUserName()}/library/tracks?from=${this.formatDate(from)}&to=${this.formatDate(to)}
        `, {responseType: 'text'}).pipe(
            map(response => this.scrapper.scrap(response))
        );
    }

    private get<T = any>(method: string, ...additionalParams: string[]): Observable<T> {
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

    private formatDate(date: Date): string {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

}
