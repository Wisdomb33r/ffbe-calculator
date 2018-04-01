import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EquipmentSelectionComponent} from './equipment-details.component';

xdescribe('EquipmentSelectionComponent', () => {
  let component: EquipmentSelectionComponent;
  let fixture: ComponentFixture<EquipmentSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentSelectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
