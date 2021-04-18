import { ScrappedItem } from '../models/lastfm.models';

export class LastfmScrapper {

    private parser = new DOMParser();

    constructor() {
    }

    public scrapArtist(html: string): ScrappedItem[] {
        return this.scrapDataList(this.parseHtml(html)).map<ScrappedItem>(row => ({
            type: 'artist',
            img: row.scrapFirstByTag<HTMLImageElement>('img').src,
            artist: row.scrapFirstByClassName('chartlist-name').children[0].innerHTML,
            scrobbels: parseFloat(row.scrapFirstByClassName('chartlist-count-bar-value').textContent.replace(',', '').trim()),
        }))
    }

    public scrapAlbums(html: string): ScrappedItem[] {
        return this.scrapDataList(this.parseHtml(html)).map<ScrappedItem>(row => ({
            type: 'album',
            img: row.scrapFirstByTag<HTMLImageElement>('img').src,
            album: row.scrapFirstByClassName('chartlist-name').children[0].innerHTML,
            artist: row.scrapFirstByClassName('chartlist-artist').children[0].innerHTML,
            scrobbels: parseFloat(row.scrapFirstByClassName('chartlist-count-bar-value').textContent.trim()),
        }));
    }

    public scrapTracks(html: string): ScrappedItem[] {
        return this.scrapDataList(this.parseHtml(html)).map<ScrappedItem>(row => ({
            type: 'track',
            img: row.scrapFirstByTag<HTMLImageElement>('img').src,
            track: row.scrapFirstByClassName('chartlist-name').children[0].innerHTML,
            artist: row.scrapFirstByClassName('chartlist-artist').children[0].innerHTML,
            scrobbels: parseFloat(row.scrapFirstByClassName('chartlist-count-bar-value').textContent.trim()),
        }));
    }

    public scrapAlbumDetails(html: string): ScrappedItem[] {
        const htmlDoc = this.parseHtml(html);
        const albumName = htmlDoc.getElementsByClassName('library-header-title')[0].innerHTML;
        const artistName = htmlDoc.getElementsByClassName('text-colour-link')[0].innerHTML

        return this.scrapDataList(htmlDoc).map<ScrappedItem>(row => ({
            type: 'track',
            album: albumName,
            artist: artistName,
            img: row.scrapFirstByTag<HTMLImageElement>('img').src,
            track: row.scrapFirstByClassName('chartlist-name').children[0].innerHTML,
            scrobbels: parseFloat(row.scrapFirstByClassName('chartlist-count-bar-value').textContent.trim()),
        }));
    }

    public scrapTopAlbumsOfArtist(html: string): ScrappedItem[] {
        const htmlDoc = this.parseHtml(html);
        const artistName = (htmlDoc.getElementsByClassName('library-header-crumb')[0] as HTMLAnchorElement).text.trim();

        return this.scrapDataList(htmlDoc).map<ScrappedItem>(row => ({
            type: 'album',
            artist: artistName,
            img: row.scrapFirstByTag<HTMLImageElement>('img').src,
            album: row.scrapFirstByClassName('chartlist-name').children[0].innerHTML,
            scrobbels: parseFloat(row.scrapFirstByClassName('chartlist-count-bar-value').textContent.replace(',', '').trim()),
        }));
    }

    public scrapTopTracksOfArtist(html: string): ScrappedItem[] {
        const htmlDoc = this.parseHtml(html);
        const artistName = (htmlDoc.getElementsByClassName('library-header-crumb')[0] as HTMLAnchorElement).text.trim();

        return this.scrapDataList(htmlDoc).map<ScrappedItem>(row => ({
            type: 'track',
            artist: artistName,
            img: row.scrapFirstByTag<HTMLImageElement>('img').src,
            track: row.scrapFirstByClassName('chartlist-name').children[0].innerHTML,
            scrobbels: parseFloat(row.scrapFirstByClassName('chartlist-count-bar-value').textContent.replace(',', '').trim()),
        }));
    }

    private parseHtml(html: string) {
        return this.parser.parseFromString(html, 'text/html');
    }

    private scrapDataList(htmlDocument: Document): Scrapable[] {
        return Array.from(htmlDocument.getElementsByClassName('chartlist-row') as HTMLCollectionOf<HTMLTableRowElement>)
            .map(e => new Scrapable(e));
    }

    // private scrapDataListForDetails(html: string, chartlistClass: string = 'chartlist'): Scrapable[] {
    //     const root = this.parser.parseFromString(html, 'text/html');
    //     const chartlist = root.getElementsByClassName(chartlistClass)[0];
    //     return Array.from(chartlist.getElementsByClassName('chartlist-row') as HTMLCollectionOf<HTMLTableRowElement>)
    //         .map(e => new Scrapable(e));
    // }

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
