import {DamageType} from './damage-type.model';
import {Unit} from './unit.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {Skill} from './skill.model';

export class DamageTypeNone extends DamageType {
  calculateBuffs(unit: Unit, skill: Skill, isSupportBuffing: boolean, supportBuff: number, result: ResultTurnDamages) {
  }

  calculateDamages(unit: Unit, result: ResultTurnDamages) {
  }

  calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, result: ResultTurnDamages) {
  }

  calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultTurnDamages) {
  }

  calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultTurnDamages) {
    result.physicalResult = 0;
    result.magicalResult = 0;
    result.result = 0;
  }

}
