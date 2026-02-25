import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterOutput } from './counter-output';

describe('CounterOutput', () => {
  let component: CounterOutput;
  let fixture: ComponentFixture<CounterOutput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterOutput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterOutput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
