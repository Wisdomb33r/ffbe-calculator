export class UnitStat {
  // from backend
  public base: number;
  public passive: number;
  public dh: number;
  public tdh: number;

  // transcient
  public base_equipment = 0;
  public dh_equipment = 0;
  public tdh_equipment = 0;
  public passive_equipment = 0;
  public conditional_passive = 0;

  public dh_effective = 0;
  public tdh_effective = 0;

  public value_from_dh = 0;
  public value_from_dh_equipment = 0;
  public value_from_passive = 0;
  public value_from_passive_equipment = 0;
  public value_from_esper = 0;
  public total = 0;

  constructor(stat: number, stat_passive: number, stat_dh: number, stat_tdh: number) {
    this.base = stat;
    this.passive = stat_passive ? stat_passive : 0;
    this.dh = stat_dh ? stat_dh : 0;
    this.tdh = stat_tdh ? stat_tdh : 0;
  }

  public defineDhActivation(isDoubleHandActive: boolean, isTrueDoubleHandActive: boolean) {
    this.dh_effective = isDoubleHandActive ? this.dh : 0;
    this.tdh_effective = isTrueDoubleHandActive ? this.tdh : 0;
  }

  public computeTotal() {
    const effectiveEquipmentPassive = this.getEffectiveEquipmentPassive();
    const effectiveEquipmentDh = this.getEffectiveEquipmentDh();
    this.value_from_passive = this.base * (this.passive + this.conditional_passive) / 100;
    this.value_from_passive_equipment = this.base * effectiveEquipmentPassive / 100;
    this.value_from_dh = this.base_equipment * (this.dh_effective + this.tdh_effective) / 100;
    this.value_from_dh_equipment = this.base_equipment * effectiveEquipmentDh / 100;
    this.total = Math.floor(this.base + this.value_from_passive + this.value_from_passive_equipment
      + this.value_from_dh + this.value_from_dh_equipment + this.base_equipment)
      + this.value_from_esper;
  }

  private getEffectiveEquipmentPassive(): number {
    if ((this.passive + this.conditional_passive + this.passive_equipment) > 300) {
      return 300 - this.passive - this.conditional_passive;
    } else {
      return this.passive_equipment;
    }
  }

  private getEffectiveEquipmentDh(): number {
    if ((this.dh_effective + this.tdh_effective + this.dh_equipment + this.tdh_equipment) > 300) {
      return 300 - this.dh_effective - this.tdh_effective;
    } else {
      return this.dh_equipment + this.tdh_equipment;
    }
  }
}
