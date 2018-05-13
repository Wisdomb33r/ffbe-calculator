import {DamageType} from './damage-type.model';
import {isNullOrUndefined} from 'util';
import {Unit} from './unit.model';
import {ResultPhysicalChaining} from './result-physical-chaining.model';

export class DamageTypePhysical extends DamageType {

  public calculationStat: string;

  constructor(calculation_stat: string) {
    super();
    if (!isNullOrUndefined(calculation_stat) && calculation_stat.length > 0) {
      this.calculationStat = calculation_stat;
    } else {
      this.calculationStat = 'atk';
    }
  }

  public calculateBuffs(unit: Unit, isSupportBuffing: boolean, supportBuff: number, result: ResultPhysicalChaining) {
    result.atk = unit.stats.atk.total;
    result.buffedAtk = result.atk;
    if (isSupportBuffing) {
      result.buffedAtk += unit.stats.atk.base * supportBuff / 100;
    }
  }

  public calculateDamages(unit: Unit, result: ResultPhysicalChaining) {
    const rawDamages = unit.selectedBuild.equipments.isDualWielding()
      ? this.calculateRawDwDamages(unit, result) : this.calculateRawDhDamages(unit, result);
    result.rawDamages = rawDamages * result.power / 100 * this.calculateLevelCorrection(unit);
  }

  private calculateRawDwDamages(unit: Unit, result: ResultPhysicalChaining): number {
    result.isDualWielding = true;
    result.leftHandAtk = unit.selectedBuild.equipments.left_hand.atk;
    result.rightHandAtk = unit.selectedBuild.equipments.right_hand.atk;
    return (result.buffedAtk - result.leftHandAtk) * (result.buffedAtk - result.rightHandAtk);
  }

  private calculateRawDhDamages(unit: Unit, result: ResultPhysicalChaining): number {
    result.isDualWielding = false;
    return result.buffedAtk * result.buffedAtk;
  }
}
