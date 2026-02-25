import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { loginSuccessAction } from './auth.actions';

const _authRecuder = createReducer(
  initialState,
  on(loginSuccessAction, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
);

export function authReducer(state, action) {
  return _authRecuder(state, action);
}
