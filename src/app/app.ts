import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { LoadingSpinner } from './shared/components/loading-spinner/loading-spinner';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectErrorMessage, selectLoading } from './_store/shared/shared.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, LoadingSpinner, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  // inject
  private _store = inject(Store);

  protected readonly title = signal('ngrx-counter');
  showLoading: Observable<boolean>;
  showError: Observable<string>;

  ngOnInit(): void {
    this.showLoading = this._store.select(selectLoading);
    this.showError = this._store.select(selectErrorMessage);
  }
}
