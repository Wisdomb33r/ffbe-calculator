export class UnitStat {
  // from backend
  public stat: number;
  public stat_passive: number;
  public stat_dh: number;
  public stat_tdh: number;

  // transcient
  public stat_equipment = 0;
  public stat_dh_equipment = 0;
  public stat_tdh_equipment = 0;
  public stat_passive_equipment = 0;
  public stat_cond_passive = 0;

  public stat_dh_effective = 0;
  public stat_tdh_effective = 0;

  public stat_from_dh = 0;
  public stat_from_dh_equipment = 0;
  public stat_from_passive = 0;
  public stat_from_passive_equipment = 0;
  public stat_from_esper = 0;
  public stat_total = 0;

  constructor(stat: number, stat_passive: number, stat_dh: number, stat_tdh: number) {
    this.stat = stat;
    this.stat_passive = stat_passive ? stat_passive : 0;
    this.stat_dh = stat_dh ? stat_dh : 0;
    this.stat_tdh = stat_tdh ? stat_tdh : 0;
  }

  public defineDhActivation(isDoubleHandActive: boolean, isTrueDoubleHandActive: boolean) {
    this.stat_dh_effective = isDoubleHandActive ? this.stat_dh : 0;
    this.stat_tdh_effective = isTrueDoubleHandActive ? this.stat_tdh : 0;
  }

  public computeTotal() {
    const effectiveEquipmentPassive = this.getEffectiveEquipmentPassive();
    const effectiveEquipmentDh = this.getEffectiveEquipmentDh();
    this.stat_from_passive = this.stat * (this.stat_passive + this.stat_cond_passive) / 100;
    this.stat_from_passive_equipment = this.stat * effectiveEquipmentPassive / 100;
    this.stat_from_dh = this.stat_equipment * (this.stat_dh_effective / 100 + this.stat_tdh_effective / 100);
    this.stat_from_dh_equipment = this.stat_equipment * effectiveEquipmentDh / 100;
    this.stat_total = Math.floor(this.stat + this.stat_from_passive + this.stat_from_passive_equipment
      + this.stat_from_dh + this.stat_from_dh_equipment + this.stat_equipment)
      + this.stat_from_esper;
  }

  private getEffectiveEquipmentPassive(): number {
    if ((this.stat_passive + this.stat_cond_passive + this.stat_passive_equipment) > 300) {
      return 300 - this.stat_passive - this.stat_cond_passive;
    } else {
      return this.stat_passive_equipment;
    }
  }

  private getEffectiveEquipmentDh(): number {
    if ((this.stat_dh_effective + this.stat_tdh_effective + this.stat_dh_equipment + this.stat_tdh_equipment) > 300) {
      return 300 - this.stat_dh_effective - this.stat_tdh_effective;
    } else {
      return this.stat_dh_equipment + this.stat_tdh_equipment;
    }
  }
}
