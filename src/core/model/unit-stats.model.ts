import {ConditionalPassive} from './conditional-passive.model';

export class UnitStats {
  // from backend
  public hp: number;
  public hp_passive: number;
  public hp_dh: number;
  public hp_tdh: number;
  public mp: number;
  public mp_passive: number;
  public mp_dh: number;
  public mp_tdh: number;
  public atk: number;
  public atk_passive: number;
  public atk_dh: number;
  public atk_tdh: number;
  public mag: number;
  public mag_passive: number;
  public mag_dh: number;
  public mag_tdh: number;
  public def: number;
  public def_passive: number;
  public def_dh: number;
  public def_tdh: number;
  public spr: number;
  public spr_passive: number;
  public spr_dh: number;
  public spr_tdh: number;

  // transcient
  public hp_equipment: number;
  public mp_equipment: number;
  public atk_equipment: number;
  public mag_equipment: number;
  public def_equipment: number;
  public spr_equipment: number;
  public hp_dh_equipment = 0;
  public hp_tdh_equipment = 0;
  public mp_dh_equipment = 0;
  public mp_tdh_equipment = 0;
  public atk_dh_equipment: number;
  public atk_tdh_equipment: number;
  public mag_dh_equipment: number;
  public mag_tdh_equipment: number;
  public def_dh_equipment = 0;
  public def_tdh_equipment = 0;
  public spr_dh_equipment = 0;
  public spr_tdh_equipment = 0;
  public hp_equipment_passive: number;
  public mp_equipment_passive: number;
  public atk_equipment_passive: number;
  public mag_equipment_passive: number;
  public def_equipment_passive: number;
  public spr_equipment_passive: number;
  public hp_cond_passive: number;
  public mp_cond_passive: number;
  public atk_cond_passive: number;
  public mag_cond_passive: number;
  public def_cond_passive: number;
  public spr_cond_passive: number;
  public hp_from_dh: number;
  public mp_from_dh: number;
  public atk_from_dh: number;
  public mag_from_dh: number;
  public def_from_dh: number;
  public spr_from_dh: number;
  public hp_from_dh_equipment: number;
  public mp_from_dh_equipment: number;
  public atk_from_dh_equipment: number;
  public mag_from_dh_equipment: number;
  public def_from_dh_equipment: number;
  public spr_from_dh_equipment: number;
  public hp_from_passive: number;
  public mp_from_passive: number;
  public atk_from_passive: number;
  public mag_from_passive: number;
  public def_from_passive: number;
  public spr_from_passive: number;
  public hp_from_equipment_passive: number;
  public mp_from_equipment_passive: number;
  public atk_from_equipment_passive: number;
  public mag_from_equipment_passive: number;
  public def_from_equipment_passive: number;
  public spr_from_equipment_passive: number;
  public hp_total: number;
  public mp_total: number;
  public atk_total: number;
  public mag_total: number;
  public def_total: number;
  public spr_total: number;
  public activeConditionalPassives: Array<ConditionalPassive> = [];

  constructor(stats: UnitStats) {
    this.hp = stats.hp;
    this.hp_passive = stats.hp_passive ? stats.hp_passive : 0;
    this.hp_dh = stats.hp_dh ? stats.hp_dh : 0;
    this.hp_tdh = stats.hp_tdh ? stats.hp_tdh : 0;
    this.mp = stats.mp;
    this.mp_passive = stats.mp_passive ? stats.mp_passive : 0;
    this.mp_dh = stats.mp_dh ? stats.mp_dh : 0;
    this.mp_tdh = stats.mp_tdh ? stats.mp_tdh : 0;
    this.atk = stats.atk;
    this.atk_passive = stats.atk_passive ? stats.atk_passive : 0;
    this.atk_dh = stats.atk_dh ? stats.atk_dh : 0;
    this.atk_tdh = stats.atk_tdh ? stats.atk_tdh : 0;
    this.mag = stats.mag;
    this.mag_passive = stats.mag_passive ? stats.mag_passive : 0;
    this.mag_dh = stats.mag_dh ? stats.mag_dh : 0;
    this.mag_tdh = stats.mag_tdh ? stats.mag_tdh : 0;
    this.def = stats.def;
    this.def_passive = stats.def_passive ? stats.def_passive : 0;
    this.def_dh = stats.def_dh ? stats.def_dh : 0;
    this.def_tdh = stats.def_tdh ? stats.def_tdh : 0;
    this.spr = stats.spr;
    this.spr_passive = stats.spr_passive ? stats.spr_passive : 0;
    this.spr_dh = stats.spr_dh ? stats.spr_dh : 0;
    this.spr_tdh = stats.spr_tdh ? stats.spr_tdh : 0;
  }

  public defineEquipmentsStats(hp: number, mp: number, atk: number, mag: number, def: number, spr: number,
                               atk_dh, atk_tdh, mag_dh, mag_tdh) {
    this.hp_equipment = hp;
    this.mp_equipment = mp;
    this.atk_equipment = atk;
    this.mag_equipment = mag;
    this.def_equipment = def;
    this.spr_equipment = spr;
    this.atk_dh_equipment = atk_dh;
    this.atk_tdh_equipment = atk_tdh;
    this.mag_dh_equipment = mag_dh;
    this.mag_tdh_equipment = mag_tdh;
  }

  public defineConditionalPassives(passives: Array<ConditionalPassive>) {
    this.hp_cond_passive = passives.map(passive => passive.hp).reduce((val1, val2) => val1 + val2, 0);
    this.mp_cond_passive = passives.map(passive => passive.mp).reduce((val1, val2) => val1 + val2, 0);
    this.atk_cond_passive = passives.map(passive => passive.atk).reduce((val1, val2) => val1 + val2, 0);
    this.mag_cond_passive = passives.map(passive => passive.mag).reduce((val1, val2) => val1 + val2, 0);
    this.def_cond_passive = passives.map(passive => passive.def).reduce((val1, val2) => val1 + val2, 0);
    this.spr_cond_passive = passives.map(passive => passive.spr).reduce((val1, val2) => val1 + val2, 0);
  }

  public defineEquipmentPassives(hp: number, mp: number, atk: number, mag: number, def: number, spr: number,
                                 passives: Array<ConditionalPassive>) {
    this.hp_equipment_passive = hp + passives.map(passive => passive.hp).reduce((val1, val2) => val1 + val2, 0);
    this.mp_equipment_passive = mp + passives.map(passive => passive.mp).reduce((val1, val2) => val1 + val2, 0);
    this.atk_equipment_passive = atk + passives.map(passive => passive.atk).reduce((val1, val2) => val1 + val2, 0);
    this.mag_equipment_passive = mag + passives.map(passive => passive.mag).reduce((val1, val2) => val1 + val2, 0);
    this.def_equipment_passive = def + passives.map(passive => passive.def).reduce((val1, val2) => val1 + val2, 0);
    this.spr_equipment_passive = spr + passives.map(passive => passive.spr).reduce((val1, val2) => val1 + val2, 0);
  }

  public computeTotals(nbOfWeapons: number, oneHanded: boolean) {
    this.computeTotalsForStat('hp', nbOfWeapons, oneHanded);
    this.computeTotalsForStat('mp', nbOfWeapons, oneHanded);
    this.computeTotalsForStat('atk', nbOfWeapons, oneHanded);
    this.computeTotalsForStat('mag', nbOfWeapons, oneHanded);
    this.computeTotalsForStat('def', nbOfWeapons, oneHanded);
    this.computeTotalsForStat('spr', nbOfWeapons, oneHanded);
  }

  private computeTotalsForStat(statName: string, nbOfWeapons: number, oneHanded: boolean) {
    this[statName + '_from_passive'] = this[statName] * (this[statName + '_passive'] + this[statName + '_cond_passive']) / 100;
    this[statName + '_from_equipment_passive'] = this[statName] * this[statName + '_equipment_passive'] / 100;
    this[statName + '_from_dh'] = this[statName + '_equipment'] *
      ((nbOfWeapons === 1 && oneHanded ? this[statName + '_dh'] / 100 : 0) + (nbOfWeapons === 1 ? this[statName + '_tdh'] / 100 : 0));
    this[statName + '_from_dh_equipment'] = this[statName + '_equipment'] *
      (
        (nbOfWeapons === 1 && oneHanded ? this[statName + '_dh_equipment'] / 100 : 0)
        +
        (nbOfWeapons === 1 ? this[statName + '_tdh_equipment'] / 100 : 0)
      );
    this[statName + '_total'] = Math.floor(this[statName]
      + this[statName + '_from_passive']
      + this[statName + '_from_equipment_passive']
      + this[statName + '_from_dh']
      + this[statName + '_from_dh_equipment']
      + this[statName + '_equipment']);
  }
}
