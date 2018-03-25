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
  public hp_equipment;
  public mp_equipment;
  public atk_equipment;
  public mag_equipment;
  public def_equipment;
  public spr_equipment;
  public hp_from_dh;
  public mp_from_dh;
  public atk_from_dh;
  public mag_from_dh;
  public def_from_dh;
  public spr_from_dh;
  public hp_from_passive;
  public mp_from_passive;
  public atk_from_passive;
  public mag_from_passive;
  public def_from_passive;
  public spr_from_passive;
  public hp_total;
  public mp_total;
  public atk_total;
  public mag_total;
  public def_total;
  public spr_total;

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

  public defineEquipmentsStats(hp: number, mp: number, atk: number, mag: number, def: number, spr: number) {
    this.hp_equipment = hp;
    this.mp_equipment = mp;
    this.atk_equipment = atk;
    this.mag_equipment = mag;
    this.def_equipment = def;
    this.spr_equipment = spr;
  }

  public computeTotals(nbOfWeapons: number, oneHanded: boolean) {
    this.hp_from_passive = this.hp * this.hp_passive / 100;
    this.hp_from_dh = this.hp_equipment *
      ((nbOfWeapons === 1 && oneHanded ? this.hp_dh / 100 : 0) + (nbOfWeapons === 1 ? this.hp_tdh / 100 : 0));
    this.hp_total = Math.floor(this.hp + this.hp_from_passive + this.hp_from_dh + this.hp_equipment);

    this.mp_from_passive = this.mp * this.mp_passive / 100;
    this.mp_from_dh = this.mp_equipment *
      ((nbOfWeapons === 1 && oneHanded ? this.mp_dh / 100 : 0) + (nbOfWeapons === 1 ? this.mp_tdh / 100 : 0));
    this.mp_total = Math.floor(this.mp + this.mp_from_passive + this.mp_from_dh + this.mp_equipment);

    this.atk_from_passive = this.atk * this.atk_passive / 100;
    this.atk_from_dh = this.atk_equipment *
      ((nbOfWeapons === 1 && oneHanded ? this.atk_dh / 100 : 0) + (nbOfWeapons === 1 ? this.atk_tdh / 100 : 0));
    this.atk_total = Math.floor(this.atk + this.atk_from_passive + this.atk_from_dh + this.atk_equipment);

    this.mag_from_passive = this.mag * this.mag_passive / 100;
    this.mag_from_dh = this.mag_equipment *
      (nbOfWeapons === 1 && oneHanded ? this.mag_dh / 100 : 0) + (nbOfWeapons === 1 ? this.mag_tdh / 100 : 0);
    this.mag_total = Math.floor(this.mag + this.mag_from_passive + this.mag_from_dh + this.mag_equipment);

    this.def_from_passive = this.def * this.def_passive / 100;
    this.def_from_dh = this.def_equipment *
      ((nbOfWeapons === 1 && oneHanded ? this.def_dh / 100 : 0) + (nbOfWeapons === 1 ? this.def_tdh / 100 : 0));
    this.def_total = Math.floor(this.def + this.def_from_passive + this.def_from_dh + this.def_equipment);

    this.spr_from_passive = this.spr * this.spr_passive / 100;
    this.spr_from_dh = this.spr_equipment *
      ((nbOfWeapons === 1 && oneHanded ? this.spr_dh / 100 : 0) + (nbOfWeapons === 1 ? this.spr_tdh / 100 : 0));
    this.spr_total = Math.floor(this.spr + this.spr_from_passive + this.spr_from_dh + this.spr_equipment);
  }
}
