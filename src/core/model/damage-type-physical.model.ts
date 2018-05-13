import {DamageType} from './damage-type.model';
import {isNullOrUndefined} from 'util';
import {Unit} from './unit.model';
import {ResultChaining} from './result-chaining.model';
import {Equipment} from './equipment.model';

export class DamageTypePhysical extends DamageType {

  public calculationStat: string;

  constructor(calculation_stat?: string) {
    super();
    if (!isNullOrUndefined(calculation_stat) && calculation_stat.length > 0) {
      this.calculationStat = calculation_stat;
    } else {
      this.calculationStat = 'atk';
    }
  }

  public calculateBuffs(unit: Unit, isSupportBuffing: boolean, supportBuff: number, result: ResultChaining) {
    result.atk = unit.stats.atk.total;
    result.buffedAtk = result.atk;
    if (isSupportBuffing) {
      result.buffedAtk += unit.stats.atk.base * supportBuff / 100;
    }
  }

  public calculateDamages(unit: Unit, result: ResultChaining) {
    const rawDamages = unit.selectedBuild.equipments.isDualWielding()
      ? this.calculateDwDamages(unit, result) : this.calculateDhDamages(unit, result);
    result.physicalDamages = rawDamages * result.power / 100 * this.calculateLevelCorrection(unit);
  }

  public calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, result: ResultChaining) {
    result.killerPassive = 0;
    result.physicalKillerDamages = result.physicalDamages;
    if (killer && isKillerActive) {
      result.killerPassive = killer;
      result.physicalKillerDamages *= (1 + result.killerPassive / 1000);
    }
  }

  public calculateElementalDamages(unit: Unit, elements: Array<number>, resistances: Array<number>, result: ResultChaining) {
    result.physicalElementalDamages = result.physicalKillerDamages;
    if (elements && elements.length) {
      result.averageElementalResistance = elements
        .map((element: number) => resistances[element - 1])
        .reduce((val1, val2) => val1 + val2, 0) / elements.length;
      result.physicalElementalDamages = result.physicalKillerDamages * (1 - result.averageElementalResistance / 100);
    }
  }

  public calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultChaining) {
    this.calculateDamageVariance(unit, result);
    result.physicalResult = result.physicalElementalDamages / def * result.averageWeaponVariance / 100 * result.finalVariance / 100;
    result.result = result.physicalResult;
  }

  private calculateDamageVariance(unit: Unit, result: ResultChaining) {
    const right_hand: Equipment = unit.selectedBuild.equipments.right_hand;
    result.averageWeaponVariance = right_hand.isTwoHanded() ? (right_hand.variance_min + right_hand.variance_max) / 2 : 100;
    result.finalVariance = 92.5;
  }

  private calculateDwDamages(unit: Unit, result: ResultChaining): number {
    result.isDualWielding = true;
    result.leftHandAtk = unit.selectedBuild.equipments.left_hand.atk;
    result.rightHandAtk = unit.selectedBuild.equipments.right_hand.atk;
    return (result.buffedAtk - result.leftHandAtk) * (result.buffedAtk - result.rightHandAtk);
  }

  private calculateDhDamages(unit: Unit, result: ResultChaining): number {
    result.isDualWielding = false;
    return result.buffedAtk * result.buffedAtk;
  }
}
