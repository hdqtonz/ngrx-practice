import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.action';
import { CounterState } from '../state/counter.state';
import { AppState } from '../../_store/app.state';

@Component({
  selector: 'app-counter-buttons',
  imports: [],
  templateUrl: './counter-buttons.html',
  styleUrl: './counter-buttons.scss',
})
export class CounterButtons {
  private _store = inject(Store<AppState>);

  onIncrement() {
    this._store.dispatch(increment());
  }

  onDecrement() {
    this._store.dispatch(decrement());
  }

  onReset() {
    this._store.dispatch(reset());
  }
}
