import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { loginSuccessAction, signupSuccessAction } from './auth.actions';

const _authRecuder = createReducer(
  initialState,
  on(loginSuccessAction, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signupSuccessAction, (state, action) => {
    return {
      ...state,
      register: action.register,
    };
  }),
);

export function authReducer(state, action) {
  return _authRecuder(state, action);
}
