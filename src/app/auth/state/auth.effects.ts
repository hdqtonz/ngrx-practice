import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  autoLoginAction,
  autoLogoutAction,
  loginStartAction,
  loginSuccessAction,
  signupStartAction,
  signupSuccessAction,
} from './auth.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { IResult } from '../../models/api.response.model';
import { IAuthResponseData } from '../../models/auth-response.model';
import { AppState } from '../../_store/app.state';
import { Store } from '@ngrx/store';
import { setErrorMessage, setLoadingSpinner } from '../../_store/shared/shared.action';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  // inject
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private _store = inject(Store<AppState>);
  private _router = inject(Router);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStartAction),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data: IResult<IAuthResponseData>) => {
            // set loading spinner and error to be false
            this._store.dispatch(setLoadingSpinner({ status: false }));
            this._store.dispatch(setErrorMessage({ message: '' }));
            // handle the response
            const user = this.authService.formatUser(data.data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccessAction({ user, redirect: true });
          }),
          catchError((error) => {
            console.log(error.error.message);
            this._store.dispatch(setLoadingSpinner({ status: false }));
            return of(setErrorMessage({ message: error.error.message }));
          }),
        );
      }),
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccessAction),
        tap((action) => {
          if (action.redirect) {
            this._router.navigate(['/']);
          }
        }),
      );
    },
    { dispatch: false },
  );

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStartAction),
      exhaustMap((action) => {
        return this.authService.signup(action.name, action.email, action.password).pipe(
          map((data: IResult<any>) => {
            // set loading spinner and error to be false
            this._store.dispatch(setLoadingSpinner({ status: false }));
            this._store.dispatch(setErrorMessage({ message: '' }));
            // handle the response
            this._store.dispatch(
              loginStartAction({ email: action.email, password: action.password }),
            );
            return signupSuccessAction({ register: data.data });
          }),
          catchError((error) => {
            console.log(error.error.message);
            this._store.dispatch(setLoadingSpinner({ status: false }));
            return of(setErrorMessage({ message: error.error.message }));
          }),
        );
      }),
    );
  });

  autologin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLoginAction),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();

        return of(loginSuccessAction({ user, redirect: false }));
      }),
    );
  });

  autoLogout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogoutAction),
        map(() => {
          this.authService.logout();
          this._router.navigate(['auth']);
        }),
      );
    },
    { dispatch: false },
  );
}
