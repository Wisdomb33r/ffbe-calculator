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

  public calculateDamages(unit: Unit, result: ResultChaining) {
    result.magicalDamages = result.buffedMag * result.buffedMag * result.power / 100 * this.calculateLevelCorrection(unit);
  }

  public calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, result: ResultChaining) {
    result.killerPassive = 0;
    result.magicalKillerDamages = result.magicalDamages;
    if (killer && isKillerActive) {
      result.killerPassive = killer;
      result.magicalKillerDamages *= (1 + result.killerPassive / 1000);
    }
  }

  public calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultChaining) {
    result.elements = elements;
    result.magicalElementalDamages = result.magicalKillerDamages;
    if (elements && elements.length) {
      result.averageElementalResistance = elements
        .map((element: number) => result.resistances[element - 1])
        .reduce((val1, val2) => val1 + val2, 0) / elements.length;
      result.magicalElementalDamages = result.magicalKillerDamages * (1 - result.averageElementalResistance / 100);
    }
  }

  public calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultChaining) {
    this.calculateDamageVariance(unit, result);
    result.magicalResult = result.magicalElementalDamages / spr * result.finalVariance / 100;
    result.result = result.magicalResult;
  }

  private calculateDamageVariance(unit: Unit, result: ResultChaining) {
    result.finalVariance = 92.5;
  }
}
