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
    return this.id === 258 // lightning
      || this.id === 319 // luneth
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
    return this.selectedBuild.getPhysicalKillers();
  }

  public getPhysicalKiller(opponentKillerType: string): number {
    return this.selectedBuild.getPhysicalKiller(opponentKillerType);
  }

  public getMagicalKillers(): number {
    return this.selectedBuild.getMagicalKillers();
  }

  public getMagicalKiller(opponentKillerType: string): number {
    return this.selectedBuild.getMagicalKiller(opponentKillerType);
  }

  public computeRealStats() {
    this.stats.defineEquipmentsStats(
      this.selectedBuild.equipments.sumEquipmentStat('hp'),
      this.selectedBuild.equipments.sumEquipmentStat('mp'),
      this.selectedBuild.equipments.sumEquipmentStat('atk'),
      this.selectedBuild.equipments.sumEquipmentStat('mag'),
      this.selectedBuild.equipments.sumEquipmentStat('def'),
      this.selectedBuild.equipments.sumEquipmentStat('spr'),
      this.selectedBuild.equipments.sumEquipmentStat('atk_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('atk_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('mag_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('mag_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('evo')
    );
    this.stats.defineEquipmentPassives(
      this.selectedBuild.equipments.sumEquipmentStatPercent('hp'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('mp'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('atk'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('mag'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('def'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('spr'),
      this.selectedBuild.equipments.getAllActiveConditionalPassives(this.id)
    );
    this.stats.defineEsperStats(this.selectedBuild.esper);

    const activeCondPassives = this.filterUnitActiveConditionalPassives();
    this.stats.defineConditionalPassives(activeCondPassives);
    this.stats.defineDhActivation(this.selectedBuild.equipments.isDoubleHandActive(),
      this.selectedBuild.equipments.isTrueDoubleHandActive());
    this.stats.computeTotals();
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
