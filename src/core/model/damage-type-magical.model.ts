import {DamageType} from './damage-type.model';
import {isNullOrUndefined} from 'util';
import {Unit} from './unit.model';
import {ResultChaining} from './result-chaining.model';

export class DamageTypeMagical extends DamageType {

  public calculationStat: string;

  constructor(calculation_stat?: string) {
    super();
    if (!isNullOrUndefined(calculation_stat) && calculation_stat.length > 0) {
      this.calculationStat = calculation_stat;
    } else {
      this.calculationStat = 'mag';
    }
  }

  public calculateBuffs(unit: Unit, isSupportBuffing: boolean, supportBuff: number, result: ResultChaining) {
    result.mag = unit.stats.mag.total;
    result.buffedMag = result.mag;
    if (isSupportBuffing) {
      result.buffedMag += unit.stats.mag.base * supportBuff / 100;
    }
  }

  calculateDamages(unit: Unit, result: ResultChaining) {
    result.magicalDamages = result.buffedMag * result.buffedMag * result.power / 100 * this.calculateLevelCorrection(unit);
  }

  public calculateKillerDamages(unit: Unit, killer: number, result: ResultChaining) {
    result.killerPassive = 0;
    result.magicalKillerDamages = result.magicalDamages;
    if (killer) {
      result.killerPassive = killer;
      result.magicalKillerDamages *= (1 + result.killerPassive / 1000);
    }
  }
}
