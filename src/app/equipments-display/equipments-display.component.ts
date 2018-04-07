import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EquipmentSet} from '../../core/model/equipment-set.model';
import {MatDialog} from '@angular/material';
import {EquipmentSelectionComponent} from '../equipment-selection/equipment-selection.component';
import {Equipment} from '../../core/model/equipment.model';
import {DatabaseClientService} from '../../core/services/database-client.service';

@Component({
  selector: 'app-equipments-display',
  templateUrl: './equipments-display.component.html',
  styleUrls: ['./equipments-display.component.css']
})
export class EquipmentsDisplayComponent implements OnInit {

  @Input() equipments: EquipmentSet;
  @Input() unitId: number;
  @Output() equipmentChanged: EventEmitter<Equipment> = new EventEmitter<Equipment>();

  constructor(private dialog: MatDialog,
              private dbClient: DatabaseClientService) {
  }

  ngOnInit() {
  }

  public openEquipmentSelectionPane(slot: string) {

    const offhandPresent = this.equipments[slot] ? true : false;

    this.dbClient.getEquipmentsForUnitAndSlot(slot, this.unitId)
      .subscribe(items => {
          const equipments: Array<Equipment> = [];
          items
            .map(item => new Equipment(item))
            .filter(item => this.isAllowed(item, slot))
            .forEach(item => equipments.push(item));

          if (equipments.length > 0 || (slot === 'left_hand' && offhandPresent)) {
            const dialogRef = this.dialog.open(EquipmentSelectionComponent, {
              width: '320px',
              data: {
                slot: slot,
                equipments: equipments,
                offhandPresent: offhandPresent,
              }
            }).afterClosed().subscribe((equipment: Equipment) => {
              if (equipment) {
                if (equipment.id === -1) {
                  this.equipments[slot] = null;
                } else {
                  this.equipments[slot] = equipment;
                }
                this.equipmentChanged.emit(equipment);
              }
            });
          }
        }
      );
  }

  private isAllowed(item: Equipment, slot: string): boolean {
    let isAllowed = this.checkUniqueness(item, slot);
    isAllowed = isAllowed && this.checkTwoHandedMainHandForOffhand(slot);
    isAllowed = isAllowed && this.checkDwForSecondWeapon(item, slot);
    return isAllowed;
  }

  private checkUniqueness(item: Equipment, slot: string): boolean {
    if (item.unique) {
      if (slot.startsWith('materia') && (
          item.id === this.equipments.materia1.id
          || item.id === this.equipments.materia2.id
          || item.id === this.equipments.materia3.id
          || item.id === this.equipments.materia4.id)) {
        return false;
      }
      if (slot.startsWith('accessory') && (item.id === this.equipments.accessory1.id || item.id === this.equipments.accessory2.id)) {
        return false;
      }
      if (slot === 'right_hand' || slot === 'left_hand') {
        if (item.id === this.equipments.right_hand.id || (this.equipments.left_hand && item.id === this.equipments.left_hand.id)) {
          return false;
        }
      }
    }
    return true;
  }

  private checkTwoHandedMainHandForOffhand(slot: string) {
    return slot !== 'left_hand' || !this.equipments.right_hand.isTwoHanded();
  }

  private checkDwForSecondWeapon(item: Equipment, slot: string): boolean {
    return slot !== 'left_hand' || item.isShield() || (this.equipments.isDwEquipped() && !item.isTwoHanded())
      || item.id === 1199 || item.id === 1352 || this.unitId === 590 || this.unitId === 775 || this.unitId === 8063;
  }
}
