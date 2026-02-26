import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.state';
import { getToken } from '../auth/state/auth.selector';
import { exhaustMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<AppState>);
  return store.select(getToken).pipe(
    take(1),
    exhaustMap((token) => {
      if (!token) {
        return next(req);
      }

      const modifiedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next(modifiedReq);
    }),
  );
};
