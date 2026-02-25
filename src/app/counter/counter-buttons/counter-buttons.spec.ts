import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterButtons } from './counter-buttons';

describe('CounterButtons', () => {
  let component: CounterButtons;
  let fixture: ComponentFixture<CounterButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterButtons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
