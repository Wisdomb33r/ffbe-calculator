import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UnitSelectionComponent} from '../unit-selection/unit-selection.component';
import {Equipment} from '../../core/model/equipment.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

@Component({
  templateUrl: './equipment-selection.component.html',
  styleUrls: ['./equipment-selection.component.css']
})
export class EquipmentSelectionComponent {

  private slot: string;
  public equipments: Array<Equipment> = [];

  constructor(public dialogRef: MatDialogRef<UnitSelectionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.slot = data.slot;
    this.equipments = data.equipments;
  }

  public selectEquipment(equipment: Equipment) {
    this.dialogRef.close(equipment);
  }
}
