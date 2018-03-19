import {UnitStats} from './unit-stats.model';
import {Build} from './build.model';

export class Unit {
  public id: number;
  public name: string;
  public rank: number;
  public icon: string;
  public stats: UnitStats;
  public builds: Array<Build> = [];

  constructor(unit: Unit) {
    this.id = unit.id;
    this.name = unit.name;
    this.rank = unit.rank;
    this.icon = unit.icon;
    this.stats = new UnitStats(unit.stats);
    unit.builds.forEach(build => this.builds.push(new Build(build)));
  }
}
