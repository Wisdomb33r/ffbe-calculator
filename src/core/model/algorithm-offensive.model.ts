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
    this.calculateTenTurnsResult(result);
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

  protected calculateTenTurnsResult(result: ResultOffensive) {
    const tenTurnsSkills: Array<ResultTurnDamages> = [];
    let turnsCount = 0;
    if (result.startPhaseTurnDamages) {
      const nbTurnsDamages = result.startPhaseTurnDamages.length;
      let currentTurnDamageIndex = 0;
      // fill the ten turns skills with as much start phase skills as possible, but stop at 10-th counting skill
      while (currentTurnDamageIndex < nbTurnsDamages && turnsCount < 10) {
        const currentTurnDamage = result.startPhaseTurnDamages[currentTurnDamageIndex];
        tenTurnsSkills.push(currentTurnDamage);
        if (currentTurnDamage.isTurnCounting) {
          turnsCount++;
        }
        currentTurnDamageIndex++;
      }
      // add the non-counting turn damages that are just after the 10-th counting skill if exist
      while (currentTurnDamageIndex < nbTurnsDamages) {
        const currentTurnDamage = result.startPhaseTurnDamages[currentTurnDamageIndex];
        if (currentTurnDamage.isTurnCounting) {
          break;
        } else {
          tenTurnsSkills.push(currentTurnDamage);
        }
        currentTurnDamageIndex++;
      }
    }
    while (turnsCount < 10) {
      const nbTurnsDamages = result.turnDamages.length;
      let currentTurnDamageIndex = 0;
      // fill the rest of the ten turns skills with stable skills, but stop at 10-th counting skill
      while (currentTurnDamageIndex < nbTurnsDamages && turnsCount < 10) {
        const currentTurnDamage = result.turnDamages[currentTurnDamageIndex];
        tenTurnsSkills.push(currentTurnDamage);
        if (currentTurnDamage.isTurnCounting) {
          turnsCount++;
        }
        currentTurnDamageIndex++;
      }
      // add the non-counting turn damages that are just after the 10-th counting skill if exist
      while (currentTurnDamageIndex < nbTurnsDamages) {
        const currentTurnDamage = result.turnDamages[currentTurnDamageIndex];
        if (currentTurnDamage.isTurnCounting) {
          break;
        } else {
          tenTurnsSkills.push(currentTurnDamage);
        }
        currentTurnDamageIndex++;
      }
    }
    result.tenTurnsResult = tenTurnsSkills
      .map(r => r.result)
      .reduce((val1, val2) => val1 + val2, 0) / tenTurnsSkills.filter((turn: ResultTurnDamages) => turn.isTurnCounting).length;
  }
}
