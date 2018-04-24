import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {EquipmentSet} from '../../core/model/equipment-set.model';
import {MatDialog} from '@angular/material';
import {EquipmentSelectionComponent} from '../equipment-selection/equipment-selection.component';
import {Equipment} from '../../core/model/equipment.model';
import {UnitsService} from '../../core/services/units.service';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-equipments-display',
  templateUrl: './equipments-display.component.html',
  styleUrls: ['./equipments-display.component.css']
})
export class EquipmentsDisplayComponent implements OnInit, OnDestroy {

  @Input() equipments: EquipmentSet;
  @Output() equipmentChanged: EventEmitter<Equipment> = new EventEmitter<Equipment>();
  private subscription: ISubscription;

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
    const offhandPresent = this.equipments[slot] ? true : false;

    this.subscription = this.unitsService.getAllowedEquipmentsForSlot$(slot)
      .subscribe((equipments: Array<Equipment>) => {
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
                this.unitsService.equipInSlot(slot, equipment);
                this.equipmentChanged.emit(equipment);
              }
            });
          }
        }
      );
  }
}
