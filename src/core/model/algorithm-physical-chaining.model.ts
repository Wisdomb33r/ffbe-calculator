import {AlgorithmChaining} from './algorithm-chaining.model';
import {Skill} from './skill.model';
import {AlgorithmResult} from './algorithm-result.model';
import {AlgorithmResultPhysicalChaining} from './algorithm-result-physical-chaining.model';
import {isNullOrUndefined} from 'util';
import {Unit} from './unit.model';
import {Equipment} from './equipment.model';

export class AlgorithmPhysicalChaining extends AlgorithmChaining {

  public isSparkChain = false;
  public isSupportBuff = true;
  public supportBuffValue = 100;
  public opponentDef = 1000000;
  public opponentResistances: Array<number> = [-50, -50, -50, -50, -50, -50, -50, -50];

  public calculate(unit: Unit): AlgorithmResult {
    this.checkSkillsInput(unit.selectedBuild.skills);
    const result: AlgorithmResultPhysicalChaining = new AlgorithmResultPhysicalChaining();
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

  private calculateFinalResult(unit: Unit, result: AlgorithmResultPhysicalChaining) {
    result.result = result.elementalPreDefDamages / this.opponentDef * result.averageWeaponVariance / 100 * result.finalVariance / 100;
  }

  private calculateDamageVariance(unit: Unit, result: AlgorithmResultPhysicalChaining) {
    const right_hand: Equipment = unit.selectedBuild.equipments.right_hand;
    result.averageWeaponVariance = right_hand.isTwoHanded() ? (right_hand.variance_min + right_hand.variance_max) / 2 : 100;
    result.finalVariance = 92.5;
  }

  private calculateElementalResistances(unit: Unit, result: AlgorithmResultPhysicalChaining) {
    const elements: Array<number> = unit.selectedBuild.equipments.getWeaponsElements();
    // TODO check skill elements when possible
    if (elements && elements.length) {
      result.averageElementalResistance = elements
        .map((element: number) => this.opponentResistances[element - 1])
        .reduce((val1, val2) => val1 + val2, 0) / elements.length;
      result.elementalPreDefDamages = result.preDefDamages * (1 - result.averageElementalResistance / 100);
    } else {
      result.elementalPreDefDamages = result.preDefDamages;
    }
  }

  private calculateBuffs(unit: Unit, result: AlgorithmResultPhysicalChaining) {
    result.atk = unit.stats.atk.total;
    result.buffedAtk = result.atk;
    if (this.isSupportBuff) {
      result.buffedAtk += unit.stats.atk.base * this.supportBuffValue / 100;
    }
  }

  private calculateCombosIncrement(unit: Unit, result: AlgorithmResultPhysicalChaining) {
    let increment = 0.1;
    if (unit.selectedBuild.equipments.getWeaponsElements() && unit.selectedBuild.equipments.getWeaponsElements().length) {
      increment = increment + (0.2 * unit.selectedBuild.equipments.getWeaponsElements().length);
    }
    if (this.isSparkChain) {
      increment = increment + 0.2;
    }
    // TODO check skill elements when possible
    result.combosIncrement = increment;
  }

  private calculateDamages(unit: Unit, result: AlgorithmResultPhysicalChaining) {
    const rawDamages = unit.selectedBuild.equipments.isDualWielding()
      ? this.calculateRawDwDamages(unit, result) : this.calculateRawDhDamages(unit, result);
    result.preDefDamages = rawDamages * result.averageTurnPower / 100 * this.calculateLevelCorrection();
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

  private calculateLevelCorrection(): number {
    return 2;
  }

  private calculateAverageTurnPower(result: AlgorithmResultPhysicalChaining) {
    result.averageTurnPower = result.perTurnHitsPower
      .map((hitsPower: Array<number>) => hitsPower.reduce((val1, val2) => val1 + val2, 0))
      .reduce((val1, val2) => val1 + val2, 0) / result.perTurnHitsPower.length;
  }

  private calculatePerTurnHitsPower(unit: Unit, result: AlgorithmResultPhysicalChaining) {
    result.perTurnHitsPower = unit.selectedBuild.skills.map((skill: Skill) => this.calculateHitsPower(skill, unit, result));
  }

  private calculateHitsPower(skill: Skill, unit: Unit, result: AlgorithmResultPhysicalChaining): Array<number> {
    if (isNullOrUndefined(skill.hits) || skill.hits <= 1) {
      return [0];
    } else {
      const frames: Array<number> = skill.frames.split(' ').map((s: string) => +s);
      const damages: Array<number> = skill.damages.split(' ').map((s: string) => +s);
      const hitsPower: Array<number> = [];
      let chainCombos = 0;
      for (let i = 0; i < skill.hits; i++) {
        if (i > 0 && frames[i] - frames[i - 1] > 25) {
          chainCombos = 0;
        }
        hitsPower.push(skill.power * damages[i] / 100 * Math.min(4, 1 + chainCombos * result.combosIncrement * 2));
        chainCombos++;
      }
      // TODO chainCombos = 0 if the skill does not perfect chain (ie Beatrix)
      if ((skill.nb === 2 || unit.selectedBuild.equipments.isDualWielding()) && !skill.isLimitBreak) {
        for (let j = 0; j < skill.hits; j++) {
          hitsPower.push(skill.power * damages[j] / 100 * Math.min(4, 1 + (j + skill.hits) * result.combosIncrement * 2));
        }
      }
      return hitsPower;
    }
  }

  private checkSkillsInput(skills: Array<Skill>) {
    if (isNullOrUndefined(skills) || !Array.isArray(skills) || skills.length === 0) {
      throw new Error('Cannot calculate physical chaining without a skill list');
    } else {
      skills.forEach((skill: Skill) => this.checkSkillInput(skill));
    }
  }

  private checkSkillInput(skill: Skill) {
    if (skill.hits && skill.hits > 0) {
      const frames: Array<number> = skill.frames.split(' ').map((s: string) => +s);
      const damages: Array<number> = skill.damages.split(' ').map((s: string) => +s);
      if (frames.length !== skill.hits || damages.length !== skill.hits) {
        throw new Error('Cannot calculate physical chaining without proper frames and damages according to number of hits');
      }
    }
  }
}
