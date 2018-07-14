import {ConditionalPassive} from './conditional-passive.model';
import {BODY_CATEGORIES, HEAD_CATEGORIES, SHIELDS_CATEGORIES, WEAPONS_CATEGORIES} from '../calculator-constants';
import {KillerPassives} from './killer-passives.model';

export class Equipment {
  // from backend
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
  public hp_dh: number;
  public hp_tdh: number;
  public mp_dh: number;
  public mp_tdh: number;
  public atk_dh: number;
  public atk_tdh: number;
  public mag_dh: number;
  public mag_tdh: number;
  public def_dh: number;
  public def_tdh: number;
  public spr_dh: number;
  public spr_tdh: number;
  public evo: number;
  public variance_min: number;
  public variance_max: number;
  public unique: boolean;
  public physical_killers: KillerPassives;
  public magical_killers: KillerPassives;
  public sex_restriction: number;
  public conditional_passives: Array<ConditionalPassive> = [];
  public elements: Array<number> = [];

  // transcient
  public filtered = false;

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
    this.hp_dh = equipment.hp_dh;
    this.hp_tdh = equipment.hp_tdh;
    this.mp_dh = equipment.mp_dh;
    this.mp_tdh = equipment.mp_tdh;
    this.atk_dh = equipment.atk_dh;
    this.atk_tdh = equipment.atk_tdh;
    this.mag_dh = equipment.mag_dh;
    this.mag_tdh = equipment.mag_tdh;
    this.def_dh = equipment.def_dh;
    this.def_tdh = equipment.def_tdh;
    this.spr_dh = equipment.spr_dh;
    this.spr_tdh = equipment.spr_tdh;
    this.evo = equipment.evo;
    this.variance_min = equipment.variance_min;
    this.variance_max = equipment.variance_max;
    this.unique = equipment.unique;
    if (equipment.physical_killers) {
      this.physical_killers = KillerPassives.construct(equipment.physical_killers);
    }
    if (equipment.magical_killers) {
      this.magical_killers = KillerPassives.construct(equipment.magical_killers);
    }
    this.sex_restriction = equipment.sex_restriction === 1 || equipment.sex_restriction === 2 ? equipment.sex_restriction : undefined;
    if (Array.isArray(equipment.conditional_passives)) {
      equipment.conditional_passives
        .forEach(conditional_passive => this.conditional_passives.push(new ConditionalPassive(conditional_passive)));
    }
    if (Array.isArray(equipment.elements)) {
      this.elements = equipment.elements;
    }
  }

  public isWeapon(): boolean {
    return WEAPONS_CATEGORIES.indexOf(this.category) > -1;
  }

  public isShield(): boolean {
    return SHIELDS_CATEGORIES.indexOf(this.category) > -1;
  }

  public isHead(): boolean {
    return HEAD_CATEGORIES.indexOf(this.category) > -1;
  }

  public isBody(): boolean {
    return BODY_CATEGORIES.indexOf(this.category) > -1;
  }

  public isTwoHanded(): boolean {
    return this.variance_min > 0 && this.variance_max > 0;
  }

  public isWeaponWithDw(): boolean {
    // TODO currently hardcoded, need to find a way to retrieve this from backend
    return this.id === 1199 // second knife
      || this.id === 1352 // bowie knife
      || this.id === 2293 // sasuke's katana
      ;
  }

  public getPhysicalKiller(opponentKillerType): number {
    return this.physical_killers && this.physical_killers[opponentKillerType] ? this.physical_killers[opponentKillerType] : 0;
  }

  public getMagicalKiller(opponentKillerType): number {
    return this.magical_killers && this.magical_killers[opponentKillerType] ? this.magical_killers[opponentKillerType] : 0;
  }
}
