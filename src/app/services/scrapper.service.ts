import { Injectable } from '@angular/core';
import { element } from 'protractor';

import { ScrappedArtist, ScrappedTrack } from '../models/lastfm.models';

@Injectable({ providedIn: 'root' })
export class ScrapperService {

    private parser = new DOMParser();

    constructor() {
    }

    public scrapTracks(html: string): ScrappedTrack[] {
        return this.scrapDataList(html).map<ScrappedTrack>(row => {
            return {
                img: row.scrapFirstByTag<HTMLImageElement>('img').src,
                name: row.scrapFirstByClassName('chartlist-name').children[0].innerHTML,
                artist: row.scrapFirstByClassName('chartlist-artist').children[0].innerHTML,
                scrobbels: parseFloat(row.scrapFirstByClassName('chartlist-name').textContent.trim()),
            };
        });
    }

    public scrapArtist(html: string): ScrappedArtist[] {
        return this.scrapDataList(html).map<ScrappedArtist>(row => {
            return {
                img: row.scrapFirstByTag<HTMLImageElement>('img').src,
                name: row.scrapFirstByClassName('chartlist-name').children[0].innerHTML,
                scrobbels: parseFloat(row.scrapFirstByClassName('chartlist-name').textContent.trim()),
            };
        });
    }

    private scrapDataList(html: string): Scrapable[] {
        const root = this.parser.parseFromString(html, 'text/html');
        return Array.from(root.getElementsByClassName('chartlist-row') as HTMLCollectionOf<HTMLTableRowElement>)
            .map(e => new Scrapable(e));
    }

}

class Scrapable {

    private element: HTMLElement;

    constructor(e: HTMLElement) {
        this.element = e;
    }

    public scrapFirstByTag<T extends HTMLElement>(tag: string): T {
        return this.element.getElementsByTagName(tag)[0] as T;
    }

    public scrapFirstByClassName<T extends HTMLElement>(className: string): T {
        return this.element.getElementsByClassName(className)[0] as T;
    }

}
