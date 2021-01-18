import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StockSelectionComponent} from './stock-selection.component';
import {By} from '@angular/platform-browser';
import {OutsideClickDirective} from '../../directives/outside-click.directive';
import {DebugElement} from '@angular/core';

describe('StockSelectionComponent', () => {
  let component: StockSelectionComponent;
  let fixture: ComponentFixture<StockSelectionComponent>;
  let formEl: DebugElement;
  let searchInputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockSelectionComponent, OutsideClickDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSelectionComponent);
    component = fixture.componentInstance;
    formEl = fixture.debugElement.query(By.css('.form-container'));
    searchInputEl = fixture.debugElement.query(By.css('.search-input'));
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
    component.selectedStock = {name: 'TSM Freelo Inc.', symbol: 'TSFI', description: 'Started at the bottom now we here.'};
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.stock-info'));
    expect(element).toBeTruthy();
  });

  // Test to make sure selected stock is updated
  it('selected stock should equal stock user selected', () => {
    component.selectStock({
      name: 'Winchester Brothers Holdings',
      symbol: 'WBH',
      description: 'Professional monster hunter insurance services.'
    });
    fixture.detectChanges();
    expect(component.selectedStock).toEqual({
      name: 'Winchester Brothers Holdings',
      symbol: 'WBH',
      description: 'Professional monster hunter insurance services.'
    });
  });

  // Test to make sure valid searched stock updates selected stock
  it('searched stock should update to the user input', () => {
    component.stocks = [{
      name: 'Winchester Brothers Holdings',
      symbol: 'WBH',
      description: 'Professional monster hunter insurance services.'
    }];
    component.searchStock('WBH');
    fixture.detectChanges();
    expect(component.selectedStock).toEqual({
      name: 'Winchester Brothers Holdings',
      symbol: 'WBH',
      description: 'Professional monster hunter insurance services.'
    });
  });

  // Test to make sure invalid searched stock updates selected stock to null
  it('searched stock should update to the user input', () => {
    component.stocks = [{
      name: 'Winchester Brothers Holdings',
      symbol: 'WBH',
      description: 'Professional monster hunter insurance services.'
    }];
    component.searchStock('WBHH');
    fixture.detectChanges();
    expect(component.selectedStock).toEqual(null);
  });

  // Check if error is false on existing stock
  it('error should be false if input is valid stock', async () => {
    component.stocks = [{
      name: 'Winchester Brothers Holdings',
      symbol: 'WBH',
      description: 'Professional monster hunter insurance services.'
    }];
    await component.searchInput.setValue('WBH');
    fixture.detectChanges();
    expect(component.error).toEqual(false);
  });

  // Check if selected stock is null on non existing stock
  it('selected stock should be null if stock does not exist', async () => {
    component.stocks = [{
      name: 'Winchester Brothers Holdings',
      symbol: 'WBH',
      description: 'Professional monster hunter insurance services.'
    }];
    await component.searchInput.setValue('WBHH');
    fixture.detectChanges();
    expect(component.selectedStock).toEqual(null);
  });

  // Test if outside click directive created
  it('should create an instance of outside click directive', () => {
    const directive = new OutsideClickDirective();
    expect(directive).toBeTruthy();
  });

  // Test to check if auto complete card rendered when conditions true
  it('Should render autocomplete div when user focuses on search input', () => {
    component.filteredStocks = [{name: 'Kanto Animal Supplies Co.', symbol: 'KASC', description: 'Feeding animals since generation 1!'}];
    searchInputEl.triggerEventHandler('focusin', null);
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.filter-card'));
    expect(element).toBeTruthy();
  });

  // Test to check if directive throws outside click and card not rendered
  it('Should not render autocomplete div when user clicks outside of form container', () => {
    component.filteredStocks = [{name: 'Kanto Animal Supplies Co.', symbol: 'KASC', description: 'Feeding animals since generation 1!'}];
    formEl.triggerEventHandler('outsideClick', null);
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.filter-card'));
    expect(element).toBeNull();
  });
});
