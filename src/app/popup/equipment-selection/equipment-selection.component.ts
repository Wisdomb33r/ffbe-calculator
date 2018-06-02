import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Equipment} from '../../../core/model/equipment.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

@Component({
  templateUrl: './equipment-selection.component.html',
  styleUrls: ['./equipment-selection.component.css']
})
export class EquipmentSelectionComponent {

  private slot: string;
  public equipments: Array<Equipment> = [];
  public offhandPresent: boolean;

  constructor(public dialogRef: MatDialogRef<EquipmentSelectionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.slot = data.slot;
    this.equipments = data.equipments;
    this.offhandPresent = data.offhandPresent;
  }

  public selectEquipment(equipment: Equipment) {
    this.dialogRef.close(equipment);
  }

  public removeEquipment() {
    this.dialogRef.close({id: -1});
  }

  public isRemovable(): boolean {
    return this.slot === 'left_hand' && this.offhandPresent;
  }
}
