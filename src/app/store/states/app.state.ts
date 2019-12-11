import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../index.store';

export interface AppState {
    userProfile?: CurrentUsersProfileResponse;
    userPlaylists?: PlaylistObjectSimplified[];
}

export const initialAppState = {};

export const getAppState = createFeatureSelector<State, AppState>('app');
export const getUserProfile = createSelector(getAppState, (state: AppState) => state.userProfile);
export const getUserPlaylists = createSelector(getAppState, (state: AppState) => state.userPlaylists);
