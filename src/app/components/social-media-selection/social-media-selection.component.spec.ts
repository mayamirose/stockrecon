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

  // Test to make sure socials displayed here are complete
  it('social medias displayed should equal social medias "backend" return', () => {
    expect(component.socials).toEqual([{name: 'Facebook'},
      {name: 'Twitter'},
      {name: 'Instagram'},
      {name: 'Tumblr'}]);
  });
});
