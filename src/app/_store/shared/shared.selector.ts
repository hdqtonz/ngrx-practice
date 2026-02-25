import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

export const SHARED_STATE_NAME = 'shared';

const selectSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const selectLoading = createSelector(selectSharedState, (state) => state.showloading);

export const selectErrorMessage = createSelector(selectSharedState, (state) => state.errorMessage);
