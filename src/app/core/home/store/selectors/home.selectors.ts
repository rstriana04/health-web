import { createFeatureSelector } from '@ngrx/store';
import { HomeState } from '../reducers/home.reducer';

export const selectHomeState = createFeatureSelector<HomeState>('home');
