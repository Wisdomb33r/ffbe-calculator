import {ConditionalPassive} from './conditional-passive.model';
import {UnitStat} from './unit-stat.model';

export class UnitStats {
  public hp: UnitStat;
  public mp: UnitStat;
  public atk: UnitStat;
  public mag: UnitStat;
  public def: UnitStat;
  public spr: UnitStat;

  constructor(stats: any) {
    this.hp = new UnitStat(stats.hp, stats.hp_passive, stats.hp_dh, stats.hp_tdh);
    this.mp = new UnitStat(stats.mp, stats.mp_passive, stats.mp_dh, stats.mp_tdh);
    this.atk = new UnitStat(stats.atk, stats.atk_passive, stats.atk_dh, stats.atk_tdh);
    this.mag = new UnitStat(stats.mag, stats.mag_passive, stats.mag_dh, stats.mag_tdh);
    this.def = new UnitStat(stats.def, stats.def_passive, stats.def_dh, stats.def_tdh);
    this.spr = new UnitStat(stats.spr, stats.spr_passive, stats.spr_dh, stats.spr_tdh);
    // TODO remove these hardcoded values when builder let esper choice
    this.defineEsperStats(64, 63, 64, 64, 60, 60); // assuming bahamut
  }

  public defineEquipmentsStats(hp: number, mp: number, atk: number, mag: number, def: number, spr: number,
                               atk_dh, atk_tdh, mag_dh, mag_tdh) {
    this.hp.stat_equipment = hp;
    this.mp.stat_equipment = mp;
    this.atk.stat_equipment = atk;
    this.mag.stat_equipment = mag;
    this.def.stat_equipment = def;
    this.spr.stat_equipment = spr;
    this.atk.stat_dh_equipment = atk_dh;
    this.atk.stat_tdh_equipment = atk_tdh;
    this.mag.stat_dh_equipment = mag_dh;
    this.mag.stat_tdh_equipment = mag_tdh;
  }

  public defineConditionalPassives(passives: Array<ConditionalPassive>) {
    this.hp.stat_cond_passive = passives.map(passive => passive.hp).reduce((val1, val2) => val1 + val2, 0);
    this.mp.stat_cond_passive = passives.map(passive => passive.mp).reduce((val1, val2) => val1 + val2, 0);
    this.atk.stat_cond_passive = passives.map(passive => passive.atk).reduce((val1, val2) => val1 + val2, 0);
    this.mag.stat_cond_passive = passives.map(passive => passive.mag).reduce((val1, val2) => val1 + val2, 0);
    this.def.stat_cond_passive = passives.map(passive => passive.def).reduce((val1, val2) => val1 + val2, 0);
    this.spr.stat_cond_passive = passives.map(passive => passive.spr).reduce((val1, val2) => val1 + val2, 0);
  }

  public defineEquipmentPassives(hp: number, mp: number, atk: number, mag: number, def: number, spr: number,
                                 passives: Array<ConditionalPassive>) {
    this.hp.stat_passive_equipment = hp + passives.map(passive => passive.hp).reduce((val1, val2) => val1 + val2, 0);
    this.mp.stat_passive_equipment = mp + passives.map(passive => passive.mp).reduce((val1, val2) => val1 + val2, 0);
    this.atk.stat_passive_equipment = atk + passives.map(passive => passive.atk).reduce((val1, val2) => val1 + val2, 0);
    this.mag.stat_passive_equipment = mag + passives.map(passive => passive.mag).reduce((val1, val2) => val1 + val2, 0);
    this.def.stat_passive_equipment = def + passives.map(passive => passive.def).reduce((val1, val2) => val1 + val2, 0);
    this.spr.stat_passive_equipment = spr + passives.map(passive => passive.spr).reduce((val1, val2) => val1 + val2, 0);
  }

  public defineEsperStats(hp: number, mp: number, atk: number, mag: number, def: number, spr: number) {
    this.hp.stat_from_esper = hp;
    this.mp.stat_from_esper = mp;
    this.atk.stat_from_esper = atk;
    this.mag.stat_from_esper = mag;
    this.def.stat_from_esper = def;
    this.spr.stat_from_esper = spr;
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
