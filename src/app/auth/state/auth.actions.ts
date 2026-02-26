import { createAction, props } from '@ngrx/store';
import { Register, User } from '../../models/user.model';

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';

export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';

export const AUTO_LOGIN_ACTION = '[auth page] auto login';

export const LOGOU_ACTION = '[auth page] logout';

export const loginStartAction = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>(),
);
export const loginSuccessAction = createAction(
  LOGIN_SUCCESS,
  props<{ user: User; redirect: boolean }>(),
);

export const signupStartAction = createAction(
  SIGNUP_START,
  props<{ name: string; email: string; password: string }>(),
);
export const signupSuccessAction = createAction(SIGNUP_SUCCESS, props<{ register: Register }>());

export const autoLoginAction = createAction(AUTO_LOGIN_ACTION);
export const autoLogoutAction = createAction(LOGOU_ACTION);
export const dummyAction = createAction('[dummy action] dummy action');
