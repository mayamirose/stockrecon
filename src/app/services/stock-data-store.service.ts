import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Stock} from '../models/stock';
import {DataGenerationService} from './data-generation.service';
import {SocialMedia} from '../models/social-media';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StockDataStoreService {

  // Listener variables
  private selectedDate = new BehaviorSubject<string>(null);
  selectedDateX = this.selectedDate.asObservable();
  private selectedDays = new BehaviorSubject<number>(null);
  selectedDaysX = this.selectedDays.asObservable();
  private arrayOfDates = new BehaviorSubject<string[]>(null);
  arrayOfDatesX = this.arrayOfDates.asObservable();
  private selectedStock = new BehaviorSubject<Stock>(null);
  selectedStockX = this.selectedStock.asObservable();
  private selectedSocial = new BehaviorSubject<SocialMedia>(null);
  selectedSocialX = this.selectedSocial.asObservable();
  private stockDataMap = new BehaviorSubject<Map<string, StockData>>(null);
  stockDataMapX = this.stockDataMap.asObservable();

  stocks: Stock[];

  socials: SocialMedia[];

  constructor(private dataGenerationService: DataGenerationService) {
    this.stocksListener();
    this.socialsListener();

    // In real world application this would either be fetched on application load or every X minutes depending on purpose of app
    this.dataGenerationService.fetchStocks();
    this.dataGenerationService.fetchSocialMedias();
  }

  // Listen for stocks variable changes
  stocksListener(): void {
    this.dataGenerationService.stocksX.subscribe(resp => {
      this.stocks = resp;
      console.log('stocks: ', this.stocks);
    });
  }

  // Listen for socials variable changes
  socialsListener(): void {
    this.dataGenerationService.socialsX.subscribe(resp => {
      this.socials = resp;
    });
  }

  selectStock(stock: Stock): void {
    this.selectedStock.next(stock);
    this.initArrayOfDates(this.selectedDate.value, this.selectedDays.value);
  }

  // Check if stock exists in list of stocks
  fetchStock(id: string): Stock {
    return this.stocks.find(s => s.symbol.toLowerCase() === id.toLowerCase() || s.name.toLowerCase() === id.toLowerCase());
  }

  selectSocial(social: SocialMedia): void {
    this.selectedSocial.next(social);
    this.initArrayOfDates(this.selectedDate.value, this.selectedDays.value);
  }

  selectDate(date: string): void {
    this.selectedDate.next(date);
    this.initArrayOfDates(this.selectedDate.value, this.selectedDays.value);
  }

  selectTimePeriod(days: number): void {
    this.selectedDays.next(days);
    this.initArrayOfDates(this.selectedDate.value, this.selectedDays.value);
  }

  // Initialize array of dates to display in data table and then fetch required data
  initArrayOfDates(start: string, days: number): void {
    const tempArray = [];
    if (start && days && this.selectedSocial.value && this.selectedStock.value) {
      const startDate = moment(start);
      const endDate = moment(start);
      endDate.add(days, 'day');

      // Loop to populate array with the user's chosen amount of days
      const currentDate = moment(startDate);
      while (currentDate < endDate) {
        tempArray.push(currentDate.format('yyyy-MM-DD'));
        currentDate.add(1, 'day');
      }
      this.arrayOfDates.next(tempArray);
      this.fetchDataForDates();
    } else {
      // Reset map if any value missing as safety check
      this.stockDataMap.next(null);
    }
  }

  // Fetch all required display data and map it to date
  fetchDataForDates(): void {
    const tempMap = new Map();

    // In real context with backend these API calls would likely have to be chained BEFORE building the object and
    // updating the map
    this.arrayOfDates.value.forEach(d => {
      const tempObject: StockData = {
        date: d,
        price: this.stockPriceGenerator(this.selectedStock.value.symbol, d),
        socialCount: this.socialMediaCountGenerator(this.selectedStock.value.symbol, this.selectedSocial.value.name),
        recommendation: null
      };
      tempMap.set(d, tempObject);

      // Fetch recommendation based on price and social count calls
      tempMap.get(d).recommendation = this.recommendationAlgorithm(tempMap.get(d).price, tempMap.get(d).socialCount);
    });

    this.updateStockDataMap(tempMap);
  }

  updateStockDataMap(dataMap: Map<string, StockData>): void {
    this.stockDataMap.next(dataMap);
  }

  // Test Functions to check code values
  getSelectedDate(): string {
    return this.selectedDate.value;
  }

  getSelectedDays(): number {
    return +this.selectedDays.value;
  }

  getArrayOfDates(): string[] {
    return this.arrayOfDates.value;
  }

  getSelectedStock(): Stock {
    return this.selectedStock.value;
  }

  getSelectedSocial(): SocialMedia {
    return this.selectedSocial.value;
  }

  // Mock functions to test UI. Once API implemented these functions below will instead hit their respective http service files
  stockPriceGenerator(stockSymbol: string, date: string): number {
    return this.randomFromInterval(100, 1000);
  }

  socialMediaCountGenerator(stockSymbol: string, socialMediaType: string): number {
    return this.randomFromInterval(100, 1000);
  }

  recommendationAlgorithm(stockPrice: number, socialMediaCounts: number): number {
    return Math.floor(Math.random() * 3) + 1;
  }

  // Random number with min and max included
  randomFromInterval(min, max): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export interface StockData {
  date: string;
  price: number;
  socialCount: number;
  recommendation: number;
}

export enum Recommendation {
  BUY = 1,
  SELL = 2,
  HOLD = 3
}
