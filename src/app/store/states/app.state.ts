import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from '../index.store';

export interface AppState {
    userProfile?: CurrentUsersProfileResponse;
}

export const initialAppState = {};

export const getAppState = createFeatureSelector<State, AppState>('app');
export const getUserProfile = createSelector(getAppState, (state: AppState) => state.userProfile);
