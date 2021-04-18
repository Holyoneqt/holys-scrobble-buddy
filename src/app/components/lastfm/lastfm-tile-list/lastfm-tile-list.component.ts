import { Component } from '@angular/core';
import { LastfmApiGetType } from 'src/app/lastfm/models/lastfm.models';

import { LastfmListComponent } from '../lastfm-list/lastfm-list.component';

export interface LastfmListEvent {
    url: string,
    type?: LastfmApiGetType,
    artist?: string,
    album?: string,
}

@Component({
    selector: 'app-lastfm-tile-list',
    templateUrl: './lastfm-tile-list.component.html',
    styleUrls: ['./lastfm-tile-list.component.css']
})
export class LastfmTileListComponent extends LastfmListComponent {

    constructor() {
        super();
    }

}
