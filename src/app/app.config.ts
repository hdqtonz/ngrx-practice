import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { RootReducer } from './_store/app.state';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthEffects } from './auth/state/auth.effects';
import { authInterceptor } from './interceptor/auth-interceptor';
import { provideRouterStore } from '@ngrx/router-store';
import { CustomSerializer } from './_store/router/custom-route-serializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideStore(RootReducer),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ logOnly: false }),
    provideRouterStore({ serializer: CustomSerializer }),
  ],
};
