import {DamageType} from './damage-type.model';
import {Unit} from './unit.model';
import {ResultChaining} from './result-chaining.model';

export class DamageTypeNone extends DamageType {
  calculateBuffs(unit: Unit, isSupportBuffing: boolean, supportBuff: number, result: ResultChaining) {
  }

  calculateDamages(unit: Unit, result: ResultChaining) {
  }

  calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, result: ResultChaining) {
  }

  calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultChaining) {
  }

  calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultChaining) {
    result.physicalResult = 0;
    result.magicalResult = 0;
    result.result = 0;
  }

}
