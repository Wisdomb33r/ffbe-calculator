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
  public build: string;
  public hp: number;
  public hp_percent: number;
  public mp: number;
  public mp_percent: number;
  public atk: number;
  public atk_percent: number;
  public mag: number;
  public mag_percent: number;
  public def: number;
  public def_percent: number;
  public spr: number;
  public spr_percent: number;
  public physical_killers: KillerPassives;
  public magical_killers: KillerPassives;
  public power: number;
  public damage_modifier: number;
  public stats_percent: number;
  public damageType: string;
  public elements: Array<number>;

  public calculateStatIncrease(statName: string, esper_percent: number): number {
    return ((esper_percent > 0 ? esper_percent : 0) / 100) * this[statName] / 100;
  }
}
