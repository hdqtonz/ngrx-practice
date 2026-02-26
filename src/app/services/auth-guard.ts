import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppState } from '../_store/app.state';
import { Store } from '@ngrx/store';
import { exhaustMap, map, of, take } from 'rxjs';
import { isAuthenticated } from '../auth/state/auth.selector';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(isAuthenticated).pipe(
    take(1),
    map((isAuth: boolean) => {
      return isAuth ? true : router.createUrlTree(['/auth']);
    }),
  );
};
