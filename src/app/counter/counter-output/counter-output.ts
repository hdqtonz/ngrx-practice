import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { selectCount } from '../state/counter.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AppState } from '../../_store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.html',
  imports: [AsyncPipe],
  styleUrl: './counter-output.scss',
})
export class CounterOutput implements OnInit {
  public counter$: Observable<number>;

  private _store = inject(Store<AppState>);

  ngOnInit(): void {
    this.counter$ = this._store.select(selectCount);
  }
}
