import {DamageType} from './damage-type.model';
import {isNullOrUndefined} from 'util';
import {ResultMagicalChaining} from './result-magical-chaining.model';
import {Unit} from './unit.model';

export class DamageTypeMagical extends DamageType {

  public calculationStat: string;

  constructor(calculation_stat: string) {
    super();
    if (!isNullOrUndefined(calculation_stat) && calculation_stat.length > 0) {
      this.calculationStat = calculation_stat;
    } else {
      this.calculationStat = 'mag';
    }
  }

  public calculateBuffs(unit: Unit, isSupportBuffing: boolean, supportBuff: number, result: ResultMagicalChaining) {
    result.mag = unit.stats.mag.total;
    result.buffedMag = result.mag;
    if (isSupportBuffing) {
      result.buffedMag += unit.stats.mag.base * supportBuff / 100;
    }
  }

  calculateDamages(unit: Unit, result: ResultMagicalChaining) {
    result.rawDamages = result.buffedMag * result.buffedMag * result.power / 100 * this.calculateLevelCorrection(unit);
  }
}
