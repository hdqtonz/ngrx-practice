import { createAction, props } from '@ngrx/store';
import { Register, User } from '../../models/user.model';

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';

export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';

export const loginStartAction = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>(),
);

export const loginSuccessAction = createAction(LOGIN_SUCCESS, props<{ user: User }>());

export const signupStartAction = createAction(
  SIGNUP_START,
  props<{ name: string; email: string; password: string }>(),
);

export const signupSuccessAction = createAction(SIGNUP_SUCCESS, props<{ register: Register }>());
