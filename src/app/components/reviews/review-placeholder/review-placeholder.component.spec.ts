import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPlaceholderComponent } from './review-placeholder.component';

describe('ReviewPlaceholderComponent', () => {
  let component: ReviewPlaceholderComponent;
  let fixture: ComponentFixture<ReviewPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
