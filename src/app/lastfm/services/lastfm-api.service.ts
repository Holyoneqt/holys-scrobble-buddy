import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LastfmApiGetCall, LastfmApiGetType, ScrappedItem } from 'src/app/lastfm/models/lastfm.models';
import { LocalStorageKey, LocalStorageService } from 'src/app/services/localstorage.service';

import { LastfmScrapper } from '../util/lastfm-scrapper';
import { getParsedLastfmDate } from '../util/lastfm.util';
import { LastfmHttpService } from './lastfm-http.service';

@Injectable({ providedIn: 'root' })
export class LastfmApiService {

    private readonly LASTFM_BASE_URL = (username: string) => `https://cors-anywhere.herokuapp.com/https://www.last.fm/user/${username}/library`;
    private readonly API_REGISTRY: {
        [key in LastfmApiGetType]: (parameters: { [key: string]: string }) => string
    } = {
            'artists': (parameters) => `${this.LASTFM_BASE_URL(parameters['user'])}/artists`,
            'topTracksOfArtist': (parameters) => `${this.LASTFM_BASE_URL(parameters['user'])}/music/${parameters['artistName']}/+tracks`,
            'topAlbumsOfArtist': (parameters) => `${this.LASTFM_BASE_URL(parameters['user'])}/music/${parameters['artistName']}/+albums`,
            'albumDetail': (parameters) => `${this.LASTFM_BASE_URL(parameters['user'])}/music/${parameters['artistName']}/${parameters['albumName']}`,
            'albums': (parameters) => `${this.LASTFM_BASE_URL(parameters['user'])}/albums`,
            'tracks': (parameters) => `${this.LASTFM_BASE_URL(parameters['user'])}/tracks`,
        };

    public timePeriod: BehaviorSubject<{ from: Date, to: Date }>;
    public user: BehaviorSubject<string>;

    public currentRoute: BehaviorSubject<string>;

    constructor(private lastfmHttpService: LastfmHttpService, private localStorageService: LocalStorageService) {
        this.timePeriod = new BehaviorSubject({ from: new Date(), to: new Date() });
        this.user = new BehaviorSubject(this.localStorageService.get(LocalStorageKey.LastfmName));
        this.currentRoute = new BehaviorSubject('');
    }

    public getUserInfo(): Observable<any> {
        return this.lastfmHttpService.getUserInfo();
    }

    public get(get: LastfmApiGetCall): Observable<ScrappedItem[]> {
        this.currentRoute.next(get.type);
        get.parameters = get.parameters || {};
        get.parameters.user = get.parameters.user || this.user.value;
        get.parameters.from = get.parameters.from || this.timePeriod.value.from;
        get.parameters.to = get.parameters.to || this.timePeriod.value.to;

        console.log('lastfmapi get:', get);
        let lastfmUrlToCall = this.API_REGISTRY[get.type](get.parameters);
        lastfmUrlToCall += `?${getParsedLastfmDate(get.parameters)}`;
        lastfmUrlToCall = (lastfmUrlToCall as any).replaceAll(' ', '+');
        console.log('calling:', lastfmUrlToCall);

        const scrapper = new LastfmScrapper();
        return this.lastfmHttpService.getAsText(lastfmUrlToCall).pipe(
            map(response => {
                switch (get.type) {
                    case 'artists': return scrapper.scrapArtist(response);
                    case 'albums': return scrapper.scrapAlbums(response);
                    case 'tracks': return scrapper.scrapTracks(response);
                    case 'topTracksOfArtist': return scrapper.scrapTopTracksOfArtist(response);
                    case 'topAlbumsOfArtist': return scrapper.scrapTopAlbumsOfArtist(response);
                    case 'albumDetail': return scrapper.scrapAlbumDetails(response);
                }
            }),
        );
    }

}
