import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Counter } from './counter/counter';
import { provideState, StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';
import { COUNTER_STATE_NAME } from './state/counter.selectors';

const routes: Routes = [
  {
    path: '',
    component: Counter,
    providers: [provideState(COUNTER_STATE_NAME, counterReducer)],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class CounterModule {}
