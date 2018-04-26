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
    const perTurnPower: Array<number> = this.calculatePerTurnPower(unit.selectedBuild.skills);
    result.meanTurnPower = this.calculateMeanTurnPower(perTurnPower);
    result.preDefDamages = this.calculateDamages(unit, result.meanTurnPower);
    result.result = result.preDefDamages / this.opponentDef;
    return result;
  }

  private calculateDamages(unit: Unit, meanTurnPower: number) {
    const rawDamages = unit.selectedBuild.equipments.left_hand && unit.selectedBuild.equipments.left_hand.isWeapon()
      ? this.calculateRawDwDamages(unit) : this.calculateRawDhDamages(unit);
    return rawDamages * meanTurnPower / 100 * this.calculateLevelCorrection();
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

  private calculateMeanTurnPower(perTurnPower: Array<number>) {
    return perTurnPower.reduce((val1, val2) => val1 + val2, 0) / perTurnPower.length;
  }

  private calculatePerTurnPower(skills: Array<Skill>): Array<number> {
    return skills.map((skill: Skill) => this.calculatePower(skill));
  }

  private calculatePower(skill: Skill, comboIncrement = 0.3): number {
    if (isNullOrUndefined(skill.hits) || skill.hits <= 1) {
      return skill.power ? skill.power : 0;
    } else {
      const frames: Array<number> = skill.frames.split(' ').map((s: string) => +s);
      const damages: Array<number> = skill.damages.split(' ').map((s: string) => +s);
      if (frames.length !== skill.hits || damages.length !== skill.hits) {
        throw new Error('Cannot calculate physical chaining without proper frames and damages according to number of hits');
      }
      let power: number = 0;
      for (let i = 0; i < skill.hits; i++) {
        power = power + skill.power * damages[i] / 100 * Math.min(4, 1 + i * comboIncrement * 2);
      }
      return power;
    }
  }

  private checkSkillsInput(skills: Array<Skill>) {
    if (isNullOrUndefined(skills) || !Array.isArray(skills) || skills.length === 0) {
      throw new Error('Cannot calculate physical chaining without a skill list');
    }
  }
}
