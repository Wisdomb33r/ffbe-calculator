import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {EquipmentSet} from '../../core/model/equipment-set.model';
import {MatDialog} from '@angular/material';
import {EquipmentSelectionComponent} from '../popup/equipment-selection/equipment-selection.component';
import {Equipment} from '../../core/model/equipment.model';
import {UnitsService} from '../../core/services/units.service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-equipments-display',
  templateUrl: './equipments-display.component.html',
  styleUrls: ['./equipments-display.component.css']
})
export class EquipmentsDisplayComponent implements OnInit, OnDestroy {

  @Input() equipments: EquipmentSet;
  @Output() equipmentChanged: EventEmitter<Equipment> = new EventEmitter<Equipment>();
  private subscription: Subscription;
  public areStmrExcluded = false;

  constructor(private dialog: MatDialog,
              private unitsService: UnitsService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public openEquipmentSelectionPane(slot: string) {
    this.unsubscribe();
    const itemPresent = this.equipments[slot] ? true : false;
    const locked = this.equipments[slot] && this.equipments[slot].locked ? true : false;

    this.subscription = this.unitsService.getAllowedEquipmentsForSlot$(slot)
      .pipe(
        map((equipments: Array<Equipment>) => equipments.filter((equipment: Equipment) => !this.areStmrExcluded || !equipment.stmr))
      )
      .subscribe((equipments: Array<Equipment>) => {
          if (equipments.length > 0 || (this.isEquipmentRemoveable(slot) && itemPresent) || locked) {
            const dialogRef = this.dialog.open(EquipmentSelectionComponent, {
              data: {
                slot: slot,
                equipments: equipments,
                removeable: (this.isEquipmentRemoveable(slot) && itemPresent),
                locked: locked,
              }
            }).afterClosed().subscribe((equipment: Equipment) => {
              if (equipment) {
                this.unitsService.equipInSlot(slot, equipment);
                this.equipmentChanged.emit(equipment);
              }
            });
          }
        }
      );
  }

  private isEquipmentRemoveable(slot: string): boolean {
    return slot === 'left_hand'
      || slot === 'rh_trait1' || slot === 'rh_trait2' || slot === 'rh_trait3'
      || slot === 'lh_trait1' || slot === 'lh_trait2' || slot === 'lh_trait3'
      ;
  }

  public openEquipmentSelectionPaneForRhWeaponTrait(index: number) {
    this.openEquipmentSelectionPane('rh_trait' + index);
  }

  public openEquipmentSelectionPaneForLhWeaponTrait(index: number) {
    this.openEquipmentSelectionPane('lh_trait' + index);
  }
}
