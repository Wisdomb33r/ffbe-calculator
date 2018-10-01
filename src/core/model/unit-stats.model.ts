import {ConditionalPassive} from './conditional-passive.model';
import {UnitStat} from './unit-stat.model';
import {Esper} from './esper.model';

export class UnitStats {
  public hp: UnitStat;
  public mp: UnitStat;
  public atk: UnitStat;
  public mag: UnitStat;
  public def: UnitStat;
  public spr: UnitStat;
  public evo: UnitStat;
  public esper_percent: number;

  // transcient
  public equipment_esper_percent: number;

  constructor(stats: any) {
    this.hp = new UnitStat(stats.hp, stats.hp_passive, stats.hp_dh, stats.hp_tdh, stats.hp_dw);
    this.mp = new UnitStat(stats.mp, stats.mp_passive, stats.mp_dh, stats.mp_tdh, stats.mp_dw);
    this.atk = new UnitStat(stats.atk, stats.atk_passive, stats.atk_dh, stats.atk_tdh, stats.atk_dw);
    this.mag = new UnitStat(stats.mag, stats.mag_passive, stats.mag_dh, stats.mag_tdh, stats.mag_dw);
    this.def = new UnitStat(stats.def, stats.def_passive, stats.def_dh, stats.def_tdh, stats.def_dw);
    this.spr = new UnitStat(stats.spr, stats.spr_passive, stats.spr_dh, stats.spr_tdh, stats.spr_dw);
    this.evo = new UnitStat(stats.evo, 0, 0, 0, 0);
    this.esper_percent = stats.esper_percent;
  }

  public defineEquipmentsStats(hp: number, mp: number, atk: number, mag: number, def: number, spr: number, evo: number) {
    this.hp.base_equipment = hp;
    this.mp.base_equipment = mp;
    this.atk.base_equipment = atk;
    this.mag.base_equipment = mag;
    this.def.base_equipment = def;
    this.spr.base_equipment = spr;
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

  public defineEquipmentDwBonuses(hp_dw: number, mp_dw: number, atk_dw: number, mag_dw: number, def_dw: number, spr_dw: number,
                                  passives: Array<ConditionalPassive>) {
    this.hp.dw_equipment = hp_dw + passives.map(passive => passive.hp_dw).reduce((val1, val2) => val1 + val2, 0);
    this.mp.dw_equipment = mp_dw + passives.map(passive => passive.mp_dw).reduce((val1, val2) => val1 + val2, 0);
    this.atk.dw_equipment = atk_dw + passives.map(passive => passive.atk_dw).reduce((val1, val2) => val1 + val2, 0);
    this.mag.dw_equipment = mag_dw + passives.map(passive => passive.mag_dw).reduce((val1, val2) => val1 + val2, 0);
    this.def.dw_equipment = def_dw + passives.map(passive => passive.def_dw).reduce((val1, val2) => val1 + val2, 0);
    this.spr.dw_equipment = spr_dw + passives.map(passive => passive.spr_dw).reduce((val1, val2) => val1 + val2, 0);
  }

  public defineEquipmentDhBonuses(hp_dh: number, mp_dh: number, atk_dh: number, mag_dh: number, def_dh: number, spr_dh: number,
                                  passives: Array<ConditionalPassive>) {
    this.hp.dh_equipment = hp_dh + passives.map(passive => passive.hp_dh).reduce((val1, val2) => val1 + val2, 0);
    this.mp.dh_equipment = mp_dh + passives.map(passive => passive.mp_dh).reduce((val1, val2) => val1 + val2, 0);
    this.atk.dh_equipment = atk_dh + passives.map(passive => passive.atk_dh).reduce((val1, val2) => val1 + val2, 0);
    this.mag.dh_equipment = mag_dh + passives.map(passive => passive.mag_dh).reduce((val1, val2) => val1 + val2, 0);
    this.def.dh_equipment = def_dh + passives.map(passive => passive.def_dh).reduce((val1, val2) => val1 + val2, 0);
    this.spr.dh_equipment = spr_dh + passives.map(passive => passive.spr_dh).reduce((val1, val2) => val1 + val2, 0);
  }

  public defineEquipmentTdhBonuses(hp_tdh: number, mp_tdh: number, atk_tdh: number, mag_tdh: number, def_tdh: number, spr_tdh: number,
                                   passives: Array<ConditionalPassive>) {
    this.hp.tdh_equipment = hp_tdh + passives.map(passive => passive.hp_tdh).reduce((val1, val2) => val1 + val2, 0);
    this.mp.tdh_equipment = mp_tdh + passives.map(passive => passive.mp_tdh).reduce((val1, val2) => val1 + val2, 0);
    this.atk.tdh_equipment = atk_tdh + passives.map(passive => passive.atk_tdh).reduce((val1, val2) => val1 + val2, 0);
    this.mag.tdh_equipment = mag_tdh + passives.map(passive => passive.mag_tdh).reduce((val1, val2) => val1 + val2, 0);
    this.def.tdh_equipment = def_tdh + passives.map(passive => passive.def_tdh).reduce((val1, val2) => val1 + val2, 0);
    this.spr.tdh_equipment = spr_tdh + passives.map(passive => passive.spr_tdh).reduce((val1, val2) => val1 + val2, 0);
  }

  public defineEquipmentEsperPercent(esper_percent: number, passives: Array<ConditionalPassive>) {
    this.equipment_esper_percent = esper_percent + passives.map(passive => passive.esper_percent).reduce((val1, val2) => val1 + val2, 0);
  }

  public defineEsperStats(esper: Esper) {
    const total_esper_percent = this.esper_percent + this.equipment_esper_percent;
    this.hp.value_from_esper = esper.calculateStatIncrease('hp', total_esper_percent);
    this.hp.passive_esper = esper.hp_percent ? esper.hp_percent : 0;
    this.mp.value_from_esper = esper.calculateStatIncrease('mp', total_esper_percent);
    this.mp.passive_esper = esper.mp_percent ? esper.mp_percent : 0;
    this.atk.value_from_esper = esper.calculateStatIncrease('atk', total_esper_percent);
    this.atk.passive_esper = esper.atk_percent ? esper.atk_percent : 0;
    this.mag.value_from_esper = esper.calculateStatIncrease('mag', total_esper_percent);
    this.mag.passive_esper = esper.mag_percent ? esper.mag_percent : 0;
    this.def.value_from_esper = esper.calculateStatIncrease('def', total_esper_percent);
    this.def.passive_esper = esper.def_percent ? esper.def_percent : 0;
    this.spr.value_from_esper = esper.calculateStatIncrease('spr', total_esper_percent);
    this.spr.passive_esper = esper.spr_percent ? esper.spr_percent : 0;
  }

  public computeTotals(isDoubleHandActive: boolean, isTrueDoubleHandActive: boolean, isDualWielding: boolean) {
    this.hp.computeTotal(isDoubleHandActive, isTrueDoubleHandActive, isDualWielding);
    this.mp.computeTotal(isDoubleHandActive, isTrueDoubleHandActive, isDualWielding);
    this.atk.computeTotal(isDoubleHandActive, isTrueDoubleHandActive, isDualWielding);
    this.mag.computeTotal(isDoubleHandActive, isTrueDoubleHandActive, isDualWielding);
    this.def.computeTotal(isDoubleHandActive, isTrueDoubleHandActive, isDualWielding);
    this.spr.computeTotal(isDoubleHandActive, isTrueDoubleHandActive, isDualWielding);
    this.evo.computeTotal(isDoubleHandActive, isTrueDoubleHandActive, isDualWielding);
  }
}
