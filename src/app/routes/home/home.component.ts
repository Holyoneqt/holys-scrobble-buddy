import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SpotifyService } from 'src/app/services/spotify.service';
import { State } from 'src/app/store/index.store';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    constructor(private store: Store<State>, private spotify: SpotifyService) { }

    public async ngOnInit(): Promise<void> {
    }

}
