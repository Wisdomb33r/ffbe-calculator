import {AlgorithmChaining} from './algorithm-chaining.model';
import {Skill} from './skill.model';
import {AlgorithmResult} from './algorithm-result.model';
import {AlgorithmResultPhysicalChaining} from './algorithm-result-physical-chaining.model';
import {isNullOrUndefined} from 'util';
import {Unit} from './unit.model';

export class AlgorithmPhysicalChaining extends AlgorithmChaining {

  public isSparkChain = false;
  public opponentDef = 1000000;
  public opponentResistances: Array<number> = [-50, -50, -50, -50, -50, -50, -50, -50];

  public calculate(unit: Unit): AlgorithmResult {
    this.checkSkillsInput(unit.selectedBuild.skills);
    const result: AlgorithmResultPhysicalChaining = new AlgorithmResultPhysicalChaining();
    this.calculateCombosIncrement(unit, result);
    this.calculatePerTurnHitsPower(unit, result);
    this.calculateMeanTurnPower(result);
    this.calculateDamages(unit, result);
    result.result = result.preDefDamages / this.opponentDef;
    return result;
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
      ? this.calculateRawDwDamages(unit) : this.calculateRawDhDamages(unit);
    result.preDefDamages = rawDamages * result.meanTurnPower / 100 * this.calculateLevelCorrection();
  }

  private calculateRawDwDamages(unit: Unit): number {
    return (unit.stats.atk.total - unit.selectedBuild.equipments.right_hand.atk)
      * (unit.stats.atk.total - unit.selectedBuild.equipments.left_hand.atk);
  }

  private calculateRawDhDamages(unit: Unit): number {
    return unit.stats.atk.total * unit.stats.atk.total;
  }

  private calculateLevelCorrection(): number {
    return 2;
  }

  private calculateMeanTurnPower(result: AlgorithmResultPhysicalChaining) {
    result.meanTurnPower = result.perTurnHitsPower
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
      for (let i = 0; i < skill.hits; i++) {
        hitsPower.push(skill.power * damages[i] / 100 * Math.min(4, 1 + i * result.combosIncrement * 2));
      }
      if (skill.nb === 2 || unit.selectedBuild.equipments.isDualWielding()) {
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
