import {AlgorithmChaining} from './algorithm-chaining.model';
import {Skill} from './skill.model';
import {Result} from './result.model';
import {Unit} from './unit.model';
import {ResultOffensive} from './result-offensive.model';
import {ResultChaining} from './result-chaining.model';

export class AlgorithmMagicalChaining extends AlgorithmChaining {

  public opponentSpr = 1000000;
  public opponentResistances: Array<number> = [-50, -50, -50, -50, -50, -50, -50, -50];

  public calculate(unit: Unit): Result {
    this.checkSkillsInput(unit.selectedBuild.skills);
    const result: ResultOffensive = new ResultOffensive();
    unit.selectedBuild.skills.forEach((skill: Skill) => result.turnDamages.push(this.calculateTurn(skill, unit)));
    result.result = result.turnDamages
      .map(r => r.result)
      .reduce((val1, val2) => val1 + val2, 0) / result.turnDamages.length;
    return result;
  }

  public calculateTurn(skill: Skill, unit: Unit): ResultChaining {
    const result: ResultChaining = new ResultChaining();
    skill.damageType.calculateBuffs(unit, this.isSupportBuffing, this.supportBuff, result);
    this.calculateCombosIncrement(skill, unit, result);
    this.calculateHitsPower(skill, unit, result);
    skill.damageType.calculateDamages(unit, result);
    skill.damageType.calculateKillerDamages(unit, skill.skillType.getActiveKillers(unit), result);
    this.calculateElementalResistances(skill, unit, result);
    this.calculateDamageVariance(skill, unit, result);
    this.calculateFinalResult(skill, unit, result);
    return result;
  }

  private calculateFinalResult(skill: Skill, unit: Unit, result: ResultChaining) {
    result.result = result.magicalElementalDamages / this.opponentSpr * result.finalVariance / 100;
  }

  private calculateDamageVariance(skill: Skill, unit: Unit, result: ResultChaining) {
    result.finalVariance = 92.5;
  }

  private calculateElementalResistances(skill: Skill, unit: Unit, result: ResultChaining) {
    const elements: Array<number> = [];
    // TODO check skill elements when possible
    if (elements && elements.length) {
      result.averageElementalResistance = elements
        .map((element: number) => this.opponentResistances[element - 1])
        .reduce((val1, val2) => val1 + val2, 0) / elements.length;
      result.magicalElementalDamages = result.magicalKillerDamages * (1 - result.averageElementalResistance / 100);
    } else {
      result.magicalElementalDamages = result.magicalKillerDamages;
    }
  }

  protected isExecutingTwice(skill: Skill, unit: Unit) {
    return skill.nb === 2;
  }
}
