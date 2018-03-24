import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDetailsMagComponent } from './unit-details-mag.component';

describe('UnitDetailsMagComponent', () => {
  let component: UnitDetailsMagComponent;
  let fixture: ComponentFixture<UnitDetailsMagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitDetailsMagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDetailsMagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
