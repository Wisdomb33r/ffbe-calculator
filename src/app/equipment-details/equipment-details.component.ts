import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EquipmentSet} from '../../core/model/equipment-set.model';
import {MatDialog} from '@angular/material';
import {EquipmentSelectionComponent} from '../equipment-selection/equipment-selection.component';
import {Equipment} from '../../core/model/equipment.model';
import {DatabaseClientService} from '../../core/services/database-client.service';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent implements OnInit {

  @Input() equipments: EquipmentSet;
  @Input() unitId: number;
  @Output() equipmentChanged: EventEmitter<Equipment> = new EventEmitter<Equipment>();

  constructor(private dialog: MatDialog,
              private dbClient: DatabaseClientService) {
  }

  ngOnInit() {
  }

  public openEquipmentSelectionPane(slot: string) {

    this.dbClient.getEquipmentsForUnitAndSlot(slot, this.unitId)
      .subscribe(items => {
          const equipments: Array<Equipment> = [];
          items.forEach(item => equipments.push(new Equipment(item)));

          const dialogRef = this.dialog.open(EquipmentSelectionComponent, {
            width: '320px',
            data: {
              slot: slot,
              equipments: equipments
            }
          }).afterClosed().subscribe((equipment: Equipment) => {
            if (equipment) {
              this.equipments[slot] = equipment;
              this.equipmentChanged.emit(equipment);
            }
          });
        }
      );
  }
}
