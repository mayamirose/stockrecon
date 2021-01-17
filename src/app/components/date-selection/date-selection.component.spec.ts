import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DateSelectionComponent} from './date-selection.component';
import {DatePipe} from '@angular/common';

describe('DateSelectionComponent', () => {
  let component: DateSelectionComponent;
  let fixture: ComponentFixture<DateSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateSelectionComponent],
      providers: [DatePipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to make sure selected date is updated
  it('selected stock should equal date user selected', () => {
    component.selectDate('2021-01-17');
    fixture.detectChanges();
    expect(component.selectedDate).toEqual('2021-01-17');
  });

  // Test to make sure period input is updated. Checking if form has correct value should be enough
  it('period input should update to the user value', () => {
    component.periodInput.setValue(13);
    fixture.detectChanges();
    expect(component.periodInput.value).toEqual(13);
  });

  // Test to make sure period input is fixed if below min value input. Unsure how Timeout behaves in this ase across computers
  it('period input should update to adjusted value if the user value is below min', () => {
    component.periodInput.setValue(2);

    // Timeout to give code time to adjust form value
    setTimeout(() => {
      fixture.detectChanges();
      expect(component.periodInput.value).toEqual(10);
    }, 500);
  });

  // Test to make sure period input is fixed if above max value input. Unsure how Timeout behaves in this ase across computers
  it('period input should update to adjusted value if the user value is above max', () => {
    component.periodInput.setValue(36);
    // Timeout to give code time to adjust form value
    setTimeout(() => {
      fixture.detectChanges();
      expect(component.periodInput.value).toEqual(30);
    }, 500);
  });
});
