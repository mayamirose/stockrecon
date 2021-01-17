import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocialMediaSelectionComponent } from './components/social-media-selection/social-media-selection.component';
import { HeaderComponent } from './components/header/header.component';
import { StockSelectionComponent } from './components/stock-selection/stock-selection.component';
import { DateSelectionComponent } from './components/date-selection/date-selection.component';
import { StockDataComponent } from './components/stock-data/stock-data.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SocialMediaSelectionComponent,
    HeaderComponent,
    StockSelectionComponent,
    DateSelectionComponent,
    StockDataComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
