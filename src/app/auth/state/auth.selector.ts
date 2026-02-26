import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(selectAuthState, (state) =>
  state.user ? true : false,
);

export const getToken = createSelector(selectAuthState, (state) =>
  state.user ? state.user?.userToken : null,
);
