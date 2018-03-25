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

  public computeAll() {
    if (this.selectedBuild) {
      this.computeRealStats();
    }
  }

  public computeRealStats() {
    const equipment_hp = this.selectedBuild.equipments.sumEquipmentStat('hp');
    const equipment_mp = this.selectedBuild.equipments.sumEquipmentStat('mp');
    const equipment_atk = this.selectedBuild.equipments.sumEquipmentStat('atk');
    const equipment_mag = this.selectedBuild.equipments.sumEquipmentStat('mag');
    const equipment_def = this.selectedBuild.equipments.sumEquipmentStat('def');
    const equipment_spr = this.selectedBuild.equipments.sumEquipmentStat('spr');
    this.stats.defineEquipmentsStats(equipment_hp, equipment_mp, equipment_atk, equipment_mag, equipment_def, equipment_spr);
    const activeCondPassives = this.filterActiveConditionalPassives();
    this.stats.defineConditionalPassives(activeCondPassives);
    // TODO define the equipment passives / dh / tdh
    this.stats.computeTotals(this.selectedBuild.equipments.getNumberOfWeapons(), this.selectedBuild.equipments.isOneHanded());
  }

  private filterActiveConditionalPassives(): Array<ConditionalPassive> {
    const activeConditionalPassives: Array<ConditionalPassive> = [];
    this.conditional_passives.forEach(condPassive => {
      if (this.selectedBuild.equipments.checkConditionalPassiveActive(condPassive)) {
        activeConditionalPassives.push(condPassive);
      }
    });
    return activeConditionalPassives;
  }
}
