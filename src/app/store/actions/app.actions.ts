import { Action } from '@ngrx/store';

export enum AppActionTypes {
    SetUserProfile = 'SET_USER_PROFILE',
    SetUserPlaylists = 'SET_USER_PLAYLISTS',
}

export class SetUserProfile implements Action {
    readonly type = AppActionTypes.SetUserProfile;
    constructor(readonly payload?: CurrentUsersProfileResponse) {}
}

export class SetUserPlaylists implements Action {
    readonly type = AppActionTypes.SetUserPlaylists;
    constructor(readonly payload?: PlaylistObjectSimplified[]) {}
}

export type AppActions = SetUserProfile | SetUserPlaylists;
