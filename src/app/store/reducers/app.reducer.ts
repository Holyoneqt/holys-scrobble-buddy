import { AppActions, AppActionTypes } from '../actions/app.actions';
import { AppState, initialAppState } from '../states/app.state';

export function appReducers(state: AppState = initialAppState, action: AppActions): AppState {
    switch (action.type) {
        case AppActionTypes.SetUserProfile: {
            return {
                ...state,
                userProfile: action.payload,
            };
        }

        case AppActionTypes.SetUserPlaylists: {
            return {
                ...state,
                userPlaylists: action.payload,
            };
        }

        default: {
            return state;
        }
    }
}
