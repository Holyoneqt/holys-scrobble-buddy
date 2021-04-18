import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { LocalStorageKey, LocalStorageService } from 'src/app/services/localstorage.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { SetUserProfile } from 'src/app/store/actions/app.actions';
import { State } from 'src/app/store/index.store';

@Component({
    selector: 'app-login',
    template: `
        <app-loading *ngIf="displayLoading$ |async" text="Logging you in..."></app-loading>
    `,
})
export class LoginComponent implements OnInit {

    public displayLoading$: BehaviorSubject<boolean>;

    constructor(private spotify: SpotifyService, private store: Store<State>, private localStorage: LocalStorageService, private router: Router, private route: ActivatedRoute,
        private dialogService: DialogService) {
        this.displayLoading$ = new BehaviorSubject(true);
    }

    public ngOnInit(): void {
        this.route.fragment.subscribe(hashFragment => {
            const accessToken = new URLSearchParams(hashFragment).get('access_token');
            const expiresIn = new URLSearchParams(hashFragment).get('expires_in');
            if (!accessToken) {
                this.spotify.login();
            } else {
                if (!this.localStorage.get(LocalStorageKey.LastfmName)) {
                    this.displayLoading$.next(false);
                    this.dialogService.openPromptDialog({
                        label: 'last.fm Username',
                        placeholder: 'Enter your last.fm name...',
                        submitText: 'Save',
                    }).subscribe(lastfmName => {
                        this.localStorage.set(LocalStorageKey.LastfmName, lastfmName);
                        this.setAuthTokensAndRouteToHome(accessToken, expiresIn);
                    });
                } else {
                    this.setAuthTokensAndRouteToHome(accessToken, expiresIn);
                }
            }
        });
    }

    private setAuthTokensAndRouteToHome(accessToken: string, expiresIn: string) {
        this.localStorage.set(LocalStorageKey.AccessToken, accessToken);
        this.localStorage.set(LocalStorageKey.TokenExpiresIn, expiresIn);
        this.spotify.getUserProfile().subscribe(userProfile => {
            this.store.dispatch(new SetUserProfile(userProfile));
            this.router.navigate(['home']);
        });
    }

}
