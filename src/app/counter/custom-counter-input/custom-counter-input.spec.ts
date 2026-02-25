import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCounterInput } from './custom-counter-input';

describe('CustomCounterInput', () => {
  let component: CustomCounterInput;
  let fixture: ComponentFixture<CustomCounterInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCounterInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCounterInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
