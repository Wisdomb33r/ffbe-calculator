import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {EquipmentSet} from '../../core/model/equipment-set.model';
import {MatDialog} from '@angular/material';
import {EquipmentSelectionComponent} from '../popup/equipment-selection/equipment-selection.component';
import {Equipment} from '../../core/model/equipment.model';
import {UnitsService} from '../../core/services/units.service';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {DatabaseClientService} from '../../core/services/database-client.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-equipments-display',
  templateUrl: './equipments-display.component.html',
  styleUrls: ['./equipments-display.component.css']
})
export class EquipmentsDisplayComponent implements OnInit, OnDestroy {

  @Input() equipments: EquipmentSet;
  @Output() equipmentChanged: EventEmitter<Equipment> = new EventEmitter<Equipment>();
  private subscription: Subscription;

  constructor(private dialog: MatDialog,
              private databaseService: DatabaseClientService,
              public unitsService: UnitsService) {
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
    if (this.equipments[slot] && this.equipments[slot].locked) {
      if (this.equipments[slot].locked_alternatives && this.equipments[slot].locked_alternatives.length
        && this.equipments.isEquippedOneOf(this.equipments[slot].locked_alternatives)) {
        this.openNonLockedEquipmentSelectionPane(slot);
      } else {
        this.openLockedEquipmentSelectionPane(slot);
      }
    } else {
      this.openNonLockedEquipmentSelectionPane(slot);
    }
  }

  public openLockedEquipmentSelectionPane(slot: string) {
    const observables: Array<Observable<any>> = [];
    if (this.equipments[slot].locked_alternatives && this.equipments[slot].locked_alternatives.length) {
      this.equipments[slot].locked_alternatives.forEach(
        (itemId: number) => observables.push(this.databaseService.getItemById(itemId))
      );
    }
    observables.push(of(slot));

    this.subscription = forkJoin(observables).pipe(
      tap(results => {
        const equipments: Array<Equipment> = [];
        if (this.equipments[slot].locked_alternatives && this.equipments[slot].locked_alternatives.length) {
          this.equipments[slot].locked_alternatives.forEach((itemId: number, index: number) => {
            if (results[index]) {
              equipments.push(new Equipment(results[index]));
            }
          });
        }
        this.dialog.open(EquipmentSelectionComponent, {
          data: {
            slot: slot,
            equipments: equipments,
            removeable: false,
            locked: true,
          }
        });
      })
    ).subscribe();
  }

  public openNonLockedEquipmentSelectionPane(slot: string) {
    const itemPresent = !!this.equipments[slot];
    this.subscription = this.unitsService.getAllowedEquipmentsForSlot$(slot)
      .subscribe((equipments: Array<Equipment>) => {
          if (equipments.length > 0 || itemPresent) {
            const dialogRef = this.dialog.open(EquipmentSelectionComponent, {
              data: {
                slot: slot,
                equipments: equipments,
                removeable: itemPresent,
                locked: false,
              }
            }).afterClosed().subscribe((equipment: Equipment) => {
              if (equipment) {
                if (equipment.id && equipment.id > 0 && (<any>window).ga) {
                  (<any>window).ga('send', 'event', {
                    eventCategory: 'calculatorEquipment',
                    eventLabel: 'Equip item ' + equipment.id,
                    eventAction: 'equipItem',
                    eventValue: 1
                  });
                }
                if (equipment.id === -1 && (<any>window).ga) {
                  (<any>window).ga('send', 'event', {
                    eventCategory: 'calculatorEquipment',
                    eventLabel: 'Remove item from ' + slot,
                    eventAction: 'removeItem',
                    eventValue: 1
                  });
                }
                this.unitsService.equipInSlot(slot, equipment);
                this.equipmentChanged.emit(equipment);
              }
            });
          }
        }
      );
  }

  public openEquipmentSelectionPaneForRhWeaponTrait(index: number) {
    this.openEquipmentSelectionPane('rh_trait' + index);
  }

  public openEquipmentSelectionPaneForLhWeaponTrait(index: number) {
    this.openEquipmentSelectionPane('lh_trait' + index);
  }
}
