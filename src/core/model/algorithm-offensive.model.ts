import {Algorithm} from './algorithm.model';
import {Skill} from './skill.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {Unit} from './unit.model';
import {Result} from './result.model';

export abstract class AlgorithmOffensive implements Algorithm {

  public withCombo = true;
  public isKillerActive = true;
  public opponentKillerType = 'unknown';
  public opponentKillerType2 = 'none';
  public isSparkChain = false;
  public isSupportBuffing = true;
  public isSupportBreakingResistances = true;
  public supportBuff = 100;
  public opponentDef = 1000000;
  public opponentSpr = 1000000;
  public supportResistsBreak: Array<number> = [-50, -50, -50, -50, -50, -50, -50, -50];
  public opponentResistances: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0];

  abstract calculate(unit: Unit): Result;

  protected calculateEffectiveResistances(skill: Skill, result: ResultTurnDamages) {
    result.resistances = this.isSupportBreakingResistances ?
      this.opponentResistances.map((resist, index) => resist + this.supportResistsBreak[index])
      : this.opponentResistances;
    if (Array.isArray(skill.resists_break) && skill.resists_break.length === 8) {
      result.resistances = result.resistances.map((resist, index) =>
        Math.min(resist, this.opponentResistances[index] + skill.resists_break[index]));
    }
  }
}
