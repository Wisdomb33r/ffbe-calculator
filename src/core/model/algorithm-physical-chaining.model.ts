import {AlgorithmChaining} from './algorithm-chaining.model';
import {Skill} from './skill.model';
import {AlgorithmResult} from './algorithm-result.model';
import {AlgorithmResultPhysicalChaining} from './algorithm-result-physical-chaining.model';
import {Unit} from './unit.model';
import {Equipment} from './equipment.model';
import {AlgorithmResultOffensive} from './algorithm-result-offensive.model';
import {AlgorithmResultChaining} from './algorithm-result-chaining.model';

export class AlgorithmPhysicalChaining extends AlgorithmChaining {

  public opponentDef = 1000000;
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

  private calculateTurn(skill: Skill, unit: Unit): AlgorithmResultChaining {
    const result: AlgorithmResultPhysicalChaining = new AlgorithmResultPhysicalChaining();
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

  private calculateFinalResult(skill: Skill, unit: Unit, result: AlgorithmResultPhysicalChaining) {
    result.result = result.elementalDamages / this.opponentDef * result.averageWeaponVariance / 100 * result.finalVariance / 100;
  }

  private calculateDamageVariance(skill: Skill, unit: Unit, result: AlgorithmResultPhysicalChaining) {
    const right_hand: Equipment = unit.selectedBuild.equipments.right_hand;
    result.averageWeaponVariance = right_hand.isTwoHanded() ? (right_hand.variance_min + right_hand.variance_max) / 2 : 100;
    result.finalVariance = 92.5;
  }

  private calculateElementalResistances(skill: Skill, unit: Unit, result: AlgorithmResultPhysicalChaining) {
    const elements: Array<number> = unit.selectedBuild.equipments.getWeaponsElements();
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

  private calculateBuffs(skill: Skill, unit: Unit, result: AlgorithmResultPhysicalChaining) {
    result.atk = unit.stats.atk.total;
    result.buffedAtk = result.atk;
    if (this.isSupportBuffing) {
      result.buffedAtk += unit.stats.atk.base * this.supportBuff / 100;
    }
  }

  private calculateDamages(skill: Skill, unit: Unit, result: AlgorithmResultPhysicalChaining) {
    const rawDamages = unit.selectedBuild.equipments.isDualWielding()
      ? this.calculateRawDwDamages(unit, result) : this.calculateRawDhDamages(unit, result);
    result.rawDamages = rawDamages * result.power / 100 * this.calculateLevelCorrection();
  }

  private calculateRawDwDamages(unit: Unit, result: AlgorithmResultPhysicalChaining): number {
    result.isDualWielding = true;
    result.leftHandAtk = unit.selectedBuild.equipments.left_hand.atk;
    result.rightHandAtk = unit.selectedBuild.equipments.right_hand.atk;
    return (result.buffedAtk - result.leftHandAtk) * (result.buffedAtk - result.rightHandAtk);
  }

  private calculateRawDhDamages(unit: Unit, result: AlgorithmResultPhysicalChaining): number {
    result.isDualWielding = false;
    return result.buffedAtk * result.buffedAtk;
  }

  protected isExecutingTwice(skill: Skill, unit: Unit): boolean {
    return (skill.nb === 2 || unit.selectedBuild.equipments.isDualWielding()) && !skill.isLimitBreak;
  }
}
