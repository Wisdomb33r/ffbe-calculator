export class UnitStats {
  // from backend
  public hp: number;
  public hp_passive: number;
  public mp: number;
  public mp_passive: number;
  public atk: number;
  public atk_passive: number;
  public mag: number;
  public mag_passive: number;
  public def: number;
  public def_passive: number;
  public spr: number;
  public spr_passive: number;
  public atk_dh: number;
  public mag_dh: number;
  public atk_tdh: number;
  public mag_tdh: number;

  // transcient
  public hp_equipment;
  public mp_equipment;
  public atk_equipment;
  public mag_equipment;
  public def_equipment;
  public spr_equipment;
  public hp_total;
  public mp_total;
  public atk_total;
  public mag_total;
  public def_total;
  public spr_total;

  constructor(stats: UnitStats) {
    this.hp = stats.hp;
    this.hp_passive = stats.hp_passive;
    this.mp = stats.mp;
    this.mp_passive = stats.mp_passive;
    this.atk = stats.atk;
    this.atk_passive = stats.atk_passive;
    this.mag = stats.mag;
    this.mag_passive = stats.mag_passive;
    this.def = stats.def;
    this.def_passive = stats.def_passive;
    this.spr = stats.spr;
    this.spr_passive = stats.spr_passive;
    this.atk_dh = stats.atk_dh;
    this.mag_dh = stats.mag_dh;
    this.atk_tdh = stats.atk_tdh;
    this.mag_tdh = stats.mag_tdh;
  }

  public defineEquipmentsStats(hp: number, mp: number, atk: number, mag: number, def: number, spr: number) {
    this.hp_equipment = hp;
    this.mp_equipment = mp;
    this.atk_equipment = atk;
    this.mag_equipment = mag;
    this.def_equipment = def;
    this.spr_equipment = spr;
  }

  public computeTotals() {
    this.hp_total = this.hp + this.hp_equipment;
    this.mp_total = this.mp + this.mp_equipment;
    this.atk_total = this.atk + this.atk_equipment;
    this.mag_total = this.mag + this.mag_equipment;
    this.def_total = this.def + this.def_equipment;
    this.spr_total = this.spr + this.spr_equipment;
  }
}
