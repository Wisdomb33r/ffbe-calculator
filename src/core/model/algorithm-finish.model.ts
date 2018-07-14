import {Unit} from './unit.model';
import {ResultOffensive} from './result-offensive.model';
import {Skill} from './skill.model';
import {Result} from './result.model';
import {ResultChaining} from './result-chaining.model';
import {isNullOrUndefined} from 'util';
import {AlgorithmOffensive} from './algorithm-offensive.model';

export class AlgorithmFinish extends AlgorithmOffensive {

  public calculate(unit: Unit): Result {
    const result: ResultOffensive = new ResultOffensive();
    unit.selectedBuild.skills.forEach((skill: Skill) => result.turnDamages.push(this.calculateTurn(skill, unit)));
    result.result = result.turnDamages
      .map(r => r.result)
      .reduce((val1, val2) => val1 + val2, 0) / result.turnDamages.length;
    return result;
  }

  private calculateTurn(skill: Skill, unit: Unit): ResultChaining {
    const result: ResultChaining = new ResultChaining();
    skill.damageType.calculateLevelCorrection(unit, result);
    skill.damageType.calculateBuffs(unit, skill, this.isSupportBuffing, this.supportBuff, result);
    this.calculateHitsPower(skill, unit, result);
    skill.damageType.calculateDamages(unit, result);
    skill.damageType.calculateKillerDamages(unit, this.isKillerActive, skill.skillType.getActiveKillers(unit), result);
    this.calculateEffectiveResistances(skill, result);
    skill.damageType.calculateElementalDamages(unit, skill.skillType.getElements(skill, unit), result);
    skill.damageType.calculateFinalResult(unit, this.opponentDef, this.opponentSpr, result);
    return result;
  }

  private calculateHitsPower(skill: Skill, unit: Unit, result: ResultChaining) {
    if (skill.isEsper) {
      skill.power = unit.selectedBuild.esper.power;
    }
    if (isNullOrUndefined(skill.hits) || skill.hits < 1) {
      result.hitsPower = [0];
      result.power = 0;
    } else {
      result.combosIncrement = 4;
      const damages: Array<number> = ('' + skill.damages).split(' ').map((s: string) => +s);
      const hitsPower: Array<number> = [];
      if (skill.isBreakingChain) {
        result.combosIncrement = 2.5;
      }
      if (skill.isDwBreakingChain && skill.skillType.isExecutingTwice(skill, unit)) {
        result.combosIncrement = 2.5;
      }
      if (skill.isOutOfChain) {
        result.combosIncrement = 1;
      }
      for (let i = 0; i < skill.hits; i++) {
        hitsPower.push(skill.power * damages[i] / 100 * result.combosIncrement);
      }
      if (skill.skillType.isExecutingTwice(skill, unit)) {
        for (let j = 0; j < skill.hits; j++) {
          hitsPower.push(skill.power * damages[j] / 100 * result.combosIncrement);
        }
      }
      result.hitsPower = hitsPower;
      result.power = hitsPower.reduce((val1, val2) => val1 + val2, 0);
    }
  }
}
