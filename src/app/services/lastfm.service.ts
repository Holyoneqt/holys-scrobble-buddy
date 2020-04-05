import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ScrappedArtist, ScrappedTrack, WeeklyArtistsChartsResponse } from '../models/lastfm.models';
import { LocalStorageKey, LocalStorageService } from './localstorage.service';
import { ScrapperService } from './scrapper.service';

@Injectable({ providedIn: 'root' })
export class LastfmService {

    private readonly LASTFM_API_URL = 'https://ws.audioscrobbler.com/2.0/';

    constructor(private http: HttpClient, private localStorage: LocalStorageService, private scrapper: ScrapperService) {
    }

    public getUserInfo(): Observable<any> {
        return this.get('user.getinfo', `user=${this.lastfmUserName()}`);
    }

    public getWeeklyArtistChart(): Observable<WeeklyArtistsChartsResponse> {
        return this.get('user.getweeklyartistchart', `user=${this.lastfmUserName()}`);
    }

    public getTopTracks(from: Date, to: Date, user?: string): Observable<ScrappedTrack[]> {
        return this.scrapTracks(from, to, user || this.lastfmUserName());
    }

    public getTopArtists(from: Date, to: Date): Observable<ScrappedArtist[]> {
        return this.scrapArtists(from, to);
    }

    private scrapTracks(from: Date, to: Date, user: string): Observable<ScrappedTrack[]> {
        return this.http.get(`
            https://cors-anywhere.herokuapp.com/` +
            `https://www.last.fm/user/${user}/library/tracks?from=${this.formatDate(from)}&to=${this.formatDate(to)}
        `, { responseType: 'text' }).pipe(
                map(response => this.scrapper.scrapTracks(response))
            );
    }

    private scrapArtists(from: Date, to: Date): Observable<ScrappedArtist[]> {
        return this.http.get(`
            https://cors-anywhere.herokuapp.com/` +
            `https://www.last.fm/user/${this.lastfmUserName()}/library/artists?from=${this.formatDate(from)}&to=${this.formatDate(to)}
        `, { responseType: 'text' }).pipe(
                map(response => this.scrapper.scrapArtist(response))
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