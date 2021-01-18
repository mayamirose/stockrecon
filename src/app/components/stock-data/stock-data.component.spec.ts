import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StockDataComponent} from './stock-data.component';

describe('StockDataComponent', () => {
  let component: StockDataComponent;
  let fixture: ComponentFixture<StockDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockDataComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test from creation
  it('should create a form', () => {
    component.algorithms = [{id: '1', name: 'Generic', requireExtras: null},
      {id: '2', name: 'Advanced', requireExtras: ['constant']},
      {id: '3', name: 'Guy who predicted bitcoin in 2012', requireExtras: ['risk ratio 1', 'risk ratio 2']}];
    component.algorithm.setValue({id: '3', name: 'Guy who predicted bitcoin in 2012', requireExtras: ['risk ratio 1', 'risk ratio 2']},);
    expect(component.algorithmForm).toBeTruthy();
  });
});
