import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../../_store/app.state';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from '../../_store/shared/shared.action';
import { signupStartAction } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  // inject
  private _store = inject(Store<AppState>);
  public signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
        ),
      ]),
    });
  }

  onSignUp() {
    if (!this.signupForm.valid) {
      return;
    }
    const name = this.signupForm.value.name;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    // dispatch the action
    this._store.dispatch(setLoadingSpinner({ status: true }));
    this._store.dispatch(signupStartAction({ name, email, password }));
  }
}
