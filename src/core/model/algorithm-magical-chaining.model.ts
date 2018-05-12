import {AlgorithmChaining} from './algorithm-chaining.model';
import {Skill} from './skill.model';
import {AlgorithmResult} from './algorithm-result.model';
import {Unit} from './unit.model';
import {AlgorithmResultMagicalChaining} from './algorithm-result-magical-chaining.model';
import {AlgorithmResultOffensive} from './algorithm-result-offensive.model';

export class AlgorithmMagicalChaining extends AlgorithmChaining {

  public opponentSpr = 1000000;
  public opponentResistances: Array<number> = [-50, -50, -50, -50, -50, -50, -50, -50];

  public calculate(unit: Unit): AlgorithmResult {
    this.checkSkillsInput(unit.selectedBuild.skills);
    const result: AlgorithmResultOffensive = new AlgorithmResultOffensive();
    unit.selectedBuild.skills.forEach((skill: Skill) => result.turnDamages.push(this.calculateTurn(skill, unit)));
    result.result = result.turnDamages
      .map(r => r.result)
      .reduce((val1, val2) => val1 + val2, 0) / result.turnDamages.length;
    return result;
  }

  public calculateTurn(skill: Skill, unit: Unit): AlgorithmResultMagicalChaining {
    const result: AlgorithmResultMagicalChaining = new AlgorithmResultMagicalChaining();
    this.calculateBuffs(skill, unit, result);
    this.calculateCombosIncrement(skill, unit, result);
    this.calculateHitsPower(skill, unit, result);
    this.calculateDamages(skill, unit, result);
    this.calculateKillers(skill, unit, result);
    this.calculateElementalResistances(skill, unit, result);
    this.calculateDamageVariance(skill, unit, result);
    this.calculateFinalResult(skill, unit, result);
    return result;
  }

  protected getActiveKillers(unit: Unit) {
    return unit.getMagicalKillers();
  }

  private calculateFinalResult(skill: Skill, unit: Unit, result: AlgorithmResultMagicalChaining) {
    result.result = result.elementalDamages / this.opponentSpr * result.finalVariance / 100;
  }

  private calculateDamageVariance(skill: Skill, unit: Unit, result: AlgorithmResultMagicalChaining) {
    result.finalVariance = 92.5;
  }

  private calculateElementalResistances(skill: Skill, unit: Unit, result: AlgorithmResultMagicalChaining) {
    const elements: Array<number> = [];
    // TODO check skill elements when possible
    if (elements && elements.length) {
      result.averageElementalResistance = elements
        .map((element: number) => this.opponentResistances[element - 1])
        .reduce((val1, val2) => val1 + val2, 0) / elements.length;
      result.elementalDamages = result.killerDamages * (1 - result.averageElementalResistance / 100);
    } else {
      result.elementalDamages = result.killerDamages;
    }
  }

  private calculateBuffs(skill: Skill, unit: Unit, result: AlgorithmResultMagicalChaining) {
    result.mag = unit.stats.mag.total;
    result.buffedMag = result.mag;
    if (this.isSupportBuffing) {
      result.buffedMag += unit.stats.mag.base * this.supportBuff / 100;
    }
  }

  private calculateCombosIncrement(skill: Skill, unit: Unit, result: AlgorithmResultMagicalChaining) {
    let increment = 0.1;
    if (this.isSparkChain) {
      increment = increment + 0.15;
    }
    // TODO check skill elements when possible
    result.combosIncrement = increment;
  }

  private calculateDamages(skill: Skill, unit: Unit, result: AlgorithmResultMagicalChaining) {
    result.rawDamages = result.buffedMag * result.buffedMag * result.power / 100 * this.calculateLevelCorrection();
  }

  protected isExecutingTwice(skill: Skill, unit: Unit) {
    return skill.nb === 2;
  }
}
