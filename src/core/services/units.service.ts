import {Injectable} from '@angular/core';
import {DatabaseClientService} from './database-client.service';
import {Unit} from '../model/unit.model';
import {Observable} from 'rxjs/Observable';
import {Equipment} from '../model/equipment.model';
import {map} from 'rxjs/operators';

@Injectable()
export class UnitsService {

  public units: Array<Unit>;
  public selectedUnit: Unit;

  constructor(private databaseClient: DatabaseClientService) {
  }

  public loadUnits() {
    this.databaseClient.getUnits$()
      .subscribe(units => this.units = units);
  }

  public equipInSlot(slot: string, equipment: Equipment) {
    if (equipment.id === -1) {
      this.selectedUnit.selectedBuild.equipments[slot] = null;
    } else {
      if (slot === 'right_hand' && equipment.isTwoHanded()) {
        this.selectedUnit.selectedBuild.equipments['left_hand'] = null;
      }
      this.selectedUnit.selectedBuild.equipments[slot] = equipment;
    }
  }

  public getAllowedEquipmentsForSlot$(slot: string): Observable<Array<Equipment>> {
    return this.databaseClient.getEquipmentsForUnitAndSlot$(slot, this.selectedUnit.id)
      .pipe(
        map((items: Array<Equipment>) => items
          .map((item: Equipment) => new Equipment(item))
          .filter((item: Equipment) => this.isAllowed(item, slot))
        )
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
          item.id === this.selectedUnit.selectedBuild.equipments.materia1.id
          || item.id === this.selectedUnit.selectedBuild.equipments.materia2.id
          || item.id === this.selectedUnit.selectedBuild.equipments.materia3.id
          || item.id === this.selectedUnit.selectedBuild.equipments.materia4.id)) {
        return false;
      }
      if (slot.startsWith('accessory') && (item.id === this.selectedUnit.selectedBuild.equipments.accessory1.id
          || item.id === this.selectedUnit.selectedBuild.equipments.accessory2.id)) {
        return false;
      }
      if (slot === 'right_hand' || slot === 'left_hand') {
        if (item.id === this.selectedUnit.selectedBuild.equipments.right_hand.id ||
          (this.selectedUnit.selectedBuild.equipments.left_hand && item.id === this.selectedUnit.selectedBuild.equipments.left_hand.id)) {
          return false;
        }
      }
    }
    return true;
  }

  private checkTwoHandedMainHandForOffhand(slot: string) {
    return slot !== 'left_hand' || !this.selectedUnit.selectedBuild.equipments.right_hand.isTwoHanded();
  }

  private checkDwForSecondWeapon(item: Equipment, slot: string): boolean {
    return slot !== 'left_hand' || item.isShield()
      || (this.selectedUnit.selectedBuild.equipments.isDwEquipped() && !item.isTwoHanded())
      || (this.selectedUnit.isWithNativeDw() && !item.isTwoHanded())
      || item.isWeaponWithDw();
  }
}
