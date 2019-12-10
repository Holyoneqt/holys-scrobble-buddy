import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from './store/index.store';
import { getUserProfile } from './store/states/app.state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public userProfile$: Observable<CurrentUsersProfileResponse>;

    constructor(private store: Store<State>) { }

    public ngOnInit(): void {
        this.userProfile$ = this.store.pipe(select(getUserProfile));
    }

}
