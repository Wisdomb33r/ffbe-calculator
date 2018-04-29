import {AlgorithmChaining} from './algorithm-chaining.model';
import {Skill} from './skill.model';
import {AlgorithmResult} from './algorithm-result.model';
import {AlgorithmResultPhysicalChaining} from './algorithm-result-physical-chaining.model';
import {isNullOrUndefined} from 'util';
import {Unit} from './unit.model';

export class AlgorithmPhysicalChaining extends AlgorithmChaining {

  public opponentDef = 100000;
  public opponentResistances: Array<number> = [-50, -50, -50, -50, -50, -50, -50, -50];

  public calculate(unit: Unit): AlgorithmResult {
    this.checkSkillsInput(unit.selectedBuild.skills);
    const result: AlgorithmResultPhysicalChaining = new AlgorithmResultPhysicalChaining();
    this.calculatePerTurnHitsPower(unit, result);
    this.calculateMeanTurnPower(result);
    this.calculateDamages(unit, result);
    result.result = result.preDefDamages / this.opponentDef;
    return result;
  }

  private calculateDamages(unit: Unit, result: AlgorithmResultPhysicalChaining) {
    const rawDamages = unit.selectedBuild.equipments.left_hand && unit.selectedBuild.equipments.left_hand.isWeapon()
      ? this.calculateRawDwDamages(unit) : this.calculateRawDhDamages(unit);
    result.preDefDamages = rawDamages * result.meanTurnPower / 2 / 100 * this.calculateLevelCorrection();
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
    result.perTurnHitsPower = unit.selectedBuild.skills.map((skill: Skill) => this.calculateHitsPower(skill, unit));
  }

  private calculateHitsPower(skill: Skill, unit: Unit): Array<number> {
    const comboIncrement = 0.3; // TODO determine combo increment for neutral, elemental and spark chains
    if (isNullOrUndefined(skill.hits) || skill.hits <= 1) {
      return [0];
    } else {
      const frames: Array<number> = skill.frames.split(' ').map((s: string) => +s);
      const damages: Array<number> = skill.damages.split(' ').map((s: string) => +s);
      if (frames.length !== skill.hits || damages.length !== skill.hits) {
        throw new Error('Cannot calculate physical chaining without proper frames and damages according to number of hits');
      }
      const hitsPower: Array<number> = [];
      for (let i = 0; i < skill.hits; i++) {
        hitsPower.push(skill.power * damages[i] / 100 * Math.min(4, 1 + i * comboIncrement * 2));
      }
      if (skill.nb === 2 || unit.selectedBuild.equipments.isDualWielding()) {
        for (let j = 0; j < skill.hits; j++) {
          hitsPower.push(skill.power * damages[j] / 100 * Math.min(4, 1 + (j + skill.hits) * comboIncrement * 2));
        }
      }
      return hitsPower;
    }
  }

  private checkSkillsInput(skills: Array<Skill>) {
    if (isNullOrUndefined(skills) || !Array.isArray(skills) || skills.length === 0) {
      throw new Error('Cannot calculate physical chaining without a skill list');
    }
  }
}
