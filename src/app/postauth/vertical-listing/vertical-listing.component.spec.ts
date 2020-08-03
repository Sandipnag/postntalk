import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalListingComponent } from './vertical-listing.component';

describe('VerticalListingComponent', () => {
  let component: VerticalListingComponent;
  let fixture: ComponentFixture<VerticalListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
