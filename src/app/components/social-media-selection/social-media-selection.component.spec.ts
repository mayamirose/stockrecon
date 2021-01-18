import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SocialMediaSelectionComponent} from './social-media-selection.component';

describe('SocialMediaSelectionComponent', () => {
  let component: SocialMediaSelectionComponent;
  let fixture: ComponentFixture<SocialMediaSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialMediaSelectionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to make sure selected social is updated
  it('selected social should equal social user selected', () => {
    component.selectSocial({name: 'Facebook'});
    fixture.detectChanges();
    expect(component.selectedSocial).toEqual({name: 'Facebook'});
  });
});
