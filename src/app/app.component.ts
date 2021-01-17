import {Component} from '@angular/core';
import {StockDataStoreService} from './services/stock-data-store.service';
import {Stock} from './models/stock';
import {SocialMedia} from './models/social-media';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LogMeIn Technical Test';
  selectedDate: string;
  selectedDays: number;
  selectedStock: Stock;
  selectedSocial: SocialMedia;

  constructor(private stockDataStoreService: StockDataStoreService) {
    this.dataListener();
  }

  // Listen for all required data for the stock data recommendation component
  dataListener(): void {
    this.stockDataStoreService.selectedDateX.subscribe(resp => {
      this.selectedDate = resp;
    });

    this.stockDataStoreService.selectedDaysX.subscribe(resp => {
      this.selectedDays = resp;
    });

    this.stockDataStoreService.selectedStockX.subscribe(resp => {
      this.selectedStock = resp;
    });

    this.stockDataStoreService.selectedSocialX.subscribe(resp => {
      this.selectedSocial = resp;
    });
  }
}
