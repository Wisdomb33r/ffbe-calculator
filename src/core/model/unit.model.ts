import {UnitStats} from './unit-stats.model';
import {Build} from './build.model';
import {ConditionalPassive} from './conditional-passive.model';

export class Unit {
  // from backend
  public id: number;
  public name: string;
  public rank: number;
  public icon: string;
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

  public isWithNativeDw() {
    // TODO currently hardcoded, need to find a way to retrieve this from backend
    return this.id === 590 || this.id === 775 || this.id === 8063;
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
      this.selectedBuild.equipments.sumEquipmentStat('mag_tdh')
    );
    this.stats.defineEquipmentPassives(
      this.selectedBuild.equipments.sumEquipmentStatPercent('hp'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('mp'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('atk'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('mag'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('def'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('spr'),
      this.selectedBuild.equipments.getAllActiveConditionalPassives()
    );

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
      if (this.selectedBuild.equipments.checkConditionalPassiveActive(condPassive)) {
        condPassive.active = true;
        activeConditionalPassives.push(condPassive);
      }
    });
    return activeConditionalPassives;
  }
}
