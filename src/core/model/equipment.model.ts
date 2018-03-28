import {ConditionalPassive} from './conditional-passive.model';

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
    if (Array.isArray(equipment.conditional_passives)) {
      equipment.conditional_passives
        .forEach(conditional_passive => this.conditional_passives.push(new ConditionalPassive(conditional_passive)));
    }
  }
}
