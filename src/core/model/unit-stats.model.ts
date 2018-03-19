export class UnitStats {
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
  }
}
