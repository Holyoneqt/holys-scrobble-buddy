import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { appReducers } from './reducers/app.reducer';
import { AppState } from './states/app.state';

export interface State {
    app: AppState;
}

export const reducers: ActionReducerMap<State> = {
    app: appReducers,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];

function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return (state: State, action: any): State => {
        console.log('DISPATCH:', action.type, '-', action.payload || 'No Payload');
        return reducer(state, action);
    };
}
