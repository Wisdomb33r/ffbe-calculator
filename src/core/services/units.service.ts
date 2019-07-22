import {Injectable} from '@angular/core';
import {DatabaseClientService} from './database-client.service';
import {Unit} from '../model/unit.model';
import {Observable} from 'rxjs';
import {Equipment} from '../model/equipment.model';
import {map, tap} from 'rxjs/operators';
import {CalculatorUtils} from '../calculator-utils';
import {Algorithm} from '../model/algorithm.model';
import {Result} from '../model/result.model';
import {isNullOrUndefined} from 'util';
import {Build} from '../model/build.model';
import {Esper} from '../model/esper.model';
import {EQUIPMENT_EXCLUSIONS} from '../calculator-constants';
import {Skill} from '../model/skill.model';
import {EquipmentExclusion} from '../model/equipment-exclusion.model';

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
  public stmrExclusion = false;

  constructor(private databaseClient: DatabaseClientService) {
  }

  public loadUnits$(): Observable<Array<Unit>> {
    return this.databaseClient.getUnits$().pipe(
      tap(units => {
        this.units = units;
        this.filterByRank(7);
      })
    );
  }

  public isLoaded(): boolean {
    return this.units && this.units.length > 0;
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

  public getUnitListByAlgorithm(algorithm: number) {
    switch (algorithm) {
      case 1:
        return this.physicalChainers.slice();
      case 2:
        return this.magicalChainers.slice();
      case 3:
        return this.hybridChainers.slice();
      case 4:
        return this.physicalFinishers.slice();
      case 5:
        return this.magicalFinishers.slice();
      case 6:
        return this.hybridFinishers.slice();
      case 8:
        return this.defenders.slice();
    }
    return [];
  }

  public resetUnitsRankingResults() {
    this.units.forEach((unit: Unit) => unit.rankingResult = undefined);
  }

  public equipInSlot(slot: string, equipment: Equipment) {
    if (equipment.id === -1) {
      this.selectedUnit.emptySlot(slot);
    } else {
      this.selectedUnit.equipInSlot(slot, equipment);
    }
    if (this.selectedUnit.selectedEquipmentSet.left_hand
      && !this.checkDwForSecondWeapon(this.selectedUnit.selectedEquipmentSet.left_hand, 'left_hand')) {
      this.selectedUnit.emptySlot('left_hand');
    }
  }

  public getAllowedEquipmentsForSlot$(slot: string): Observable<Array<Equipment>> {
    if (slot.startsWith('rh_trait') || slot.startsWith('lh_trait')) {
      let category = 0;
      if (slot.startsWith('rh_trait')) {
        category = this.selectedUnit.selectedEquipmentSet.right_hand.category;
      } else {
        category = this.selectedUnit.selectedEquipmentSet.left_hand.category;
      }

      return this.databaseClient.getEquipmentsForWeaponCategory$(category)
        .pipe(
          map((items: Array<Equipment>) => items
            .map((item: Equipment) => new Equipment(item))
            .filter((item: Equipment) => this.checkWeaponTraitUniqueness(item, slot) && this.checkExclusions(item, slot))
            .sort((a: Equipment, b: Equipment) => -this.compareEquipmentsForAlgorithm(a, b))
          )
        );
    }
    return this.databaseClient
      .getEquipmentsForUnitAndSlot$(slot, this.selectedUnit.id, this.selectedUnit.selectedEquipmentSet.getExtraEquipmentTypes())
      .pipe(
        map((items: Array<Equipment>) => items
          .map((item: Equipment) => new Equipment(item))
          .filter((item: Equipment) => this.isAllowed(item, slot))
          .map((item: Equipment) => this.selectedUnit.selectedEquipmentSet.activateEquipmentConditionalPassives(item, this.selectedUnit.id))
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
    const from_dh = this.selectedUnit.selectedEquipmentSet.isDoubleHandActive() ?
      this.selectedUnit.stats[stat].base_equipment * (equipment[stat + '_dh'] + conditional_dh) / 100 : 0;
    const from_tdh = this.selectedUnit.selectedEquipmentSet.isTrueDoubleHandActive() ?
      this.selectedUnit.stats[stat].base_equipment * (equipment[stat + '_tdh'] + conditional_tdh) / 100 : 0;
    const from_dw = this.selectedUnit.selectedEquipmentSet.isDualWielding() ?
      this.selectedUnit.stats[stat].base_equipment * (equipment[stat + '_dw'] + conditional_dw) / 100 : 0;
    return equipment[stat] + from_passive + from_dh + from_tdh + from_dw;
  }

  private isAllowed(item: Equipment, slot: string): boolean {
    let isAllowed = this.checkUniqueness(item, slot);
    isAllowed = isAllowed && this.checkExclusions(item, slot);
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
        (this.selectedUnit.selectedEquipmentSet.rh_trait1 && item.id === this.selectedUnit.selectedEquipmentSet.rh_trait1.id)
        || (this.selectedUnit.selectedEquipmentSet.rh_trait2 && item.id === this.selectedUnit.selectedEquipmentSet.rh_trait2.id)
        || (this.selectedUnit.selectedEquipmentSet.rh_trait3 && item.id === this.selectedUnit.selectedEquipmentSet.rh_trait3.id)
      )) {
        return false;
      }
      if (slot.startsWith('lh_trait') && (
        (this.selectedUnit.selectedEquipmentSet.lh_trait1 && item.id === this.selectedUnit.selectedEquipmentSet.lh_trait1.id)
        || (this.selectedUnit.selectedEquipmentSet.lh_trait2 && item.id === this.selectedUnit.selectedEquipmentSet.lh_trait2.id)
        || (this.selectedUnit.selectedEquipmentSet.lh_trait3 && item.id === this.selectedUnit.selectedEquipmentSet.lh_trait3.id)
      )) {
        return false;
      }
    }
    return true;
  }

  private checkUniqueness(item: Equipment, slot: string): boolean {
    if (item.unique) {
      if (slot.startsWith('materia') && (
        (this.selectedUnit.selectedEquipmentSet.materia1 && item.id === this.selectedUnit.selectedEquipmentSet.materia1.id)
        || (this.selectedUnit.selectedEquipmentSet.materia2 && item.id === this.selectedUnit.selectedEquipmentSet.materia2.id)
        || (this.selectedUnit.selectedEquipmentSet.materia3 && item.id === this.selectedUnit.selectedEquipmentSet.materia3.id)
        || (this.selectedUnit.selectedEquipmentSet.materia4 && item.id === this.selectedUnit.selectedEquipmentSet.materia4.id))
      ) {
        return false;
      }
      if (slot.startsWith('accessory') && (
        (this.selectedUnit.selectedEquipmentSet.accessory1 && item.id === this.selectedUnit.selectedEquipmentSet.accessory1.id)
        || (this.selectedUnit.selectedEquipmentSet.accessory2 && item.id === this.selectedUnit.selectedEquipmentSet.accessory2.id))
      ) {
        return false;
      }
      if (slot === 'right_hand' || slot === 'left_hand') {
        if (
          (this.selectedUnit.selectedEquipmentSet.right_hand && item.id === this.selectedUnit.selectedEquipmentSet.right_hand.id)
          || (this.selectedUnit.selectedEquipmentSet.left_hand && item.id === this.selectedUnit.selectedEquipmentSet.left_hand.id)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  private checkExclusions(item: Equipment, slot: string): boolean {
    const exclusion = EQUIPMENT_EXCLUSIONS.find((e: EquipmentExclusion) => e.id === item.id);
    if (exclusion) {
      let slotsToCheck: Array<string> = [];
      if (slot === 'rh_trait1') {
        slotsToCheck = ['rh_trait2', 'rh_trait3'];
      }
      if (slot === 'rh_trait2') {
        slotsToCheck = ['rh_trait1', 'rh_trait3'];
      }
      if (slot === 'rh_trait3') {
        slotsToCheck = ['rh_trait1', 'rh_trait2'];
      }
      if (slot === 'lh_trait1') {
        slotsToCheck = ['lh_trait2', 'lh_trait3'];
      }
      if (slot === 'lh_trait2') {
        slotsToCheck = ['lh_trait1', 'lh_trait3'];
      }
      if (slot === 'lh_trait3') {
        slotsToCheck = ['lh_trait1', 'lh_trait2'];
      }
      if (slot === 'materia1') {
        slotsToCheck = ['materia2', 'materia3', 'materia4'];
      }
      if (slot === 'materia2') {
        slotsToCheck = ['materia1', 'materia3', 'materia4'];
      }
      if (slot === 'materia3') {
        slotsToCheck = ['materia1', 'materia2', 'materia4'];
      }
      if (slot === 'materia4') {
        slotsToCheck = ['materia1', 'materia2', 'materia3'];
      }
      if (slotsToCheck.some(
        (s: string) => this.selectedUnit.selectedEquipmentSet[s]
          && exclusion.exclude.find(excludedBy => excludedBy === this.selectedUnit.selectedEquipmentSet[s].id) > 0)) {
        return false;
      }
    }
    return true;
  }

  private checkTwoHandedMainHandForOffhand(slot: string) {
    return slot !== 'left_hand' || !this.selectedUnit.selectedEquipmentSet.right_hand
      || !this.selectedUnit.selectedEquipmentSet.right_hand.isTwoHanded();
  }

  private checkDwForSecondWeapon(item: Equipment, slot: string): boolean {
    return slot !== 'left_hand' || item.isShield()
      || (this.selectedUnit.selectedEquipmentSet.isDwEquipped() && !item.isTwoHanded())
      || (this.selectedUnit.isWithNativeDw() && !item.isTwoHanded())
      || item.dual_wield
      || (this.selectedUnit.isWithPartialDwForCategory(item.category)
        && this.selectedUnit.isWithPartialDwForCategory(this.selectedUnit.selectedEquipmentSet.right_hand.category)
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

  public getEsper(): Esper {
    return this.selectedUnit.selectedBuild.esper;
  }

  public getSkills(): Array<Skill> {
    return this.selectedUnit.selectedBuild.skills;
  }

  public getStartPhaseSkills(): Array<Skill> {
    return this.selectedUnit.selectedBuild.startPhaseSkills;
  }
}
