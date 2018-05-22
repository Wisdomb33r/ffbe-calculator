import {Injectable} from '@angular/core';
import {DatabaseClientService} from './database-client.service';
import {Unit} from '../model/unit.model';
import {Observable} from 'rxjs/Observable';
import {Equipment} from '../model/equipment.model';
import {map} from 'rxjs/operators';
import {CalculatorUtils} from '../calculator-utils';
import {Algorithm} from '../model/algorithm.model';
import {Result} from '../model/result.model';
import {EquipmentSet} from '../model/equipment-set.model';

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
      if (!this.selectedUnit.isWithNativeDw() && !this.getEquipments().isDwEquipped()
        && this.getEquipments()['left_hand'] && this.getEquipments()['left_hand'].isWeapon()) {
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
          .map((item: Equipment) => this.selectedUnit.selectedBuild.equipments.activateEquipmentConditionalPassives(item))
          .sort((a: Equipment, b: Equipment) => -this.compareEquipmentsForAlgorithm(a, b))
        )
      );
  }

  private compareEquipmentsForAlgorithm(a: Equipment, b: Equipment): number {
    if (this.selectedUnit.selectedBuild.algorithmId === 1 || this.selectedUnit.selectedBuild.algorithmId === 4) {
      return this.compareEquipmentsForAtk(a, b);
    }
    if (this.selectedUnit.selectedBuild.algorithmId === 2 || this.selectedUnit.selectedBuild.algorithmId === 5) {
      return this.compareEquipmentsForMag(a, b);
    }
    if (this.selectedUnit.selectedBuild.algorithmId === 3 || this.selectedUnit.selectedBuild.algorithmId === 6) {
      return this.compareEquipmentsForHybrid(a, b);
    }
    if (this.selectedUnit.selectedBuild.algorithmId === 8) {
      return this.compareEquipmentsForDef(a, b);
    }
    return 0;
  }

  private compareEquipmentsForAtk(a: Equipment, b: Equipment): number {
    const aAtk = this.estimateStat(a, 'atk');
    const bAtk = this.estimateStat(b, 'atk');
    return CalculatorUtils.compareNumbers(aAtk, bAtk);
  }

  private compareEquipmentsForMag(a: Equipment, b: Equipment): number {
    const aMag = this.estimateStat(a, 'mag');
    const bMag = this.estimateStat(b, 'mag');
    return CalculatorUtils.compareNumbers(aMag, bMag);
  }

  private compareEquipmentsForHybrid(a: Equipment, b: Equipment): number {
    const aAtk = this.estimateStat(a, 'atk');
    const bAtk = this.estimateStat(b, 'atk');
    const aMag = this.estimateStat(a, 'mag');
    const bMag = this.estimateStat(b, 'mag');
    return CalculatorUtils.compareNumbers(aAtk + aMag, bAtk + bMag);
  }

  private compareEquipmentsForDef(a: Equipment, b: Equipment): number {
    const aHp = this.estimateStat(a, 'hp');
    const aDef = this.estimateStat(a, 'def');
    const aSpr = this.estimateStat(a, 'spr');
    const bHp = this.estimateStat(b, 'hp');
    const bDef = this.estimateStat(b, 'def');
    const bSpr = this.estimateStat(b, 'spr');
    return CalculatorUtils.compareNumbers((aHp / 10) + aDef + aSpr, (bHp / 10) + bDef + bSpr);
  }

  private estimateStat(equipment: Equipment, stat: string) {
    const conditional_percent = equipment.conditional_passives.map(passive => passive[stat]).reduce((val1, val2) => val1 + val2, 0);
    const from_passive = this.selectedUnit.stats[stat].base * (equipment[stat + '_percent'] + conditional_percent) / 100;
    const from_dh = this.selectedUnit.stats[stat].base_equipment * (equipment[stat + '_dh'] + equipment[stat + '_tdh']) / 100;
    return equipment[stat] + from_passive + from_dh;
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

  // SHORTCUT GETTERS
  public getAlgorithm(): Algorithm {
    return this.selectedUnit.selectedBuild.algorithm;
  }

  public getResult(): Result {
    return this.selectedUnit.selectedBuild.result;
  }

  public getEquipments(): EquipmentSet {
    return this.selectedUnit.selectedBuild.equipments;
  }
}
