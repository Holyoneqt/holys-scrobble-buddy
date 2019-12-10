import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { State } from '../store/index.store';
import { getUserProfile } from '../store/states/app.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(private store: Store<State>, public router: Router) { }
    
    canActivate(): Observable<boolean> {
        return this.store.pipe(
            select(getUserProfile),
            map(userProfile => {
                if (userProfile === undefined) {
                    this.router.navigate(['login']);
                    return false;
                } else {
                    return true;
                }
            }),
        );
    }
}
