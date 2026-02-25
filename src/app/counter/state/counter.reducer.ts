import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, customeIncrement, changeChannalName } from './counter.action';
import { initialState } from './counter.state';

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0,
    };
  }),
  on(customeIncrement, (state, action) => {
    console.log(action, 'action');
    return {
      ...state,
      counter: state.counter + action.count,
    };
  }),
  on(changeChannalName, (state, action) => {
    return {
      ...state,
      channalName: action.channalName,
    };
  }),
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
