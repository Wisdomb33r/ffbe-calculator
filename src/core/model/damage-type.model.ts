import {Unit} from './unit.model';
import {ResultChaining} from './result-chaining.model';

export abstract class DamageType {
  abstract calculateBuffs(unit: Unit, isSupportBuffing: boolean, supportBuff: number, result: ResultChaining);

  abstract calculateDamages(unit: Unit, result: ResultChaining);

  abstract calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, result: ResultChaining);

  abstract calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultChaining);

  abstract calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultChaining);

  protected calculateLevelCorrection(unit: Unit) {
    return 2;
  }
}
