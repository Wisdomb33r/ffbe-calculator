import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UnitSelectionComponent} from './unit-selection.component';
import {UnitsService} from '../../../core/services/units.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

const unitFake1 = JSON.parse(`{
  "id":1,"name":"Unit1","icon":"unit1.jpg"
}`);
const unitFake2 = JSON.parse(`{
  "id":2,"name":"Unit2","icon":"unit2.jpg"
}`);

describe('UnitSelectionComponent', () => {
  let component: UnitSelectionComponent;
  let fixture: ComponentFixture<UnitSelectionComponent>;

  beforeEach(() => {
    const unitServiceMock = {
      displayArchivedUnits: false,
      physicalChainers: [unitFake1],
      physicalFinishers: [unitFake1],
      magicalChainers: [unitFake2],
      filterUnits: jasmine.createSpy('filterUnits'),
    };

    const matDialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    TestBed.configureTestingModule({
      declarations: [
        UnitSelectionComponent,
      ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatOptionModule,
        MatDialogModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: UnitsService, useValue: unitServiceMock},
        {provide: MatDialogRef, useValue: matDialogRefMock},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(UnitSelectionComponent);
    component = fixture.componentInstance;
  });

  it('should switch display on click', () => {
    // GIVEN
    const unitServiceMock = TestBed.get(UnitsService);
    const matDialogRefMock = TestBed.get(MatDialogRef);
    const select: DebugElement = fixture.debugElement.query(By.css('mat-form-field mat-select'));
    fixture.detectChanges();

    // WHEN
    select.nativeElement.click();
    fixture.detectChanges();
    const option2: DebugElement = fixture.debugElement.query(By.css('mat-option:nth-child(2)'));
    option2.nativeElement.click();
    fixture.detectChanges();

    // THEN
    expect(unitServiceMock.filterUnits).toHaveBeenCalledTimes(1);
    expect(unitServiceMock.displayArchivedUnits).toBeTruthy();
    expect(matDialogRefMock.close).toHaveBeenCalledTimes(0);
  });

  it('should display units and close pop-up on click', () => {
    // GIVEN
    const unitServiceMock = TestBed.get(UnitsService);
    const matDialogRefMock = TestBed.get(MatDialogRef);
    fixture.detectChanges();

    // WHEN
    const units = fixture.debugElement.queryAll(By.css('.unit-icon'));
    units[1].nativeElement.click();
    fixture.detectChanges();

    // THEN
    expect(units.length).toEqual(3);
    expect(unitServiceMock.filterUnits).toHaveBeenCalledTimes(0);
    expect(unitServiceMock.displayArchivedUnits).toBeFalsy();
    expect(matDialogRefMock.close).toHaveBeenCalledTimes(1);
    expect(matDialogRefMock.close).toHaveBeenCalledWith(unitFake2);

    expect(units[0].nativeElement.src).toEqual('http://localhost:9876/unit1.jpg');
    expect(units[0].nativeElement.alt).toEqual('Unit1');

    expect(units[1].nativeElement.src).toEqual('http://localhost:9876/unit2.jpg');
    expect(units[1].nativeElement.alt).toEqual('Unit2');

    expect(units[2].nativeElement.src).toEqual('http://localhost:9876/unit1.jpg');
    expect(units[2].nativeElement.alt).toEqual('Unit1');
  });
});
