import {UnitStats} from './unit-stats.model';

export class Unit {
  public id: number;
  public name: string;
  public rank: number;
  public icon: string;
  public stats: UnitStats;

  constructor() {
  }
}
