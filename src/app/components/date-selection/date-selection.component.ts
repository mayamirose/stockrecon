import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {StockDataStoreService} from '../../services/stock-data-store.service';
import {Subject} from 'rxjs';
import {DatePipe} from '@angular/common';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.scss']
})
export class DateSelectionComponent implements OnInit, OnDestroy {

  today: string;
  selectedDate: string;
  periodInput = new FormControl(10, [Validators.min(10), Validators.max(30)]);
  private ngUnsubscribe = new Subject();

  constructor(private stockDataStoreService: StockDataStoreService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    // Format today's date to default html datepicker date
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.dateListener();
    this.formListener();

    // Init to default values
    this.selectDate(this.today);
    this.selectTimePeriod(10);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Listen for selected date change
  dateListener(): void {
    this.stockDataStoreService.selectedDateX.pipe(takeUntil(this.ngUnsubscribe)).subscribe(resp => {
      this.selectedDate = resp;
    });
  }

  formListener(): void {
    // Give user time to finish input before checking if below min or max
    this.periodInput.valueChanges.pipe(takeUntil(this.ngUnsubscribe),
      distinctUntilChanged(),
      debounceTime(700)).subscribe(resp => {
      if (this.periodInput.hasError('min')) {
        this.periodInput.setValue(10);
      } else if (this.periodInput.hasError('max')) {
        this.periodInput.setValue(30);
      }

      this.selectTimePeriod(this.periodInput.value);
    });
  }

  selectDate(date: string): void {
    this.stockDataStoreService.selectDate(date);
  }

  selectTimePeriod(days: number): void {
    this.stockDataStoreService.selectTimePeriod(days);
  }
}
