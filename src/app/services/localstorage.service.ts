import { Injectable } from '@angular/core';

export enum LocalStorageKey {
    AccessToken = 'hsb-acces_token',
    TokenExpiresIn = 'hsb-expires_in',
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    constructor() {}

    public set(key: LocalStorageKey, value: string): void {
        return localStorage.setItem(key, value);
    }

    public get(key: LocalStorageKey): string {
        return localStorage.getItem(key);
    }

}
