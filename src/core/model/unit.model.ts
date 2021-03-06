import {UnitStats} from './unit-stats.model';
import {Build} from './build.model';
import {ConditionalPassive} from './conditional-passive.model';
import {isNullOrUndefined} from 'util';
import {Equipment} from './equipment.model';
import {EquipmentSet} from './equipment-set.model';

export class Unit {
  // from backend
  public id: number;
  public name: string;
  public rank: number;
  public icon: string;
  public sex: number;
  public stats: UnitStats;
  public conditional_passives: Array<ConditionalPassive> = [];
  public builds: Array<Build> = [];
  public isArchived: boolean;

  // transcient
  public selectedBuild: Build;
  public rankingResult: number;

  constructor(unit: Unit) {
    this.id = unit.id;
    this.name = unit.name;
    this.rank = unit.rank;
    this.icon = unit.icon;
    this.sex = unit.sex;
    this.stats = new UnitStats(unit.stats);
    unit.builds.forEach(build => this.builds.push(new Build(build)));
    if (Array.isArray(unit.conditional_passives)) {
      unit.conditional_passives.forEach(conditional_passive => this.conditional_passives.push(new ConditionalPassive(conditional_passive)));
    }
    this.isArchived = unit.isArchived;
  }

  public selectDefaultBuild() {
    if (this.builds && Array.isArray(this.builds) && this.builds.length > 0) {
      this.selectedBuild = this.builds[0];
    }
  }

  public selectBuild(id: number) {
    if (this.builds && id) {
      const build: Build = this.builds.find(b => b.id === id);
      if (build) {
        this.selectedBuild = build;
      }
    }
  }

  public isWithNativeDw() {
    return this.stats.dual_wield
      || (this.id === 8044 && this.selectedEquipmentSet.right_hand && this.selectedEquipmentSet.right_hand.id === 1202) // Fryevia
      || (this.id === 8044 && this.selectedEquipmentSet.accessory1 && this.selectedEquipmentSet.accessory1.id === 2799) // Fryevia
      || (this.id === 8044 && this.selectedEquipmentSet.accessory2 && this.selectedEquipmentSet.accessory2.id === 2799) // Fryevia

      || (this.id === 8053 && this.selectedEquipmentSet.right_hand && this.selectedEquipmentSet.right_hand.id === 1305) // Reberta
      || (this.id === 8053 && this.selectedEquipmentSet.materia1 && this.selectedEquipmentSet.materia1.id === 2597) // Reberta
      || (this.id === 8053 && this.selectedEquipmentSet.materia2 && this.selectedEquipmentSet.materia2.id === 2597) // Reberta
      || (this.id === 8053 && this.selectedEquipmentSet.materia3 && this.selectedEquipmentSet.materia3.id === 2597) // Reberta
      || (this.id === 8053 && this.selectedEquipmentSet.materia4 && this.selectedEquipmentSet.materia4.id === 2597) // Reberta

      || (this.id === 1275 && this.selectedEquipmentSet.right_hand && this.selectedEquipmentSet.right_hand.id === 3216) // Beowulf
      || (this.id === 1275 && this.selectedEquipmentSet.materia1 && this.selectedEquipmentSet.materia1.id === 3215) // Beowulf
      || (this.id === 1275 && this.selectedEquipmentSet.materia2 && this.selectedEquipmentSet.materia2.id === 3215) // Beowulf
      || (this.id === 1275 && this.selectedEquipmentSet.materia3 && this.selectedEquipmentSet.materia3.id === 3215) // Beowulf
      || (this.id === 1275 && this.selectedEquipmentSet.materia4 && this.selectedEquipmentSet.materia4.id === 3215) // Beowulf
      ;
  }

  public isWithPartialDwForCategory(category: number): boolean {
    return this.isPartialDwNativeForCategory(category) || this.selectedEquipmentSet.isPartialDwEquippedForCategory(category);
  }

  private isPartialDwNativeForCategory(category: number): boolean {
    return !isNullOrUndefined(
      this.conditional_passives.find(condPassive => condPassive.category === category && condPassive.partial_dw)
    );
  }

  public computeAll() {
    if (this.selectedBuild) {
      this.computeRealStats();
      this.calculateResults();
    }
  }

  public calculateResults() {
    this.selectedBuild.calculate(this);
  }

  public getPhysicalKillers(): number {
    let killer = this.selectedBuild.getPhysicalKillers(this.id);
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.physical_killers ? passive.physical_killers.getKillerSum() : 0)
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public getPhysicalKiller(opponentKillerType: string): number {
    let killer = this.selectedBuild.getPhysicalKiller(opponentKillerType, this.id);
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.getPhysicalKiller(opponentKillerType))
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public getMagicalKillers(): number {
    let killer = this.selectedBuild.getMagicalKillers(this.id);
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.magical_killers ? passive.magical_killers.getKillerSum() : 0)
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public getMagicalKiller(opponentKillerType: string): number {
    let killer = this.selectedBuild.getMagicalKiller(opponentKillerType, this.id);
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.getMagicalKiller(opponentKillerType))
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public getLbMultiplier() {
    return this.selectedEquipmentSet.sumEquipmentLbBoost(this.id)
      + (this.stats.lbMultiplier ? this.stats.lbMultiplier - 1 : 0);
  }

  public getLbPowerIncrease() {
    return this.selectedEquipmentSet.sumEquipmentLbMod(this.id);
  }

  public getEsperDamageModifier() {
    return this.selectedBuild.getEsperDamageModifier();
  }

  public emptySlot(slot: string) {
    this.selectedBuild.emptySlot(slot);
  }

  public equipInSlot(slot: string, equipment: Equipment) {
    this.selectedBuild.equipInSlot(slot, equipment);
  }

  public getLockedItems(): Array<Equipment> {
    return this.selectedEquipmentSet.getLockedItems();
  }

  public removeAllNonLockedItems() {
    this.selectedEquipmentSet.removeAllNonLocked();
  }

  public computeRealStats() {
    this.stats.defineEquipmentsStats(
      this.selectedEquipmentSet.sumEquipmentStat('hp'),
      this.selectedEquipmentSet.sumEquipmentStat('mp'),
      this.selectedEquipmentSet.sumEquipmentStat('atk'),
      this.selectedEquipmentSet.sumEquipmentStat('mag'),
      this.selectedEquipmentSet.sumEquipmentStat('def'),
      this.selectedEquipmentSet.sumEquipmentStat('spr'),
      this.selectedEquipmentSet.sumEquipmentStat('evo')
    );
    const equipmentActiveConditionalPassives = this.selectedEquipmentSet.getAllActiveConditionalPassives(this.id);
    this.stats.defineEquipmentPassives(
      this.selectedEquipmentSet.sumEquipmentStatPercent('hp'),
      this.selectedEquipmentSet.sumEquipmentStatPercent('mp'),
      this.selectedEquipmentSet.sumEquipmentStatPercent('atk'),
      this.selectedEquipmentSet.sumEquipmentStatPercent('mag'),
      this.selectedEquipmentSet.sumEquipmentStatPercent('def'),
      this.selectedEquipmentSet.sumEquipmentStatPercent('spr'),
      this.selectedEquipmentSet.sumEquipmentStat('jump'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentDwBonuses(
      this.selectedEquipmentSet.sumEquipmentStat('hp_dw'),
      this.selectedEquipmentSet.sumEquipmentStat('mp_dw'),
      this.selectedEquipmentSet.sumEquipmentStat('atk_dw'),
      this.selectedEquipmentSet.sumEquipmentStat('mag_dw'),
      this.selectedEquipmentSet.sumEquipmentStat('def_dw'),
      this.selectedEquipmentSet.sumEquipmentStat('spr_dw'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentDhBonuses(
      this.selectedEquipmentSet.sumEquipmentStat('hp_dh'),
      this.selectedEquipmentSet.sumEquipmentStat('mp_dh'),
      this.selectedEquipmentSet.sumEquipmentStat('atk_dh'),
      this.selectedEquipmentSet.sumEquipmentStat('mag_dh'),
      this.selectedEquipmentSet.sumEquipmentStat('def_dh'),
      this.selectedEquipmentSet.sumEquipmentStat('spr_dh'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentTdhBonuses(
      this.selectedEquipmentSet.sumEquipmentStat('hp_tdh'),
      this.selectedEquipmentSet.sumEquipmentStat('mp_tdh'),
      this.selectedEquipmentSet.sumEquipmentStat('atk_tdh'),
      this.selectedEquipmentSet.sumEquipmentStat('mag_tdh'),
      this.selectedEquipmentSet.sumEquipmentStat('def_tdh'),
      this.selectedEquipmentSet.sumEquipmentStat('spr_tdh'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentEsperPercent(
      this.selectedEquipmentSet.sumEquipmentStat('esper_percent'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEsperStats(this.selectedBuild.esper);

    const activeCondPassives = this.filterUnitActiveConditionalPassives();
    this.stats.defineConditionalPassives(activeCondPassives);
    this.stats.computeTotals(this.selectedEquipmentSet.isDoubleHandActive(),
      this.selectedEquipmentSet.isTrueDoubleHandActive(), this.selectedEquipmentSet.isDualWielding());
  }

  private filterUnitActiveConditionalPassives(): Array<ConditionalPassive> {
    const activeConditionalPassives: Array<ConditionalPassive> = [];
    this.conditional_passives.forEach(condPassive => {
      condPassive.active = false;
      if (this.selectedEquipmentSet.checkConditionalPassiveActive(condPassive, this.id)) {
        condPassive.active = true;
        activeConditionalPassives.push(condPassive);
      }
    });
    return activeConditionalPassives;
  }

  public get selectedEquipmentSet(): EquipmentSet {
    return this.selectedBuild.selectedEquipmentSet;
  }
}
