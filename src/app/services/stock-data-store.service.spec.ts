import {TestBed} from '@angular/core/testing';

import {StockDataStoreService} from './stock-data-store.service';
import {combineAll} from 'rxjs/operators';

describe('StockService', () => {
  let service: StockDataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDataStoreService);
    service.selectStock({name: 'Fire Nation Mutual Trust', symbol: 'FFMT', description: 'Expand to make money, make money to expand.'});
    service.selectSocial({name: 'Twitter'});
    service.selectDate('2021-01-17');
    service.selectTimePeriod(17);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test to make getSelectedStock works
  it('getSelectedStock must return the actual selected stock', () => {
    expect(service.getSelectedStock()).toEqual({
      name: 'Fire Nation Mutual Trust',
      symbol: 'FFMT',
      description: 'Expand to make money, make money to expand.'
    });
  });

  // Test to make getSelectedSocial works
  it('getSelectedSocial must return the actual selected social', () => {
    expect(service.getSelectedSocial()).toEqual({name: 'Twitter'});
  });

  // Test to make sure arrayOfDates length equals selectedDays
  it('arrayOfDates length must equal period(days)', () => {
    expect(service.getArrayOfDates().length).toEqual(service.getSelectedDays());
  });

  // Test to make sure arrayOfDates start equals selectedDate
  it('arrayOfDates start date must equal selectedDate', () => {
    expect(service.getArrayOfDates()[0]).toEqual(service.getSelectedDate());
  });

  // Test to make sure setAlgorithm working as intended
  it('algorithm should be the set algorithm', () => {
    service.setAlgorithm({algorithmId: '1'});
    expect(service.getAlgorithm()).toEqual({algorithmId: '1'});
  });
});
