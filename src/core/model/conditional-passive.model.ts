import {KillerPassives} from './killer-passives.model';

export class ConditionalPassive {
  // from backend
  public id: number;
  public unit: number;
  public category: number;
  public element: number;
  public skill: number;
  public skill_name: string;
  public skill_icon: string;
  public skill_mod: number;
  public hp: number;
  public hp_dh: number;
  public hp_tdh: number;
  public hp_dw: number;
  public mp: number;
  public mp_dh: number;
  public mp_tdh: number;
  public mp_dw: number;
  public atk: number;
  public atk_dh: number;
  public atk_tdh: number;
  public atk_dw: number;
  public mag: number;
  public mag_dh: number;
  public mag_tdh: number;
  public mag_dw: number;
  public def: number;
  public def_dh: number;
  public def_tdh: number;
  public def_dw: number;
  public spr: number;
  public spr_dh: number;
  public spr_tdh: number;
  public spr_dw: number;
  public jump: number;
  public physical_killers: KillerPassives;
  public magical_killers: KillerPassives;
  public partial_dw: boolean;
  public unique: boolean;
  public lb_power: number;
  public evo: number;
  public esper_percent: number;
  public esper: number;
  public esper_damage: number;

  // transcient
  public active = false;

  constructor(conditionalPassive: ConditionalPassive) {
    this.id = conditionalPassive.id;
    this.unit = conditionalPassive.unit;
    this.category = conditionalPassive.category;
    this.element = conditionalPassive.element;
    this.skill = conditionalPassive.skill;
    this.skill_name = conditionalPassive.skill_name;
    this.skill_icon = conditionalPassive.skill_icon;
    this.skill_mod = conditionalPassive.skill_mod;
    this.hp = conditionalPassive.hp ? conditionalPassive.hp : 0;
    this.hp_dh = conditionalPassive.hp_dh ? conditionalPassive.hp_dh : 0;
    this.hp_tdh = conditionalPassive.hp_tdh ? conditionalPassive.hp_tdh : 0;
    this.hp_dw = conditionalPassive.hp_dw ? conditionalPassive.hp_dw : 0;
    this.mp = conditionalPassive.mp ? conditionalPassive.mp : 0;
    this.mp_dh = conditionalPassive.mp_dh ? conditionalPassive.mp_dh : 0;
    this.mp_tdh = conditionalPassive.mp_tdh ? conditionalPassive.mp_tdh : 0;
    this.mp_dw = conditionalPassive.mp_dw ? conditionalPassive.mp_dw : 0;
    this.atk = conditionalPassive.atk ? conditionalPassive.atk : 0;
    this.atk_dh = conditionalPassive.atk_dh ? conditionalPassive.atk_dh : 0;
    this.atk_tdh = conditionalPassive.atk_tdh ? conditionalPassive.atk_tdh : 0;
    this.atk_dw = conditionalPassive.atk_dw ? conditionalPassive.atk_dw : 0;
    this.mag = conditionalPassive.mag ? conditionalPassive.mag : 0;
    this.mag_dh = conditionalPassive.mag_dh ? conditionalPassive.mag_dh : 0;
    this.mag_tdh = conditionalPassive.mag_tdh ? conditionalPassive.mag_tdh : 0;
    this.mag_dw = conditionalPassive.mag_dw ? conditionalPassive.mag_dw : 0;
    this.def = conditionalPassive.def ? conditionalPassive.def : 0;
    this.def_dh = conditionalPassive.def_dh ? conditionalPassive.def_dh : 0;
    this.def_tdh = conditionalPassive.def_tdh ? conditionalPassive.def_tdh : 0;
    this.def_dw = conditionalPassive.def_dw ? conditionalPassive.def_dw : 0;
    this.spr = conditionalPassive.spr ? conditionalPassive.spr : 0;
    this.spr_dh = conditionalPassive.spr_dh ? conditionalPassive.spr_dh : 0;
    this.spr_tdh = conditionalPassive.spr_tdh ? conditionalPassive.spr_tdh : 0;
    this.spr_dw = conditionalPassive.spr_dw ? conditionalPassive.spr_dw : 0;
    this.jump = conditionalPassive.jump ? conditionalPassive.jump : 0;
    if (conditionalPassive.physical_killers) {
      this.physical_killers = KillerPassives.construct(conditionalPassive.physical_killers);
    }
    if (conditionalPassive.magical_killers) {
      this.magical_killers = KillerPassives.construct(conditionalPassive.magical_killers);
    }
    this.partial_dw = conditionalPassive.partial_dw;
    this.unique = conditionalPassive.unique;
    this.lb_power = conditionalPassive.lb_power;
    this.evo = conditionalPassive.evo ? conditionalPassive.evo : 0;
    this.esper_percent = conditionalPassive.esper_percent;
    this.esper = conditionalPassive.esper;
    this.esper_damage = conditionalPassive.esper_damage;
  }

  public getPhysicalKiller(opponentKillerType): number {
    return this.physical_killers && this.physical_killers[opponentKillerType] ? this.physical_killers[opponentKillerType] : 0;
  }

  public getMagicalKiller(opponentKillerType): number {
    return this.magical_killers && this.magical_killers[opponentKillerType] ? this.magical_killers[opponentKillerType] : 0;
  }
}
