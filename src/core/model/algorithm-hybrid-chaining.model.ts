import {AlgorithmChaining} from './algorithm-chaining.model';
import {AlgorithmResult} from './algorithm-result.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';
import {AlgorithmResultHybridChaining} from './algorithm-result-hybrid-chaining.model';
import {Equipment} from './equipment.model';
import {AlgorithmResultOffensive} from './algorithm-result-offensive.model';

export class AlgorithmHybridChaining extends AlgorithmChaining {

  public opponentDef = 1000000;
  public opponentSpr = 1000000;
  public opponentResistances: Array<number> = [-50, -50, -50, -50, -50, -50, -50, -50];

  public calculate(unit: Unit): AlgorithmResult {
    this.checkSkillsInput(unit.selectedBuild.skills);
    const result: AlgorithmResultOffensive = new AlgorithmResultOffensive();
    unit.selectedBuild.skills.forEach((skill: Skill) => result.turnDamages.push(this.calculateTurn(skill, unit)));
    result.result = result.turnDamages
      .map((r: AlgorithmResultHybridChaining) => r.result)
      .reduce((val1, val2) => val1 + val2, 0) / result.turnDamages.length;
    return result;
  }

  public calculateTurn(skill: Skill, unit: Unit): AlgorithmResultHybridChaining {
    const result: AlgorithmResultHybridChaining = new AlgorithmResultHybridChaining();
    this.calculateBuffs(skill, unit, result);
    this.calculateCombosIncrement(skill, unit, result);
    this.calculateHitsPower(skill, unit, result);
    this.calculatePhysicalDamages(skill, unit, result);
    this.calculateMagicalDamages(skill, unit, result);
    this.calculateKillers(skill, unit, result);
    this.calculateElementalResistances(skill, unit, result);
    this.calculateDamageVariance(skill, unit, result);
    this.calculateFinalResult(skill, unit, result);
    return result;
  }

  protected getActiveKillers(unit: Unit) {
    return unit.getPhysicalKillers();
  }

  protected calculateKillers(skill: Skill, unit: Unit, result: AlgorithmResultHybridChaining) {
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

  private calculateFinalResult(skill: Skill, unit: Unit, result: AlgorithmResultHybridChaining) {
    result.physicalResult = result.physicalElementalDamages / this.opponentDef
      * result.averageWeaponVariance / 100 * result.finalVariance / 100;
    result.magicalResult = result.magicalElementalDamages / this.opponentSpr * result.finalVariance / 100;
    result.result = result.physicalResult + result.magicalResult;
  }

  private calculateDamageVariance(skill: Skill, unit: Unit, result: AlgorithmResultHybridChaining) {
    const right_hand: Equipment = unit.selectedBuild.equipments.right_hand;
    result.averageWeaponVariance = right_hand.isTwoHanded() ? (right_hand.variance_min + right_hand.variance_max) / 2 : 100;
    result.finalVariance = 92.5;
  }

  private calculateElementalResistances(skill: Skill, unit: Unit, result: AlgorithmResultHybridChaining) {
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

  private calculateBuffs(skill: Skill, unit: Unit, result: AlgorithmResultHybridChaining) {
    result.atk = unit.stats.atk.total;
    result.buffedAtk = result.atk;
    if (this.isSupportBuffing) {
      result.buffedAtk += unit.stats.atk.base * this.supportBuff / 100;
    }
    result.mag = unit.stats.mag.total;
    result.buffedMag = result.mag;
    if (this.isSupportBuffing) {
      result.buffedMag += unit.stats.mag.base * this.supportBuff / 100;
    }
  }

  private calculateCombosIncrement(skill: Skill, unit: Unit, result: AlgorithmResultHybridChaining) {
    let increment = 0.1;
    if (unit.selectedBuild.equipments.getWeaponsElements() && unit.selectedBuild.equipments.getWeaponsElements().length) {
      increment = increment + (0.2 * unit.selectedBuild.equipments.getWeaponsElements().length);
    }
    if (this.isSparkChain) {
      increment = increment + 0.15;
    }
    // TODO check skill elements when possible
    result.combosIncrement = increment;
  }

  private calculateMagicalDamages(skill: Skill, unit: Unit, result: AlgorithmResultHybridChaining) {
    result.magicalDamages = result.buffedMag * result.buffedMag * result.power / 200 * this.calculateLevelCorrection();
  }

  private calculatePhysicalDamages(skill: Skill, unit: Unit, result: AlgorithmResultHybridChaining) {
    const physicalDamages = unit.selectedBuild.equipments.isDualWielding()
      ? this.calculateRawDwDamages(unit, result) : this.calculateRawDhDamages(unit, result);
    result.physicalDamages = physicalDamages * result.power / 200 * this.calculateLevelCorrection();
  }

  private calculateRawDwDamages(unit: Unit, result: AlgorithmResultHybridChaining): number {
    result.isDualWielding = true;
    result.leftHandAtk = unit.selectedBuild.equipments.left_hand.atk;
    result.rightHandAtk = unit.selectedBuild.equipments.right_hand.atk;
    return (result.buffedAtk - result.leftHandAtk) * (result.buffedAtk - result.rightHandAtk);
  }

  private calculateRawDhDamages(unit: Unit, result: AlgorithmResultHybridChaining): number {
    result.isDualWielding = false;
    return result.buffedAtk * result.buffedAtk;
  }

  protected isExecutingTwice(skill: Skill, unit: Unit): boolean {
    return (skill.nb === 2 || unit.selectedBuild.equipments.isDualWielding()) && !skill.isLimitBreak;
  }
}
