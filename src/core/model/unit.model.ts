import {UnitStats} from './unit-stats.model';
import {Build} from './build.model';
import {ConditionalPassive} from './conditional-passive.model';
import {isNullOrUndefined} from 'util';
import {Equipment} from './equipment.model';

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

  // transcient
  public selectedBuild: Build;

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
      || (this.id === 8044 && this.selectedBuild.selectedEquipmentSet.right_hand && this.selectedBuild.selectedEquipmentSet.right_hand.id === 1202) // Fryevia
      || (this.id === 8044 && this.selectedBuild.selectedEquipmentSet.accessory1 && this.selectedBuild.selectedEquipmentSet.accessory1.id === 2799) // Fryevia
      || (this.id === 8044 && this.selectedBuild.selectedEquipmentSet.accessory2 && this.selectedBuild.selectedEquipmentSet.accessory2.id === 2799) // Fryevia

      || (this.id === 8053 && this.selectedBuild.selectedEquipmentSet.right_hand && this.selectedBuild.selectedEquipmentSet.right_hand.id === 1305) // Reberta
      || (this.id === 8053 && this.selectedBuild.selectedEquipmentSet.materia1 && this.selectedBuild.selectedEquipmentSet.materia1.id === 2597) // Reberta
      || (this.id === 8053 && this.selectedBuild.selectedEquipmentSet.materia2 && this.selectedBuild.selectedEquipmentSet.materia2.id === 2597) // Reberta
      || (this.id === 8053 && this.selectedBuild.selectedEquipmentSet.materia3 && this.selectedBuild.selectedEquipmentSet.materia3.id === 2597) // Reberta
      || (this.id === 8053 && this.selectedBuild.selectedEquipmentSet.materia4 && this.selectedBuild.selectedEquipmentSet.materia4.id === 2597) // Reberta

      || (this.id === 1275 && this.selectedBuild.selectedEquipmentSet.right_hand && this.selectedBuild.selectedEquipmentSet.right_hand.id === 3216) // Beowulf
      || (this.id === 1275 && this.selectedBuild.selectedEquipmentSet.materia1 && this.selectedBuild.selectedEquipmentSet.materia1.id === 3215) // Beowulf
      || (this.id === 1275 && this.selectedBuild.selectedEquipmentSet.materia2 && this.selectedBuild.selectedEquipmentSet.materia2.id === 3215) // Beowulf
      || (this.id === 1275 && this.selectedBuild.selectedEquipmentSet.materia3 && this.selectedBuild.selectedEquipmentSet.materia3.id === 3215) // Beowulf
      || (this.id === 1275 && this.selectedBuild.selectedEquipmentSet.materia4 && this.selectedBuild.selectedEquipmentSet.materia4.id === 3215) // Beowulf
      ;
  }

  public isWithPartialDwForCategory(category: number): boolean {
    return this.isPartialDwNativeForCategory(category) || this.selectedBuild.selectedEquipmentSet.isPartialDwEquippedForCategory(category);
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
    return this.selectedBuild.selectedEquipmentSet.sumEquipmentLbBoost(this.id)
      + (this.stats.lb_multiplier ? this.stats.lb_multiplier - 1 : 0);
  }

  public getLbPowerIncrease() {
    return this.selectedBuild.selectedEquipmentSet.sumEquipmentLbMod(this.id);
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

  public computeRealStats() {
    this.stats.defineEquipmentsStats(
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('hp'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('mp'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('atk'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('mag'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('def'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('spr'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('evo')
    );
    const equipmentActiveConditionalPassives = this.selectedBuild.selectedEquipmentSet.getAllActiveConditionalPassives(this.id);
    this.stats.defineEquipmentPassives(
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStatPercent('hp'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStatPercent('mp'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStatPercent('atk'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStatPercent('mag'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStatPercent('def'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStatPercent('spr'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('jump'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentDwBonuses(
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('hp_dw'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('mp_dw'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('atk_dw'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('mag_dw'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('def_dw'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('spr_dw'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentDhBonuses(
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('hp_dh'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('mp_dh'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('atk_dh'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('mag_dh'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('def_dh'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('spr_dh'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentTdhBonuses(
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('hp_tdh'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('mp_tdh'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('atk_tdh'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('mag_tdh'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('def_tdh'),
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('spr_tdh'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentEsperPercent(
      this.selectedBuild.selectedEquipmentSet.sumEquipmentStat('esper_percent'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEsperStats(this.selectedBuild.esper);

    const activeCondPassives = this.filterUnitActiveConditionalPassives();
    this.stats.defineConditionalPassives(activeCondPassives);
    this.stats.computeTotals(this.selectedBuild.selectedEquipmentSet.isDoubleHandActive(),
      this.selectedBuild.selectedEquipmentSet.isTrueDoubleHandActive(), this.selectedBuild.selectedEquipmentSet.isDualWielding());
  }

  private filterUnitActiveConditionalPassives(): Array<ConditionalPassive> {
    const activeConditionalPassives: Array<ConditionalPassive> = [];
    this.conditional_passives.forEach(condPassive => {
      condPassive.active = false;
      if (this.selectedBuild.selectedEquipmentSet.checkConditionalPassiveActive(condPassive, this.id)) {
        condPassive.active = true;
        activeConditionalPassives.push(condPassive);
      }
    });
    return activeConditionalPassives;
  }
}
