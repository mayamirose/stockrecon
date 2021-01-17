import {Component, OnDestroy, OnInit} from '@angular/core';
import {StockDataStoreService} from '../../services/stock-data-store.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SocialMedia} from '../../models/social-media';
import {DataGenerationService} from '../../services/data-generation.service';

@Component({
  selector: 'app-social-media-selection',
  templateUrl: './social-media-selection.component.html',
  styleUrls: ['./social-media-selection.component.scss']
})
export class SocialMediaSelectionComponent implements OnInit, OnDestroy {

  selectedSocial: SocialMedia;
  socials: SocialMedia[];
  private ngUnsubscribe = new Subject();

  constructor(private stockDataStoreService: StockDataStoreService,
              private dataGenerationService: DataGenerationService) {
  }

  ngOnInit(): void {
    this.socialListener();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Listen for selected social and socials variable changes
  socialListener(): void {
    this.stockDataStoreService.selectedSocialX.pipe(takeUntil(this.ngUnsubscribe)).subscribe(resp => {
      this.selectedSocial = resp;
    });

    this.dataGenerationService.socialsX.pipe(takeUntil(this.ngUnsubscribe)).subscribe(resp => {
      this.socials = resp;
    });
  }

  selectSocial(social: SocialMedia): void {
    this.stockDataStoreService.selectSocial(social);
  }
}
