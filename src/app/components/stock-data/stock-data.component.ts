import {Component, OnDestroy, OnInit} from '@angular/core';
import {Stock} from '../../models/stock';
import {SocialMedia} from '../../models/social-media';
import {Recommendation, StockData, StockDataStoreService} from '../../services/stock-data-store.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {RecommendationAlgorithm} from '../../models/recommendationAlgorithm';

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
  selectedAlgorithm: RecommendationAlgorithm;
  algorithms: RecommendationAlgorithm[];
  algorithmForm: FormGroup;
  algorithm = new FormControl(null, []);

  private ngUnsubscribe = new Subject();

  constructor(private stockDataStoreService: StockDataStoreService) {
  }

  ngOnInit(): void {
    this.dataListener();
    this.algorithmListener();
    this.algorithms = this.stockDataStoreService.fetchAlgorithms();
    this.algorithm.setValue(this.algorithms ? this.algorithms[0]?.id : null);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  algorithmListener(): void {
    this.algorithm.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(resp => {
      // Update algorithm selected with user values
      this.selectedAlgorithm = {...this.algorithms.find(a => a.id === resp)};
      this.algorithmForm = this.buildAlgorithmForm();
      this.stockDataStoreService.setAlgorithm(this.algorithmForm.value);
      this.algorithmForm.get('extraFields').valueChanges.pipe(takeUntil(this.ngUnsubscribe),
        distinctUntilChanged(), debounceTime(500)).subscribe(extraFieldsResp => {
        this.stockDataStoreService.setAlgorithm(this.algorithmForm.value);
      });
    });
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
    });
  }

  buildAlgorithmForm(): FormGroup {
    return new FormGroup({
      algorithmId: new FormControl(this.selectedAlgorithm.id, []),
      extraFields: this.buildExtraFieldsForm()
    });
  }

  buildExtraFieldsForm(): FormGroup {
    const tempFormGroup = new FormGroup({});
    this.selectedAlgorithm.requireExtras?.forEach(field => {
      tempFormGroup.addControl(field, new FormControl('0', []));
    });
    return tempFormGroup;
  }
}
