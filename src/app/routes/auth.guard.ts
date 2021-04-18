import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SpotifyService } from '../services/spotify.service';
import { SetUserProfile } from '../store/actions/app.actions';
import { State } from '../store/index.store';
import { getUserProfile } from '../store/states/app.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private store: Store<State>, private spotify: SpotifyService, public router: Router) { }

    canActivate(): Observable<boolean> {
        return combineLatest(
            this.spotify.getUserProfile(),
            this.store.select(getUserProfile)
        ).pipe(
            catchError(err => of([{ error: true }])),
            map(([response, userProfile]) => {
                if ((response as any).error) {
                    this.router.navigate(['login']);
                    return false;
                } else if (userProfile === undefined) {
                    this.store.dispatch(new SetUserProfile(response as CurrentUsersProfileResponse));
                    return true;
                } else {
                    return true;
                }
            }),
        );
    }
}
