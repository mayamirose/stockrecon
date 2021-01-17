import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StockSelectionComponent} from './stock-selection.component';
import {By} from '@angular/platform-browser';

describe('StockSelectionComponent', () => {
  let component: StockSelectionComponent;
  let fixture: ComponentFixture<StockSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockSelectionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to make sure selected stock info is not rendered if none selected
  it('should not render stock info when no stock selected', () => {
    const element = fixture.debugElement.query(By.css('.stock-info'));
    expect(element).toBeNull();
  });

  // Test to make sure stock info is rendered if stock selected
  it('should render stock info when stock selected', () => {
    // Test Data
    component.selectedStock = {name: 'TSM Freelo Inc.', symbol: 'TSFI', description: 'Started at the bottom now we here.'};
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.stock-info'));
    expect(element).toBeTruthy();
  });

  // Test to make sure selected stock is updated
  it('selected stock should equal stock user selected', () => {
    component.selectStock('WBH');
    fixture.detectChanges();
    expect(component.selectedStock).toEqual({
      name: 'Winchester Brothers Holdings',
      symbol: 'WBH',
      description: 'Professional monster hunter insurance services.'
    });
  });

  // Test to make sure selected stock is null if stock does not exist
  it('selected stock should equal null', () => {
    component.selectStock('WBHH'); // This stock does not exist
    fixture.detectChanges();
    expect(component.selectedStock).toEqual(null);
  });

  // Test to make sure stock input is updated
  it('selected stock should update to the user input', () => {
    component.searchInput.setValue('WBH');
    // Timeout to give code time to adjust form value
    setTimeout(() => {
      fixture.detectChanges();
      expect(component.selectedStock).toEqual({
        name: 'Winchester Brothers Holdings',
        symbol: 'WBH',
        description: 'Professional monster hunter insurance services.'
      });
    }, 500);
  });
});
