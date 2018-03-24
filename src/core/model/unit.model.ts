import {UnitStats} from './unit-stats.model';
import {Build} from './build.model';

export class Unit {
  // from backend
  public id: number;
  public name: string;
  public rank: number;
  public icon: string;
  public stats: UnitStats;
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
    this.stats.computeTotals();
  }
}
