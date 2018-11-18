import {Injectable} from '@angular/core';
import {DatabaseClientService} from './database-client.service';
import {Unit} from '../model/unit.model';
import {Observable} from 'rxjs';
import {Equipment} from '../model/equipment.model';
import {map} from 'rxjs/operators';
import {CalculatorUtils} from '../calculator-utils';
import {Algorithm} from '../model/algorithm.model';
import {Result} from '../model/result.model';
import {EquipmentSet} from '../model/equipment-set.model';
import {isNullOrUndefined} from 'util';
import {Build} from '../model/build.model';
import {Esper} from '../model/esper.model';
import {SPECIAL_WEAPON_ENHANCEMENTS} from '../calculator-constants';
import {Skill} from '../model/skill.model';

@Injectable()
export class UnitsService {

  public units: Array<Unit>;
  public physicalChainers: Array<Unit>;
  public magicalChainers: Array<Unit>;
  public hybridChainers: Array<Unit>;
  public physicalFinishers: Array<Unit>;
  public magicalFinishers: Array<Unit>;
  public hybridFinishers: Array<Unit>;
  public defenders: Array<Unit>;
  public selectedUnit: Unit;
  public rankFilter = 7;

  constructor(private databaseClient: DatabaseClientService) {
  }

  public loadUnits() {
    this.databaseClient.getUnits$()
      .subscribe(units => {
        this.units = units;
        this.filterByRank(7);
      });
  }

  public filterByRank(rankFilter: number) {
    this.physicalChainers = this.units.filter((u: Unit) => u.rank === rankFilter &&
      u.builds.filter((b: Build) => b.algorithmId === 1).length > 0);
    this.magicalChainers = this.units.filter((u: Unit) => u.rank === rankFilter &&
      u.builds.filter((b: Build) => b.algorithmId === 2).length > 0);
    this.hybridChainers = this.units.filter((u: Unit) => u.rank === rankFilter &&
      u.builds.filter((b: Build) => b.algorithmId === 3).length > 0);
    this.physicalFinishers = this.units.filter((u: Unit) => u.rank === rankFilter &&
      u.builds.filter((b: Build) => b.algorithmId === 4).length > 0);
    this.magicalFinishers = this.units.filter((u: Unit) => u.rank === rankFilter &&
      u.builds.filter((b: Build) => b.algorithmId === 5 || b.algorithmId === 7).length > 0);
    this.hybridFinishers = this.units.filter((u: Unit) => u.rank === rankFilter &&
      u.builds.filter((b: Build) => b.algorithmId === 6).length > 0);
    this.defenders = this.units.filter((u: Unit) => u.rank === rankFilter &&
      u.builds.filter((b: Build) => b.algorithmId === 8).length > 0);
  }

  public equipInSlot(slot: string, equipment: Equipment) {
    if (equipment.id === -1) {
      this.selectedUnit.selectedBuild.equipments[slot] = null;
    } else {
      this.unequipWeaponEnhancementsIfWeaponTypeChange(slot, equipment);
      if (slot === 'right_hand' && equipment.isTwoHanded()) {
        this.selectedUnit.selectedBuild.equipments['left_hand'] = null;
      }
      this.selectedUnit.selectedBuild.equipments[slot] = equipment;
      if (this.getEquipments().left_hand && !this.checkDwForSecondWeapon(this.getEquipments().left_hand, 'left_hand')) {
        this.getEquipments().left_hand = null;
      }
    }
    if (!this.getEquipments().right_hand || !this.getEquipments().right_hand.isWeaponTraitPossible()) {
      this.getEquipments()['rh_trait1'] = null;
      this.getEquipments()['rh_trait2'] = null;
      this.getEquipments()['rh_trait3'] = null;
    }
    if (!this.getEquipments().left_hand || !this.getEquipments().left_hand.isWeaponTraitPossible()) {
      this.getEquipments()['lh_trait1'] = null;
      this.getEquipments()['lh_trait2'] = null;
      this.getEquipments()['lh_trait3'] = null;
    }
  }

  private unequipWeaponEnhancementsIfWeaponTypeChange(slot: string, equipment: Equipment) {
    if (this.getEquipments().right_hand && slot === 'right_hand' && equipment.category !== this.getEquipments().right_hand.category) {
      if (this.getEquipments().rh_trait1 && SPECIAL_WEAPON_ENHANCEMENTS.indexOf(this.getEquipments().rh_trait1.id) > -1) {
        this.getEquipments().rh_trait1 = null;
      }
      if (this.getEquipments().rh_trait2 && SPECIAL_WEAPON_ENHANCEMENTS.indexOf(this.getEquipments().rh_trait2.id) > -1) {
        this.getEquipments().rh_trait2 = null;
      }
      if (this.getEquipments().rh_trait3 && SPECIAL_WEAPON_ENHANCEMENTS.indexOf(this.getEquipments().rh_trait3.id) > -1) {
        this.getEquipments().rh_trait3 = null;
      }
    }
    if (this.getEquipments().left_hand && slot === 'left_hand' && equipment.category !== this.getEquipments().left_hand.category) {
      if (this.getEquipments().lh_trait1 && SPECIAL_WEAPON_ENHANCEMENTS.indexOf(this.getEquipments().lh_trait1.id) > -1) {
        this.getEquipments().lh_trait1 = null;
      }
      if (this.getEquipments().lh_trait2 && SPECIAL_WEAPON_ENHANCEMENTS.indexOf(this.getEquipments().lh_trait2.id) > -1) {
        this.getEquipments().lh_trait2 = null;
      }
      if (this.getEquipments().lh_trait3 && SPECIAL_WEAPON_ENHANCEMENTS.indexOf(this.getEquipments().lh_trait3.id) > -1) {
        this.getEquipments().lh_trait3 = null;
      }
    }
  }

  public getAllowedEquipmentsForSlot$(slot: string): Observable<Array<Equipment>> {
    if (slot.startsWith('rh_trait') || slot.startsWith('lh_trait')) {
      let category = 0;
      if (slot.startsWith('rh_trait')) {
        category = this.getEquipments().right_hand.category;
      } else {
        category = this.getEquipments().left_hand.category;
      }

      return this.databaseClient.getEquipmentsForWeaponCategory$(category)
        .pipe(
          map((items: Array<Equipment>) => items
            .map((item: Equipment) => new Equipment(item))
            .filter((item: Equipment) => this.checkWeaponTraitUniqueness(item, slot))
            .sort((a: Equipment, b: Equipment) => -this.compareEquipmentsForAlgorithm(a, b))
          )
        );
    }
    return this.databaseClient.getEquipmentsForUnitAndSlot$(slot, this.selectedUnit.id)
      .pipe(
        map((items: Array<Equipment>) => items
          .map((item: Equipment) => new Equipment(item))
          .filter((item: Equipment) => this.isAllowed(item, slot))
          .map((item: Equipment) => this.getEquipments().activateEquipmentConditionalPassives(item, this.selectedUnit.id))
          .sort((a: Equipment, b: Equipment) => -this.compareEquipmentsForAlgorithm(a, b))
        )
      );
  }

  private compareEquipmentsForAlgorithm(a: Equipment, b: Equipment): number {
    if (this.selectedUnit.selectedBuild.algorithmId === 1 || this.selectedUnit.selectedBuild.algorithmId === 4) {
      if (this.selectedUnit.selectedBuild.skills.find((skill: Skill) => skill.calculation_stat === 'def')) {
        return this.compareEquipmentsForStat(a, b, 'def');
      }
      return this.compareEquipmentsForStat(a, b, 'atk');
    }
    if (this.selectedUnit.selectedBuild.algorithmId === 2 || this.selectedUnit.selectedBuild.algorithmId === 5) {
      if (this.selectedUnit.selectedBuild.skills.find((skill: Skill) => skill.calculation_stat === 'spr')) {
        return this.compareEquipmentsForStat(a, b, 'spr');
      }
      return this.compareEquipmentsForStat(a, b, 'mag');
    }
    if (this.selectedUnit.selectedBuild.algorithmId === 3 || this.selectedUnit.selectedBuild.algorithmId === 6) {
      return this.compareEquipmentsForHybrid(a, b, 'atk', 'mag');
    }
    if (this.selectedUnit.selectedBuild.algorithmId === 8) {
      return this.compareEquipmentsForDef(a, b);
    }
    if (this.selectedUnit.selectedBuild.algorithmId === 7) {
      return this.compareEquipmentsForEvoMag(a, b);
    }
    return 0;
  }

  private compareEquipmentsForStat(a: Equipment, b: Equipment, stat: string): number {
    const aStat = this.estimateStat(a, stat);
    const bStat = this.estimateStat(b, stat);
    return CalculatorUtils.compareNumbers(aStat, bStat);
  }

  private compareEquipmentsForHybrid(a: Equipment, b: Equipment, stat1: string, stat2: string): number {
    const aStat1 = this.estimateStat(a, stat1);
    const bStat1 = this.estimateStat(b, stat1);
    const aStat2 = this.estimateStat(a, stat2);
    const bStat2 = this.estimateStat(b, stat2);
    return CalculatorUtils.compareNumbers(aStat1 + aStat2, bStat1 + bStat2);
  }

  private compareEquipmentsForDef(a: Equipment, b: Equipment): number {
    const currentHp = this.selectedUnit.stats.hp.total;
    const currentDef = this.selectedUnit.stats.def.total;
    const currentSpr = this.selectedUnit.stats.spr.total;
    const aHp = this.estimateStat(a, 'hp');
    const aDef = this.estimateStat(a, 'def');
    const aSpr = this.estimateStat(a, 'spr');
    const bHp = this.estimateStat(b, 'hp');
    const bDef = this.estimateStat(b, 'def');
    const bSpr = this.estimateStat(b, 'spr');
    return CalculatorUtils.compareNumbers(
      currentHp * (aDef + aSpr) + aHp * (currentDef + currentSpr),
      currentHp * (bDef + bSpr) + bHp * (currentDef + currentSpr)
    );
  }

  private compareEquipmentsForEvoMag(a: Equipment, b: Equipment) {
    const aEvo = a.evo ? a.evo : 0;
    const bEvo = b.evo ? b.evo : 0;
    const comparison = CalculatorUtils.compareNumbers(aEvo, bEvo);
    return comparison !== 0 ? comparison : this.compareEquipmentsForHybrid(a, b, 'mag', 'spr');
  }

  private estimateStat(equipment: Equipment, stat: string) {
    const conditional_percent = equipment.conditional_passives
      .filter(passive => passive.active)
      .map(passive => passive[stat]).reduce((val1, val2) => val1 + val2, 0);
    const conditional_dh = equipment.conditional_passives
      .filter(passive => passive.active)
      .map(passive => passive[stat + '_dh']).reduce((val1, val2) => val1 + val2, 0);
    const conditional_tdh = equipment.conditional_passives
      .filter(passive => passive.active)
      .map(passive => passive[stat + '_tdh']).reduce((val1, val2) => val1 + val2, 0);
    const conditional_dw = equipment.conditional_passives
      .filter(passive => passive.active)
      .map(passive => passive[stat + '_dw']).reduce((val1, val2) => val1 + val2, 0);
    const from_passive = this.selectedUnit.stats[stat].base * (equipment[stat + '_percent'] + conditional_percent) / 100;
    const from_dh = this.getEquipments().isDoubleHandActive() ?
      this.selectedUnit.stats[stat].base_equipment * (equipment[stat + '_dh'] + conditional_dh) / 100 : 0;
    const from_tdh = this.getEquipments().isTrueDoubleHandActive() ?
      this.selectedUnit.stats[stat].base_equipment * (equipment[stat + '_tdh'] + conditional_tdh) / 100 : 0;
    const from_dw = this.getEquipments().isDualWielding() ?
      this.selectedUnit.stats[stat].base_equipment * (equipment[stat + '_dw'] + conditional_dw) / 100 : 0;
    return equipment[stat] + from_passive + from_dh + from_tdh + from_dw;
  }

  private isAllowed(item: Equipment, slot: string): boolean {
    let isAllowed = this.checkUniqueness(item, slot);
    isAllowed = isAllowed && this.checkTwoHandedMainHandForOffhand(slot);
    isAllowed = isAllowed && this.checkDwForSecondWeapon(item, slot);
    isAllowed = isAllowed && this.checkSexRestrictions(item);
    return isAllowed;
  }

  private checkSexRestrictions(item: Equipment) {
    return isNullOrUndefined(item.sex_restriction) || item.sex_restriction === this.selectedUnit.sex;
  }

  private checkWeaponTraitUniqueness(item: Equipment, slot: string): boolean {
    if (item.unique) {
      if (slot.startsWith('rh_trait') && (
        (this.getEquipments().rh_trait1 && item.id === this.getEquipments().rh_trait1.id)
        || (this.getEquipments().rh_trait2 && item.id === this.getEquipments().rh_trait2.id)
        || (this.getEquipments().rh_trait3 && item.id === this.getEquipments().rh_trait3.id)
      )) {
        return false;
      }
      if (slot.startsWith('lh_trait') && (
        (this.getEquipments().lh_trait1 && item.id === this.getEquipments().lh_trait1.id)
        || (this.getEquipments().lh_trait2 && item.id === this.getEquipments().lh_trait2.id)
        || (this.getEquipments().lh_trait3 && item.id === this.getEquipments().lh_trait3.id)
      )) {
        return false;
      }
    }
    return true;
  }

  private checkUniqueness(item: Equipment, slot: string): boolean {
    if (item.unique) {
      if (slot.startsWith('materia') && (
        (this.getEquipments().materia1 && item.id === this.getEquipments().materia1.id)
        || (this.getEquipments().materia2 && item.id === this.getEquipments().materia2.id)
        || (this.getEquipments().materia3 && item.id === this.getEquipments().materia3.id)
        || (this.getEquipments().materia4 && item.id === this.getEquipments().materia4.id))
      ) {
        return false;
      }
      if (slot.startsWith('accessory') && (
        (this.getEquipments().accessory1 && item.id === this.getEquipments().accessory1.id)
        || (this.getEquipments().accessory2 && item.id === this.getEquipments().accessory2.id))
      ) {
        return false;
      }
      if (slot === 'right_hand' || slot === 'left_hand') {
        if (
          (this.getEquipments().right_hand && item.id === this.getEquipments().right_hand.id)
          || (this.selectedUnit.selectedBuild.equipments.left_hand && item.id === this.selectedUnit.selectedBuild.equipments.left_hand.id)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  private checkTwoHandedMainHandForOffhand(slot: string) {
    return slot !== 'left_hand' || !this.getEquipments().right_hand.isTwoHanded();
  }

  private checkDwForSecondWeapon(item: Equipment, slot: string): boolean {
    return slot !== 'left_hand' || item.isShield()
      || (this.getEquipments().isDwEquipped() && !item.isTwoHanded())
      || (this.selectedUnit.isWithNativeDw() && !item.isTwoHanded())
      || item.isWeaponWithDw()
      || (this.selectedUnit.isWithPartialDwForCategory(item.category)
        && this.selectedUnit.isWithPartialDwForCategory(this.getEquipments().right_hand.category)
        && !item.isTwoHanded())
      ;
  }

  public pushBuild(isResultToBePushed: boolean) {
    this.databaseClient.pushBuild$(this.selectedUnit, isResultToBePushed).subscribe();
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

  public getEsper(): Esper {
    return this.selectedUnit.selectedBuild.esper;
  }

  public getSkills(): Array<Skill> {
    return this.selectedUnit.selectedBuild.skills;
  }
}
