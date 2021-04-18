import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LastfmApiGetType, ScrappedItem } from 'src/app/lastfm/models/lastfm.models';

export interface LastfmListEvent {
    listItemClicked: ScrappedItem,
    type?: LastfmApiGetType,
    artist?: string,
    album?: string,
}

@Component({
    selector: 'app-lastfm-list',
    templateUrl: './lastfm-list.component.html',
    styleUrls: ['./lastfm-list.component.css']
})
export class LastfmListComponent implements OnInit {

    public _items: ScrappedItem[];

    @Input()
    public set items(items: ScrappedItem[]) {
        this._items = items;
        console.log(this._items);
        if (items && items[0]) {
            this.topScrobbels = this.items[0].scrobbels;
        }
    }
    public get items(): ScrappedItem[] { return this._items; }

    @Output()
    public event = new EventEmitter<LastfmListEvent>();

    private topScrobbels: number;

    constructor() { }

    public ngOnInit(): void { }

    public onClick(listItem: ScrappedItem): void {
        console.log(`lastfm list onclick;`, listItem);
        this.event.emit({ listItemClicked: listItem });
    }

    public calculateScrobbelsWidth(scrobbels: number): number {
        return (scrobbels * 100) / this.topScrobbels;
    }

}
