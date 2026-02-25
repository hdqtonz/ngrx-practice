import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home').then((c) => c.Home) },
  {
    path: 'counter',
    loadChildren: () => import('./counter/counter.module').then((m) => m.CounterModule),
  },
  { path: 'posts', loadChildren: () => import('./posts/posts.module').then((m) => m.PostsModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
];
