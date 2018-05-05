import {AlgorithmChaining} from './algorithm-chaining.model';
import {Skill} from './skill.model';
import {AlgorithmResult} from './algorithm-result.model';
import {Unit} from './unit.model';
import {AlgorithmResultMagicalChaining} from './algorithm-result-magical-chaining.model';

export class AlgorithmMagicalChaining extends AlgorithmChaining {

  public isSparkChain = false;
  public isSupportBuffing = true;
  public supportBuff = 100;
  public opponentSpr = 1000000;
  public opponentResistances: Array<number> = [-50, -50, -50, -50, -50, -50, -50, -50];

  public calculate(unit: Unit): AlgorithmResult {
    this.checkSkillsInput(unit.selectedBuild.skills);
    const result: AlgorithmResultMagicalChaining = new AlgorithmResultMagicalChaining();
    this.calculateBuffs(unit, result);
    this.calculateCombosIncrement(unit, result);
    this.calculatePerTurnHitsPower(unit, result);
    this.calculateAverageTurnPower(result);
    this.calculateDamages(unit, result);
    this.calculateElementalResistances(unit, result);
    this.calculateDamageVariance(unit, result);
    this.calculateFinalResult(unit, result);
    return result;
  }

  private calculateFinalResult(unit: Unit, result: AlgorithmResultMagicalChaining) {
    result.result = result.elementalPreSprDamages / this.opponentSpr * result.finalVariance / 100;
  }

  private calculateDamageVariance(unit: Unit, result: AlgorithmResultMagicalChaining) {
    result.finalVariance = 92.5;
  }

  private calculateElementalResistances(unit: Unit, result: AlgorithmResultMagicalChaining) {
    const elements: Array<number> = [];
    // TODO check skill elements when possible
    if (elements && elements.length) {
      result.averageElementalResistance = elements
        .map((element: number) => this.opponentResistances[element - 1])
        .reduce((val1, val2) => val1 + val2, 0) / elements.length;
      result.elementalPreSprDamages = result.preSprDamages * (1 - result.averageElementalResistance / 100);
    } else {
      result.elementalPreSprDamages = result.preSprDamages;
    }
  }

  private calculateBuffs(unit: Unit, result: AlgorithmResultMagicalChaining) {
    result.mag = unit.stats.mag.total;
    result.buffedMag = result.mag;
    if (this.isSupportBuffing) {
      result.buffedMag += unit.stats.mag.base * this.supportBuff / 100;
    }
  }

  private calculateCombosIncrement(unit: Unit, result: AlgorithmResultMagicalChaining) {
    let increment = 0.1;
    if (this.isSparkChain) {
      increment = increment + 0.15;
    }
    // TODO check skill elements when possible
    result.combosIncrement = increment;
  }

  private calculateDamages(unit: Unit, result: AlgorithmResultMagicalChaining) {
    result.preSprDamages = result.buffedMag * result.buffedMag * result.averageTurnPower / 100 * this.calculateLevelCorrection();
  }

  private calculateAverageTurnPower(result: AlgorithmResultMagicalChaining) {
    result.averageTurnPower = result.perTurnHitsPower
      .map((hitsPower: Array<number>) => hitsPower.reduce((val1, val2) => val1 + val2, 0))
      .reduce((val1, val2) => val1 + val2, 0) / result.perTurnHitsPower.length;
  }

  protected isExecutingTwice(skill: Skill, unit: Unit) {
    return skill.nb === 2;
  }
}
