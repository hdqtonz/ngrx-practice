import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginStartAction } from '../state/auth.actions';
import { setLoadingSpinner } from '../../_store/shared/shared.action';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  // inject
  private _store = inject(Store);

  public loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    console.log(this.loginForm.value, 'value');
    // dispatch the action
    this._store.dispatch(setLoadingSpinner({ status: true }));
    this._store.dispatch(loginStartAction({ email, password }));
  }
}
