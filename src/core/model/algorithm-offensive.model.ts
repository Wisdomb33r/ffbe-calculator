import {Algorithm} from './algorithm.model';
import {Skill} from './skill.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {Unit} from './unit.model';
import {Result} from './result.model';
import {ResultOffensive} from './result-offensive.model';

export abstract class AlgorithmOffensive implements Algorithm {

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

  protected abstract calculateTurn(skill: Skill, unit: Unit): ResultTurnDamages;

  public calculate(unit: Unit): Result {
    const result: ResultOffensive = new ResultOffensive();
    unit.selectedBuild.startPhaseSkills.forEach((skill: Skill) => result.startPhaseTurnDamages.push(this.calculateTurn(skill, unit)));
    result.startPhaseResult = result.startPhaseTurnDamages
      .map(r => r.result)
      .reduce((val1, val2) => val1 + val2, 0) / result.startPhaseTurnDamages.filter((turn: ResultTurnDamages) => turn.isTurnCounting)
      .length;
    unit.selectedBuild.skills.forEach((skill: Skill) => result.turnDamages.push(this.calculateTurn(skill, unit)));
    result.result = result.turnDamages
      .map(r => r.result)
      .reduce((val1, val2) => val1 + val2, 0) / result.turnDamages.filter((turn: ResultTurnDamages) => turn.isTurnCounting).length;
    return result;
  }

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
