import {KillerPassives} from './killer-passives.model';

export class Esper {
  public id: number;
  public name_fr: string;
  public name_en: string;
  public build_fr: string;
  public build_en: string;
  public rank: number;
  public level: number;
  public icon: string;
  public hp: number;
  public mp: number;
  public atk: number;
  public mag: number;
  public def: number;
  public spr: number;
  public physical_killers: KillerPassives;
  public magical_killers: KillerPassives;
  public power: number;
  public damage_modifier: number;
  public stats_percent: number;
  public damageType: string;
  public elements: Array<number>;

  public calculateStatIncrease(statName: string): number {
    return (this.stats_percent > 0 ? 1 + this.stats_percent / 100 : 1) * this[statName] / 100;
  }
}
