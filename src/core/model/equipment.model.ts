import {ConditionalPassive} from './conditional-passive.model';
import {SHIELDS_CATEGORIES, WEAPONS_CATEGORIES} from '../calculator-constants';

export class Equipment {
  public id: number;
  public category: number;
  public name: string;
  public icon: string;
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
  public atk_dh: number;
  public atk_tdh: number;
  public mag_dh: number;
  public mag_tdh: number;
  public variance_min: number;
  public variance_max: number;
  public conditional_passives: Array<ConditionalPassive> = [];

  constructor(equipment: Equipment) {
    this.id = equipment.id;
    this.category = equipment.category;
    this.name = equipment.name;
    this.icon = equipment.icon;
    this.hp = equipment.hp;
    this.hp_percent = equipment.hp_percent;
    this.mp = equipment.mp;
    this.mp_percent = equipment.mp_percent;
    this.atk = equipment.atk;
    this.atk_percent = equipment.atk_percent;
    this.mag = equipment.mag;
    this.mag_percent = equipment.mag_percent;
    this.def = equipment.def;
    this.def_percent = equipment.def_percent;
    this.spr = equipment.spr;
    this.spr_percent = equipment.spr_percent;
    this.atk_dh = equipment.atk_dh;
    this.atk_tdh = equipment.atk_tdh;
    this.mag_dh = equipment.mag_dh;
    this.mag_tdh = equipment.mag_tdh;
    this.variance_min = equipment.variance_min;
    this.variance_max = equipment.variance_max;
    if (Array.isArray(equipment.conditional_passives)) {
      equipment.conditional_passives
        .forEach(conditional_passive => this.conditional_passives.push(new ConditionalPassive(conditional_passive)));
    }
  }

  public isWeapon(): boolean {
    return WEAPONS_CATEGORIES.indexOf(this.category) > -1;
  }

  public isShield(): boolean {
    return SHIELDS_CATEGORIES.indexOf(this.category) > -1;
  }

  public isOneHanded(): boolean {
    return this.variance_min > 0 && this.variance_max > 0;
  }
}
