import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsBodyComponent } from './tabs-body.component';

describe('TabsBodyComponent', () => {
  let component: TabsBodyComponent;
  let fixture: ComponentFixture<TabsBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
