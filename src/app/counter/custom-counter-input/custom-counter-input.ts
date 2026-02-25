import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Store } from '@ngrx/store';
import { changeChannalName, customeIncrement } from '../state/counter.action';
import { CounterState } from '../state/counter.state';
import { selectChannalName } from '../state/counter.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AppState } from '../../_store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './custom-counter-input.html',
  styleUrl: './custom-counter-input.scss',
})
export class CustomCounterInput implements OnInit {
  private _store = inject(Store<AppState>);

  public value: number;
  public channalName$: Observable<string>;

  ngOnInit(): void {
    this.channalName$ = this._store.select(selectChannalName);
  }

  onAdd() {
    this._store.dispatch(customeIncrement({ count: +this.value }));
    console.log(this.value);
  }

  onChangeChannalName() {
    this._store.dispatch(changeChannalName({ channalName: 'Hiten Channal' }));
  }
}
