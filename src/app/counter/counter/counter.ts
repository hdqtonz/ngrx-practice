import { Component } from '@angular/core';
import { CounterButtons } from '../counter-buttons/counter-buttons';
import { CounterOutput } from '../counter-output/counter-output';
import { CustomCounterInput } from '../custom-counter-input/custom-counter-input';

@Component({
  selector: 'app-counter',
  imports: [CounterButtons, CounterOutput, CustomCounterInput],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {}
