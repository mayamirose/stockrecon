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
  searchInput = new FormControl('', []);
  stocks: Stock[];
  filteredStocks: Stock[];
  searchInputFocus = false;
  error = false;
  private ngUnsubscribe = new Subject();

  constructor(private stockDataStoreService: StockDataStoreService,) {
  }

  ngOnInit(): void {
    this.stocks = this.stockDataStoreService.fetchStocks();
    this.filteredStocks = this.fetchStocks(this.searchInput.value);
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
      debounceTime(300)).subscribe(resp => {
      // Filter stocks by name or symbol based on input
      this.filteredStocks = this.fetchStocks(resp);
      if (this.filteredStocks.length > 0) {
        this.error = false;
      } else {
        this.error = true;
        this.stockDataStoreService.selectStock(null);
      }
    });
  }

  // Search for existing stock if user hits enter key or search button
  searchStock(identifier: string): void {
    if (identifier) {
      const stock = this.fetchStock(identifier);
      // If stock exists select it else set to null
      if (stock) {
        this.stockDataStoreService.selectStock(stock);
      } else {
        this.stockDataStoreService.selectStock(null);
      }
    }
  }

  // Select stock if user clicks on autocomplete stock
  selectStock(stock: Stock): void {
    if (stock) {
      this.searchInput.setValue(stock.symbol);
    }
    this.searchInputFocus = false;
    this.stockDataStoreService.selectStock(stock);
  }

  // Returns all stocks that contain the input in its symbol or name
  fetchStocks(id: string): Stock[] {
    return this.stocks?.filter(s => s.symbol.toLowerCase().includes(id?.toLowerCase()) || s.name.toLowerCase().includes(id?.toLowerCase()));
  }

  // Check if stock exists in list of stocks
  fetchStock(id: string): Stock {
    return this.stocks?.find(s => s.symbol.toLowerCase() === id.toLowerCase() || s.name.toLowerCase() === id.toLowerCase());
  }

  checkIfDisplayAutocomplete(): boolean {
    if (this.filteredStocks?.length > 0) {
      return this.searchInputFocus;
    } else {
      return false;
    }
  }
}
