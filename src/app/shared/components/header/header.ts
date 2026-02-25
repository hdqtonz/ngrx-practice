import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../_store/app.state';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../../auth/state/auth.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  // inject
  private _store = inject(Store<AppState>);

  // Obasrable
  public isAuthenticated: Observable<boolean>;

  ngOnInit(): void {
    this.isAuthenticated = this._store.select(isAuthenticated);
  }
}
