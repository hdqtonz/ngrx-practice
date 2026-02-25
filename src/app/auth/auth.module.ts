import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login/login';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { Signup } from './signup/signup';

const routes: Routes = [
  {
    path: '',
    providers: [provideEffects([AuthEffects])],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'signup', component: Signup },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthModule {}
