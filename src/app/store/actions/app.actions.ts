import { Action } from '@ngrx/store';

export enum AppActionTypes {
    SetUserProfile = 'SET_USER_PROFILE',
}

export class SetUserProfile implements Action {
    readonly type = AppActionTypes.SetUserProfile;
    constructor(readonly payload?: CurrentUsersProfileResponse) {}
}

export type AppActions = SetUserProfile;
