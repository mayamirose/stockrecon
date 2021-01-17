import {Component, OnDestroy, OnInit} from '@angular/core';
import {StockDataStoreService} from '../../services/stock-data-store.service';
import {Stock} from '../../models/stock';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-stock-selection',
  templateUrl: './stock-selection.component.html',
  styleUrls: ['./stock-selection.component.scss']
})
export class StockSelectionComponent implements OnInit, OnDestroy {

  selectedStock: Stock;
  searchInput = new FormControl(null, []);
  error = false;
  private ngUnsubscribe = new Subject();

  constructor(private stockDataStoreService: StockDataStoreService) {
  }

  ngOnInit(): void {
    this.stockListener();
    this.formListener();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Listen for selected stock variable changes
  stockListener(): void {
    this.stockDataStoreService.selectedStockX.pipe(takeUntil(this.ngUnsubscribe)).subscribe(resp => {
      this.selectedStock = resp;
    });
  }

  formListener(): void {
    // Give user time to finish input before checking if below min or max
    this.searchInput.valueChanges.pipe(takeUntil(this.ngUnsubscribe),
      distinctUntilChanged(),
      debounceTime(1000)).subscribe(resp => {
      this.selectStock(resp);
    });
  }

  selectStock(identifier: string): void {
    this.error = false;
    if (identifier) {
      // Check if stock exists
      const stock = this.stockDataStoreService.fetchStock(identifier);
      if (stock) {
        this.stockDataStoreService.selectStock(stock);
        return;
      } else {
        this.error = true;
      }
    }
    this.stockDataStoreService.selectStock(null);
  }
}
