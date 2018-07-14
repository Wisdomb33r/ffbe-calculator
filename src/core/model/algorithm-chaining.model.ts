import {Result} from './result.model';
import {Unit} from './unit.model';
import {isNullOrUndefined} from 'util';
import {Skill} from './skill.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {ResultOffensive} from './result-offensive.model';
import {AlgorithmOffensive} from './algorithm-offensive.model';

export class AlgorithmChaining extends AlgorithmOffensive {

  public calculate(unit: Unit): Result {
    const result: ResultOffensive = new ResultOffensive();
    unit.selectedBuild.skills.forEach((skill: Skill) => result.turnDamages.push(this.calculateTurn(skill, unit)));
    result.result = result.turnDamages
      .map(r => r.result)
      .reduce((val1, val2) => val1 + val2, 0) / result.turnDamages.length;
    return result;
  }

  private calculateTurn(skill: Skill, unit: Unit): ResultTurnDamages {
    const result: ResultTurnDamages = new ResultTurnDamages();
    skill.damageType.calculateLevelCorrection(unit, result);
    skill.damageType.calculateBuffs(unit, skill, this.isSupportBuffing, this.supportBuff, result);
    this.calculateCombosIncrement(skill, unit, result);
    this.calculateHitsPower(skill, unit, result);
    skill.damageType.calculateDamages(unit, result);
    const killerValue: number = skill.skillType.getActiveKillers(unit, this.opponentKillerType);
    skill.damageType.calculateKillerDamages(unit, this.isKillerActive, killerValue, result);
    this.calculateEffectiveResistances(skill, result);
    skill.damageType.calculateElementalDamages(unit, skill.skillType.getElements(skill, unit), result);
    skill.damageType.calculateFinalResult(unit, this.opponentDef, this.opponentSpr, result);
    return result;
  }

  private calculateCombosIncrement(skill: Skill, unit: Unit, result: ResultTurnDamages) {
    let increment = 0.1;
    const elements = skill.skillType.getElements(skill, unit);
    if (Array.isArray(elements) && elements.length > 0) {
      increment += 0.2 * elements.length;
    }
    if (this.isSparkChain) {
      increment += 0.15;
    }
    result.combosIncrement = increment;
  }

  private calculateHitsPower(skill: Skill, unit: Unit, result: ResultTurnDamages) {
    if (isNullOrUndefined(skill.hits) || skill.hits < 1) {
      result.hitsPower = [0];
      result.power = 0;
    } else {
      const frames: Array<number> = ('' + skill.frames).split(' ').map((s: string) => +s);
      const damages: Array<number> = ('' + skill.damages).split(' ').map((s: string) => +s);
      const hitsPower: Array<number> = [];
      let chainCombos = 0;
      for (let i = 0; i < skill.hits; i++) {
        if (i > 0 && frames[i] - frames[i - 1] > 25) {
          chainCombos = 0;
        }
        hitsPower.push(skill.power * damages[i] / 100 * Math.min(4, 1 + chainCombos * result.combosIncrement * 2));
        chainCombos++;
      }
      if (skill.isBreakingChain) {
        chainCombos = 0;
      }
      if (skill.skillType.isExecutingTwice(skill, unit)) {
        for (let j = 0; j < skill.hits; j++) {
          if (j > 0 && frames[j] - frames[j - 1] > 25) {
            chainCombos = 0;
          }
          hitsPower.push(skill.power * damages[j] / 100 * Math.min(4, 1 + chainCombos * result.combosIncrement * 2));
          chainCombos++;
        }
      }
      result.hitsPower = hitsPower;
      result.power = hitsPower.reduce((val1, val2) => val1 + val2, 0);
    }
  }
}
