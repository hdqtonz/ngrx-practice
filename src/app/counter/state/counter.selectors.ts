import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

export const COUNTER_STATE_NAME = 'counter';

export const selectCounterState = createFeatureSelector<CounterState>(COUNTER_STATE_NAME);

export const selectCount = createSelector(selectCounterState, (state) => state.counter);
export const selectChannalName = createSelector(selectCounterState, (state) => state.channalName);
