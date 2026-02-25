import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { loginStartAction, loginSuccessAction } from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
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
            return loginSuccessAction({ user });
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
          this._router.navigate(['/']);
        }),
      );
    },
    { dispatch: false },
  );
}
