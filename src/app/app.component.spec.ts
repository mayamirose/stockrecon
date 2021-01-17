import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'LogMeIn Technical Test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('LogMeIn Technical Test');
  });

  // Test to make sure stock data card does not get rendered when its missing one of the required values
  it('should not render data card when it is missing a required values', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const element = fixture.debugElement.query(By.css('.data-card-wrapper'));
    expect(element).toBeNull();
  });

  // Test to make sure stock data card gets rendered when it has all the required values
  it('should render data card when it has all the required values', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Test Data
    app.selectedStock = {name: 'TSM Freelo Inc.', symbol: 'TSFI', description: 'Started at the bottom now we here.'};
    app.selectedSocial = {name: 'Facebook'};
    app.selectedDays = 10;
    app.selectedDate = '2021-01-17';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.data-card-wrapper'));
    expect(element).toBeTruthy();
  });
});
