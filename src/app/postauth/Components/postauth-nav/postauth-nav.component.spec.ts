import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostauthNavComponent } from './postauth-nav.component';

describe('PostauthNavComponent', () => {
  let component: PostauthNavComponent;
  let fixture: ComponentFixture<PostauthNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostauthNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostauthNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
