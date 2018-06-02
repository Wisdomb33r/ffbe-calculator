import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Unit} from '../../../core/model/unit.model';
import {UnitsService} from '../../../core/services/units.service';

@Component({
  templateUrl: './unit-selection.component.html',
  styleUrls: ['./unit-selection.component.css']
})
export class UnitSelectionComponent {

  public units: Array<Unit> = [];

  constructor(public dialogRef: MatDialogRef<UnitSelectionComponent>,
              public unitsService: UnitsService) {
    this.units = unitsService.units;
  }

  public selectUnit(unit: Unit) {
    this.dialogRef.close(unit);
  }
}
