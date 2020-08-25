import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogInState } from '../reducers/log-in.reducer';

export const selectStateLogIn = createFeatureSelector<LogInState>('logIn');
export const selectUserAuthenticated = createSelector(selectStateLogIn, state => state.userAuthenticated);
export const selectMessageError = createSelector(selectStateLogIn, state => state.message);
