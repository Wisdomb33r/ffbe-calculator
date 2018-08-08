import {UnitStats} from './unit-stats.model';
import {Build} from './build.model';
import {ConditionalPassive} from './conditional-passive.model';
import {isNullOrUndefined} from 'util';

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
    // TODO currently hardcoded, need to find a way to retrieve this from backend
    return this.id === 258 // lightning 6*
      || this.id === 969 // lightning 7*
      || this.id === 319 // luneth 6*
      || this.id === 974 // luneth 7*
      || this.id === 590 // onion knight
      || this.id === 639 // nyx
      || this.id === 775 // 2B
      || this.id === 844 // CG Jake
      || this.id === 942 // CG Raegen
      || this.id === 8063 // A2
      || this.id === 8159; // Rico
  }

  public isWithPartialDwForCategory(category: number): boolean {
    return this.isPartialDwNativeForCategory(category) || this.selectedBuild.equipments.isPartialDwEquippedForCategory(category);
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
    let killer = this.selectedBuild.getPhysicalKillers();
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.physical_killers ? passive.physical_killers.getKillerSum() : 0)
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public getPhysicalKiller(opponentKillerType: string): number {
    let killer = this.selectedBuild.getPhysicalKiller(opponentKillerType);
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.getPhysicalKiller(opponentKillerType))
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public getMagicalKillers(): number {
    let killer = this.selectedBuild.getMagicalKillers();
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.magical_killers ? passive.magical_killers.getKillerSum() : 0)
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public getMagicalKiller(opponentKillerType: string): number {
    let killer = this.selectedBuild.getMagicalKiller(opponentKillerType);
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.getMagicalKiller(opponentKillerType))
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public computeRealStats() {
    this.stats.defineEquipmentsStats(
      this.selectedBuild.equipments.sumEquipmentStat('hp'),
      this.selectedBuild.equipments.sumEquipmentStat('mp'),
      this.selectedBuild.equipments.sumEquipmentStat('atk'),
      this.selectedBuild.equipments.sumEquipmentStat('mag'),
      this.selectedBuild.equipments.sumEquipmentStat('def'),
      this.selectedBuild.equipments.sumEquipmentStat('spr'),
      this.selectedBuild.equipments.sumEquipmentStat('evo')
    );
    const equipmentActiveConditionalPassives = this.selectedBuild.equipments.getAllActiveConditionalPassives(this.id);
    this.stats.defineEquipmentPassives(
      this.selectedBuild.equipments.sumEquipmentStatPercent('hp'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('mp'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('atk'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('mag'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('def'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('spr'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentDwBonuses(
      this.selectedBuild.equipments.sumEquipmentStat('hp_dw'),
      this.selectedBuild.equipments.sumEquipmentStat('mp_dw'),
      this.selectedBuild.equipments.sumEquipmentStat('atk_dw'),
      this.selectedBuild.equipments.sumEquipmentStat('mag_dw'),
      this.selectedBuild.equipments.sumEquipmentStat('def_dw'),
      this.selectedBuild.equipments.sumEquipmentStat('spr_dw'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentDhBonuses(
      this.selectedBuild.equipments.sumEquipmentStat('hp_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('mp_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('atk_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('mag_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('def_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('spr_dh'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentTdhBonuses(
      this.selectedBuild.equipments.sumEquipmentStat('hp_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('mp_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('atk_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('mag_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('def_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('spr_tdh'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEsperStats(this.selectedBuild.esper);

    const activeCondPassives = this.filterUnitActiveConditionalPassives();
    this.stats.defineConditionalPassives(activeCondPassives);
    this.stats.computeTotals(this.selectedBuild.equipments.isDoubleHandActive(),
      this.selectedBuild.equipments.isTrueDoubleHandActive(), this.selectedBuild.equipments.isDualWielding());
  }

  private filterUnitActiveConditionalPassives(): Array<ConditionalPassive> {
    const activeConditionalPassives: Array<ConditionalPassive> = [];
    this.conditional_passives.forEach(condPassive => {
      condPassive.active = false;
      if (this.selectedBuild.equipments.checkConditionalPassiveActive(condPassive, this.id)) {
        condPassive.active = true;
        activeConditionalPassives.push(condPassive);
      }
    });
    return activeConditionalPassives;
  }
}
