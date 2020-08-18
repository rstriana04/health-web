import { ActionReducerMap } from '@ngrx/store';
import { LogInReducer, LogInState } from '../../core/log-in/store/reducers/log-in.reducer';

export interface AppState {
  logIn: LogInState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  logIn: LogInReducer
};
