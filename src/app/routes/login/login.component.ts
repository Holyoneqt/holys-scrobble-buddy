import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageKey, LocalStorageService } from 'src/app/services/localstorage.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-login',
    template: `
        <mat-spinner style="margin: 80px auto;" mode="indeterminate"></mat-spinner>
        <h1 style="text-align: center; font-family: 'Amatic SC'">Logging you in...</h1>
    `,
})
export class LoginComponent implements OnInit {

    constructor(private spotify: SpotifyService, private localStorage: LocalStorageService, private router: Router, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.route.fragment.subscribe(hashFragment => {
            const accessToken = new URLSearchParams(hashFragment).get('access_token');
            const expiresIn = new URLSearchParams(hashFragment).get('expires_in');
            if (!accessToken) {
                this.spotify.login();
            } else {
                this.localStorage.set(LocalStorageKey.AccessToken, accessToken);
                this.localStorage.set(LocalStorageKey.TokenExpiresIn, expiresIn);
                this.router.navigate(['home']);
            }
        });
    }

}
