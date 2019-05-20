import {UnitStats} from './unit-stats.model';
import {Build} from './build.model';
import {ConditionalPassive} from './conditional-passive.model';
import {isNullOrUndefined} from 'util';
import {Equipment} from './equipment.model';

export class Unit {
  // from backend
  public id: number;
  public name: string;
  public rank: number;
  public icon: string;
  public sex: number;
  public stats: UnitStats;
  public conditional_passives: Array<ConditionalPassive> = [];
  public builds: Array<Build> = [];

  // transcient
  public selectedBuild: Build;
  public rankingResult: number;

  constructor(unit: Unit) {
    this.id = unit.id;
    this.name = unit.name;
    this.rank = unit.rank;
    this.icon = unit.icon;
    this.sex = unit.sex;
    this.stats = new UnitStats(unit.stats);
    unit.builds.forEach(build => this.builds.push(new Build(build)));
    if (Array.isArray(unit.conditional_passives)) {
      unit.conditional_passives.forEach(conditional_passive => this.conditional_passives.push(new ConditionalPassive(conditional_passive)));
    }
  }

  public selectDefaultBuild() {
    if (this.builds && Array.isArray(this.builds) && this.builds.length > 0) {
      this.selectedBuild = this.builds[0];
    }
  }

  public selectBuild(id: number) {
    if (this.builds && id) {
      const build: Build = this.builds.find(b => b.id === id);
      if (build) {
        this.selectedBuild = build;
      }
    }
  }

  public isWithNativeDw() {
    return this.stats.dual_wield
      || (this.id === 8044 && this.selectedBuild.equipments.right_hand && this.selectedBuild.equipments.right_hand.id === 1202) // Fryevia
      || (this.id === 8053 && this.selectedBuild.equipments.right_hand && this.selectedBuild.equipments.right_hand.id === 1305) // Reberta
      || (this.id === 1275 && this.selectedBuild.equipments.materia1 && this.selectedBuild.equipments.materia1.id === 3215) // Beowulf
      || (this.id === 1275 && this.selectedBuild.equipments.materia2 && this.selectedBuild.equipments.materia2.id === 3215) // Beowulf
      || (this.id === 1275 && this.selectedBuild.equipments.materia3 && this.selectedBuild.equipments.materia3.id === 3215) // Beowulf
      || (this.id === 1275 && this.selectedBuild.equipments.materia4 && this.selectedBuild.equipments.materia4.id === 3215) // Beowulf
      ;
  }

  public isWithPartialDwForCategory(category: number): boolean {
    return this.isPartialDwNativeForCategory(category) || this.selectedBuild.equipments.isPartialDwEquippedForCategory(category);
  }

  private isPartialDwNativeForCategory(category: number): boolean {
    return !isNullOrUndefined(
      this.conditional_passives.find(condPassive => condPassive.category === category && condPassive.partial_dw)
    );
  }

  public computeAll() {
    if (this.selectedBuild) {
      this.computeRealStats();
      this.calculateResults();
    }
  }

  public calculateResults() {
    this.selectedBuild.calculate(this);
  }

  public getPhysicalKillers(): number {
    let killer = this.selectedBuild.getPhysicalKillers(this.id);
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.physical_killers ? passive.physical_killers.getKillerSum() : 0)
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public getPhysicalKiller(opponentKillerType: string): number {
    let killer = this.selectedBuild.getPhysicalKiller(opponentKillerType, this.id);
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.getPhysicalKiller(opponentKillerType))
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public getMagicalKillers(): number {
    let killer = this.selectedBuild.getMagicalKillers(this.id);
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.magical_killers ? passive.magical_killers.getKillerSum() : 0)
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public getMagicalKiller(opponentKillerType: string): number {
    let killer = this.selectedBuild.getMagicalKiller(opponentKillerType, this.id);
    killer += this.filterUnitActiveConditionalPassives()
      .map((passive: ConditionalPassive) => passive.getMagicalKiller(opponentKillerType))
      .reduce((val1, val2) => val1 + val2, 0);
    return killer;
  }

  public getLbMultiplier() {
    return this.selectedBuild.equipments.sumEquipmentLbBoost(this.id)
      + (this.stats.lb_multiplier ? this.stats.lb_multiplier - 1 : 0);
  }

  public getLbPowerIncrease() {
    return this.selectedBuild.equipments.sumEquipmentLbMod(this.id);
  }

  public getEsperDamageModifier() {
    return this.selectedBuild.getEsperDamageModifier();
  }

  public emptySlot(slot: string) {
    this.selectedBuild.emptySlot(slot);
  }

  public equipInSlot(slot: string, equipment: Equipment) {
    this.selectedBuild.equipInSlot(slot, equipment);
  }

  public computeRealStats() {
    this.stats.defineEquipmentsStats(
      this.selectedBuild.equipments.sumEquipmentStat('hp'),
      this.selectedBuild.equipments.sumEquipmentStat('mp'),
      this.selectedBuild.equipments.sumEquipmentStat('atk'),
      this.selectedBuild.equipments.sumEquipmentStat('mag'),
      this.selectedBuild.equipments.sumEquipmentStat('def'),
      this.selectedBuild.equipments.sumEquipmentStat('spr'),
      this.selectedBuild.equipments.sumEquipmentStat('evo')
    );
    const equipmentActiveConditionalPassives = this.selectedBuild.equipments.getAllActiveConditionalPassives(this.id);
    this.stats.defineEquipmentPassives(
      this.selectedBuild.equipments.sumEquipmentStatPercent('hp'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('mp'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('atk'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('mag'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('def'),
      this.selectedBuild.equipments.sumEquipmentStatPercent('spr'),
      this.selectedBuild.equipments.sumEquipmentStat('jump'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentDwBonuses(
      this.selectedBuild.equipments.sumEquipmentStat('hp_dw'),
      this.selectedBuild.equipments.sumEquipmentStat('mp_dw'),
      this.selectedBuild.equipments.sumEquipmentStat('atk_dw'),
      this.selectedBuild.equipments.sumEquipmentStat('mag_dw'),
      this.selectedBuild.equipments.sumEquipmentStat('def_dw'),
      this.selectedBuild.equipments.sumEquipmentStat('spr_dw'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentDhBonuses(
      this.selectedBuild.equipments.sumEquipmentStat('hp_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('mp_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('atk_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('mag_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('def_dh'),
      this.selectedBuild.equipments.sumEquipmentStat('spr_dh'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentTdhBonuses(
      this.selectedBuild.equipments.sumEquipmentStat('hp_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('mp_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('atk_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('mag_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('def_tdh'),
      this.selectedBuild.equipments.sumEquipmentStat('spr_tdh'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEquipmentEsperPercent(
      this.selectedBuild.equipments.sumEquipmentStat('esper_percent'),
      equipmentActiveConditionalPassives
    );
    this.stats.defineEsperStats(this.selectedBuild.esper);

    const activeCondPassives = this.filterUnitActiveConditionalPassives();
    this.stats.defineConditionalPassives(activeCondPassives);
    this.stats.computeTotals(this.selectedBuild.equipments.isDoubleHandActive(),
      this.selectedBuild.equipments.isTrueDoubleHandActive(), this.selectedBuild.equipments.isDualWielding());
  }

  private filterUnitActiveConditionalPassives(): Array<ConditionalPassive> {
    const activeConditionalPassives: Array<ConditionalPassive> = [];
    this.conditional_passives.forEach(condPassive => {
      condPassive.active = false;
      if (this.selectedBuild.equipments.checkConditionalPassiveActive(condPassive, this.id)) {
        condPassive.active = true;
        activeConditionalPassives.push(condPassive);
      }
    });
    return activeConditionalPassives;
  }
}
