import {Injectable, OnInit} from '@angular/core';
import {Stock} from '../models/stock';
import {SocialMedia} from '../models/social-media';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to simulate backend/API data. Deprecate once backend and API created to support these features
 * "Fetches" List of stocks and social medias. Change for actual HTTP calls when API is ready
 */
export class DataGenerationService {

  private socials = new BehaviorSubject<SocialMedia[]>(null);
  socialsX = this.socials.asObservable();

  private stocks = new BehaviorSubject<Stock[]>(null);
  stocksX = this.stocks.asObservable();

  constructor() {
  }

  fetchStocks(): void {
    const apiStocks: Stock[] = [
      {
        name: 'Toussaint Blood and Wine Services',
        symbol: 'TBWS',
        description: 'Finest blood transfer technology on the market, oh and wine too.'
      },
      {name: 'Winchester Brothers Holdings', symbol: 'WBH', description: 'Professional monster hunter insurance services.'},
      {name: 'TSM Freelo Inc.', symbol: 'TSFI', description: 'Started at the bottom now we here.'},
      {name: 'Fire Nation Mutual Trust', symbol: 'FFMT', description: 'Expand to make money, make money to expand.'},
      {name: 'Kanto Animal Supplies Co.', symbol: 'KASC', description: 'Feeding animals since generation 1!'},
      {
        name: 'Walter White Chemicals Inc.',
        symbol: 'WWCI',
        description: 'Chemicals and lab materials for any chemistry aficionado looking to make a quick buck.'
      },
      {name: 'Stormcloaks Northern Supplies', symbol: 'SNS', description: 'Skyrim belongs to the nords, and too do it\'s supplies.'},
    ];
    this.stocks.next(apiStocks);
  }

  fetchSocialMedias(): void {
    const apiSocials: SocialMedia[] = [
      {name: 'Facebook'},
      {name: 'Twitter'},
      {name: 'Instagram'},
      {name: 'Tumblr'},
    ];
    this.socials.next(apiSocials);
  }
}
