import { Injectable } from '@angular/core';

import { ScrappedTrack } from '../models/lastfm.models';

@Injectable({ providedIn: 'root' })
export class ScrapperService {

    constructor() {
    }

    public scrap(html: string): ScrappedTrack[] {
        const parser = new DOMParser();
        const root = parser.parseFromString(html, 'text/html');
        const chartlistTableRows: HTMLCollectionOf<HTMLTableRowElement> = root.getElementsByClassName('chartlist-row') as HTMLCollectionOf<HTMLTableRowElement>;
        
        const tracks: ScrappedTrack[] = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < chartlistTableRows.length; i++) {
            const track = {} as ScrappedTrack;
            const tableRow = chartlistTableRows[i];
            track.img = tableRow.getElementsByTagName('img')[0].src;
            track.name = tableRow.getElementsByClassName('chartlist-name')[0].children[0].innerHTML;
            track.artist = tableRow.getElementsByClassName('chartlist-artist')[0].children[0].innerHTML;
            track.scrobbles = parseFloat(tableRow.getElementsByClassName('chartlist-count-bar-value')[0].textContent.trim());
            tracks.push(track);
        }
        return (tracks);
    }

}
