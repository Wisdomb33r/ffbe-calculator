import {AlgorithmChaining} from './algorithm-chaining.model';
import {Result} from './result.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';
import {ResultHybridChaining} from './result-hybrid-chaining.model';
import {Equipment} from './equipment.model';
import {ResultOffensive} from './result-offensive.model';

export class AlgorithmHybridChaining extends AlgorithmChaining {

  public opponentDef = 1000000;
  public opponentSpr = 1000000;
  public opponentResistances: Array<number> = [-50, -50, -50, -50, -50, -50, -50, -50];

  public calculate(unit: Unit): Result {
    this.checkSkillsInput(unit.selectedBuild.skills);
    const result: ResultOffensive = new ResultOffensive();
    unit.selectedBuild.skills.forEach((skill: Skill) => result.turnDamages.push(this.calculateTurn(skill, unit)));
    result.result = result.turnDamages
      .map((r: ResultHybridChaining) => r.result)
      .reduce((val1, val2) => val1 + val2, 0) / result.turnDamages.length;
    return result;
  }

  public calculateTurn(skill: Skill, unit: Unit): ResultHybridChaining {
    const result: ResultHybridChaining = new ResultHybridChaining();
    skill.damageType.calculateBuffs(unit, this.isSupportBuffing, this.supportBuff, result);
    this.calculateCombosIncrement(skill, unit, result);
    this.calculateHitsPower(skill, unit, result);
    skill.damageType.calculateDamages(unit, result);
    this.calculateKillers(skill, unit, result);
    this.calculateElementalResistances(skill, unit, result);
    this.calculateDamageVariance(skill, unit, result);
    this.calculateFinalResult(skill, unit, result);
    return result;
  }

  protected getActiveKillers(unit: Unit) {
    return unit.getPhysicalKillers();
  }

  protected calculateKillers(skill: Skill, unit: Unit, result: ResultHybridChaining) {
    result.killerPassive = 0;
    if (this.isKillerActive) {
      result.killerPassive = this.getActiveKillers(unit);
      result.physicalKillerDamages = result.physicalDamages * (1 + result.killerPassive / 1000);
      result.magicalKillerDamages = result.magicalDamages * (1 + result.killerPassive / 1000);
    } else {
      result.physicalKillerDamages = result.physicalDamages;
      result.magicalKillerDamages = result.magicalDamages;
    }
  }

  private calculateFinalResult(skill: Skill, unit: Unit, result: ResultHybridChaining) {
    result.physicalResult = result.physicalElementalDamages / this.opponentDef
      * result.averageWeaponVariance / 100 * result.finalVariance / 100;
    result.magicalResult = result.magicalElementalDamages / this.opponentSpr * result.finalVariance / 100;
    result.result = result.physicalResult + result.magicalResult;
  }

  private calculateDamageVariance(skill: Skill, unit: Unit, result: ResultHybridChaining) {
    const right_hand: Equipment = unit.selectedBuild.equipments.right_hand;
    result.averageWeaponVariance = right_hand.isTwoHanded() ? (right_hand.variance_min + right_hand.variance_max) / 2 : 100;
    result.finalVariance = 92.5;
  }

  private calculateElementalResistances(skill: Skill, unit: Unit, result: ResultHybridChaining) {
    const elements: Array<number> = unit.selectedBuild.equipments.getWeaponsElements();
    // TODO check skill elements when possible
    if (elements && elements.length) {
      result.averageElementalResistance = elements
        .map((element: number) => this.opponentResistances[element - 1])
        .reduce((val1, val2) => val1 + val2, 0) / elements.length;
      result.physicalElementalDamages = result.physicalKillerDamages * (1 - result.averageElementalResistance / 100);
      result.magicalElementalDamages = result.magicalKillerDamages * (1 - result.averageElementalResistance / 100);
    } else {
      result.physicalElementalDamages = result.physicalKillerDamages;
      result.magicalElementalDamages = result.magicalKillerDamages;
    }
  }

  protected isExecutingTwice(skill: Skill, unit: Unit): boolean {
    return (skill.nb === 2 || unit.selectedBuild.equipments.isDualWielding()) && !skill.isLimitBreak;
  }
}
