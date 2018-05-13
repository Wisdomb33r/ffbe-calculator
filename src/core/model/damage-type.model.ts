import {Unit} from './unit.model';
import {ResultChaining} from './result-chaining.model';

export abstract class DamageType {
  abstract calculateBuffs(unit: Unit, isSupportBuffing: boolean, supportBuff: number, result: ResultChaining);

  abstract calculateDamages(unit: Unit, result: ResultChaining);

  protected calculateLevelCorrection(unit: Unit) {
    return 2;
  }
}
