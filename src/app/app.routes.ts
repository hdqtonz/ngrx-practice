import { Routes } from '@angular/router';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home').then((c) => c.Home) },
  {
    path: 'counter',
    loadChildren: () => import('./counter/counter.module').then((m) => m.CounterModule),
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then((m) => m.PostsModule),
    canActivate: [authGuard],
  },
  {
    path: 'posts/details/:id',
    loadComponent: () => import('./posts/single-post/single-post').then((c) => c.SinglePost),
    canActivate: [authGuard],
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
];
