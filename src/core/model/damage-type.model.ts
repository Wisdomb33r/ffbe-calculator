import {Unit} from './unit.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {Skill} from './skill.model';

export abstract class DamageType {

  public calculationStat: string;

  public calculateBuffs(unit: Unit, skill: Skill, isSupportBuffing: boolean, supportBuff: number, result: ResultTurnDamages) {
    result[this.calculationStat] = unit.stats[this.calculationStat].total;
    result['buffed_' + this.calculationStat] = unit.stats[this.calculationStat].total;
    result.self_buff = skill[this.calculationStat + '_buff'] ? skill[this.calculationStat + '_buff'] : 0;
    const buff = Math.max(result.self_buff, isSupportBuffing && supportBuff ? supportBuff : 0);
    if (buff) {
      result['buffed_' + this.calculationStat] += unit.stats[this.calculationStat].base * buff / 100;
    }
    result.calculationStat = this.calculationStat;
  }

  abstract calculateDamages(unit: Unit, result: ResultTurnDamages);

  abstract calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, result: ResultTurnDamages);

  abstract calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultTurnDamages);

  abstract calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultTurnDamages);

  public calculateLevelCorrection(unit: Unit, result: ResultTurnDamages) {
    result.levelCorrection = 2;
  }
}
