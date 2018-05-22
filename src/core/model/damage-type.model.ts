import {Unit} from './unit.model';
import {ResultChaining} from './result-chaining.model';

export abstract class DamageType {

  public calculationStat: string;

  public calculateBuffs(unit: Unit, isSupportBuffing: boolean, supportBuff: number, result: ResultChaining) {
    result[this.calculationStat] = unit.stats[this.calculationStat].total;
    result['buffed_' + this.calculationStat] = unit.stats[this.calculationStat].total;
    if (isSupportBuffing) {
      result['buffed_' + this.calculationStat] += unit.stats[this.calculationStat].base * supportBuff / 100;
    }
    result.calculationStat = this.calculationStat;
  }

  abstract calculateDamages(unit: Unit, result: ResultChaining);

  abstract calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, result: ResultChaining);

  abstract calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultChaining);

  abstract calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultChaining);

  protected calculateLevelCorrection(unit: Unit) {
    return 2;
  }
}
