import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandNearbyComponent } from './rand-nearby.component';

describe('RandNearbyComponent', () => {
  let component: RandNearbyComponent;
  let fixture: ComponentFixture<RandNearbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandNearbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandNearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
