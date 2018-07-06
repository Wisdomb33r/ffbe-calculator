import {Unit} from './unit.model';
import {ResultChaining} from './result-chaining.model';
import {Skill} from './skill.model';

export abstract class DamageType {

  public calculationStat: string;

  public calculateBuffs(unit: Unit, skill: Skill, isSupportBuffing: boolean, supportBuff: number, result: ResultChaining) {
    result[this.calculationStat] = unit.stats[this.calculationStat].total;
    result['buffed_' + this.calculationStat] = unit.stats[this.calculationStat].total;
    result.self_buff = skill[this.calculationStat + '_buff'] ? skill[this.calculationStat + '_buff'] : 0;
    const buff = Math.max(result.self_buff, isSupportBuffing && supportBuff ? supportBuff : 0);
    if (buff) {
      result['buffed_' + this.calculationStat] += unit.stats[this.calculationStat].base * buff / 100;
    }
    result.calculationStat = this.calculationStat;
  }

  abstract calculateDamages(unit: Unit, result: ResultChaining);

  abstract calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, result: ResultChaining);

  abstract calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultChaining);

  abstract calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultChaining);

  public calculateLevelCorrection(unit: Unit, result: ResultChaining) {
    result.levelCorrection = 2;
  }
}
