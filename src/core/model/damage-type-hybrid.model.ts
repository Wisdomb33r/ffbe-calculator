import {ResultChaining} from './result-chaining.model';
import {Unit} from './unit.model';
import {DamageType} from './damage-type.model';
import {ResultHybridChaining} from './result-hybrid-chaining.model';

export class DamageTypeHybrid extends DamageType {
  public calculateBuffs(unit: Unit, isSupportBuffing: boolean, supportBuff: number, result: ResultChaining) {
    result.atk = unit.stats.atk.total;
    result.buffedAtk = result.atk;
    if (isSupportBuffing) {
      result.buffedAtk += unit.stats.atk.base * supportBuff / 100;
    }
    result.mag = unit.stats.mag.total;
    result.buffedMag = result.mag;
    if (isSupportBuffing) {
      result.buffedMag += unit.stats.mag.base * supportBuff / 100;
    }
  }

  public calculateDamages(unit: Unit, result: ResultHybridChaining) {
    this.calculateMagicalDamages(unit, result);
    this.calculatePhysicalDamages(unit, result);
  }

  private calculateMagicalDamages(unit: Unit, result: ResultHybridChaining) {
    result.magicalDamages = result.buffedMag * result.buffedMag * result.power / 200 * this.calculateLevelCorrection(unit);
  }

  private calculatePhysicalDamages(unit: Unit, result: ResultHybridChaining) {
    const physicalDamages = unit.selectedBuild.equipments.isDualWielding()
      ? this.calculateRawDwDamages(unit, result) : this.calculateRawDhDamages(unit, result);
    result.physicalDamages = physicalDamages * result.power / 200 * this.calculateLevelCorrection(unit);
  }

  private calculateRawDwDamages(unit: Unit, result: ResultHybridChaining): number {
    result.isDualWielding = true;
    result.leftHandAtk = unit.selectedBuild.equipments.left_hand.atk;
    result.rightHandAtk = unit.selectedBuild.equipments.right_hand.atk;
    return (result.buffedAtk - result.leftHandAtk) * (result.buffedAtk - result.rightHandAtk);
  }

  private calculateRawDhDamages(unit: Unit, result: ResultHybridChaining): number {
    result.isDualWielding = false;
    return result.buffedAtk * result.buffedAtk;
  }
}
