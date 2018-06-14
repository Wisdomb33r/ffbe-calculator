import {ConditionalPassive} from './conditional-passive.model';
import {UnitStat} from './unit-stat.model';

export class UnitStats {
  public hp: UnitStat;
  public mp: UnitStat;
  public atk: UnitStat;
  public mag: UnitStat;
  public def: UnitStat;
  public spr: UnitStat;
  public evo: UnitStat;

  constructor(stats: any) {
    this.hp = new UnitStat(stats.hp, stats.hp_passive, stats.hp_dh, stats.hp_tdh);
    this.mp = new UnitStat(stats.mp, stats.mp_passive, stats.mp_dh, stats.mp_tdh);
    this.atk = new UnitStat(stats.atk, stats.atk_passive, stats.atk_dh, stats.atk_tdh);
    this.mag = new UnitStat(stats.mag, stats.mag_passive, stats.mag_dh, stats.mag_tdh);
    this.def = new UnitStat(stats.def, stats.def_passive, stats.def_dh, stats.def_tdh);
    this.spr = new UnitStat(stats.spr, stats.spr_passive, stats.spr_dh, stats.spr_tdh);
    this.evo = new UnitStat(stats.evo, undefined, undefined, undefined);
  }

  public defineEquipmentsStats(hp: number, mp: number, atk: number, mag: number, def: number, spr: number,
                               atk_dh, atk_tdh, mag_dh, mag_tdh, evo) {
    this.hp.base_equipment = hp;
    this.mp.base_equipment = mp;
    this.atk.base_equipment = atk;
    this.mag.base_equipment = mag;
    this.def.base_equipment = def;
    this.spr.base_equipment = spr;
    this.atk.dh_equipment = atk_dh;
    this.atk.tdh_equipment = atk_tdh;
    this.mag.dh_equipment = mag_dh;
    this.mag.tdh_equipment = mag_tdh;
    this.evo.base_equipment = evo;
  }

  public defineConditionalPassives(passives: Array<ConditionalPassive>) {
    this.hp.conditional_passive = passives.map(passive => passive.hp).reduce((val1, val2) => val1 + val2, 0);
    this.mp.conditional_passive = passives.map(passive => passive.mp).reduce((val1, val2) => val1 + val2, 0);
    this.atk.conditional_passive = passives.map(passive => passive.atk).reduce((val1, val2) => val1 + val2, 0);
    this.mag.conditional_passive = passives.map(passive => passive.mag).reduce((val1, val2) => val1 + val2, 0);
    this.def.conditional_passive = passives.map(passive => passive.def).reduce((val1, val2) => val1 + val2, 0);
    this.spr.conditional_passive = passives.map(passive => passive.spr).reduce((val1, val2) => val1 + val2, 0);
  }

  public defineEquipmentPassives(hp: number, mp: number, atk: number, mag: number, def: number, spr: number,
                                 passives: Array<ConditionalPassive>) {
    this.hp.passive_equipment = hp + passives.map(passive => passive.hp).reduce((val1, val2) => val1 + val2, 0);
    this.mp.passive_equipment = mp + passives.map(passive => passive.mp).reduce((val1, val2) => val1 + val2, 0);
    this.atk.passive_equipment = atk + passives.map(passive => passive.atk).reduce((val1, val2) => val1 + val2, 0);
    this.mag.passive_equipment = mag + passives.map(passive => passive.mag).reduce((val1, val2) => val1 + val2, 0);
    this.def.passive_equipment = def + passives.map(passive => passive.def).reduce((val1, val2) => val1 + val2, 0);
    this.spr.passive_equipment = spr + passives.map(passive => passive.spr).reduce((val1, val2) => val1 + val2, 0);
  }

  public defineEsperStats(hp: number, mp: number, atk: number, mag: number, def: number, spr: number) {
    this.hp.value_from_esper = hp;
    this.mp.value_from_esper = mp;
    this.atk.value_from_esper = atk;
    this.mag.value_from_esper = mag;
    this.def.value_from_esper = def;
    this.spr.value_from_esper = spr;
  }

  public defineDhActivation(isDoubleHandActive: boolean, isTrueDoubleHandActive: boolean) {
    this.hp.defineDhActivation(isDoubleHandActive, isTrueDoubleHandActive);
    this.mp.defineDhActivation(isDoubleHandActive, isTrueDoubleHandActive);
    this.atk.defineDhActivation(isDoubleHandActive, isTrueDoubleHandActive);
    this.mag.defineDhActivation(isDoubleHandActive, isTrueDoubleHandActive);
    this.def.defineDhActivation(isDoubleHandActive, isTrueDoubleHandActive);
    this.spr.defineDhActivation(isDoubleHandActive, isTrueDoubleHandActive);
  }

  public computeTotals() {
    this.hp.computeTotal();
    this.mp.computeTotal();
    this.atk.computeTotal();
    this.mag.computeTotal();
    this.def.computeTotal();
    this.spr.computeTotal();
  }
}
