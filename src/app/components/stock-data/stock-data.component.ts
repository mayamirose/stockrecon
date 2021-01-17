import {Component, OnDestroy, OnInit} from '@angular/core';
import {Stock} from '../../models/stock';
import {SocialMedia} from '../../models/social-media';
import {Recommendation, StockData, StockDataStoreService} from '../../services/stock-data-store.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-stock-data',
  templateUrl: './stock-data.component.html',
  styleUrls: ['./stock-data.component.scss']
})
export class StockDataComponent implements OnInit, OnDestroy {

  selectedDate: string;
  selectedDays: number;
  arrayOfDates: string[];
  selectedStock: Stock;
  selectedSocial: SocialMedia;
  stockDataMap: Map<string, StockData>;
  recommendations = Recommendation;
  private ngUnsubscribe = new Subject();

  constructor(private stockDataStoreService: StockDataStoreService) {
  }

  ngOnInit(): void {
    this.dataListener();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Listen for all required data for the stock data recommendation component
  dataListener(): void {
    this.stockDataStoreService.selectedDateX.pipe(takeUntil(this.ngUnsubscribe)).subscribe(resp => {
      this.selectedDate = resp;
    });

    this.stockDataStoreService.selectedDaysX.pipe(takeUntil(this.ngUnsubscribe)).subscribe(resp => {
      this.selectedDays = resp;
    });

    this.stockDataStoreService.arrayOfDatesX.pipe(takeUntil(this.ngUnsubscribe)).subscribe(resp => {
      this.arrayOfDates = resp;
    });

    this.stockDataStoreService.selectedStockX.pipe(takeUntil(this.ngUnsubscribe)).subscribe(resp => {
      this.selectedStock = resp;
    });

    this.stockDataStoreService.selectedSocialX.pipe(takeUntil(this.ngUnsubscribe)).subscribe(resp => {
      this.selectedSocial = resp;
    });

    this.stockDataStoreService.stockDataMapX.pipe(takeUntil(this.ngUnsubscribe)).subscribe(resp => {
      this.stockDataMap = resp;
      console.log(this.stockDataMap);
    });
  }
}
