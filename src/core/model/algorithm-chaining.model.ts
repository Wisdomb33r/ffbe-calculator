import {Algorithm} from './algorithm.model';
import {AlgorithmResult} from './algorithm-result.model';
import {Unit} from './unit.model';
import {isNullOrUndefined} from 'util';
import {Skill} from './skill.model';
import {AlgorithmResultChaining} from './algorithm-result-chaining.model';

export abstract class AlgorithmChaining implements Algorithm {
  public abstract calculate(unit: Unit): AlgorithmResult;

  protected abstract isExecutingTwice(skill: Skill, unit: Unit): boolean;

  protected calculatePerTurnHitsPower(unit: Unit, result: AlgorithmResultChaining) {
    result.perTurnHitsPower = unit.selectedBuild.skills.map((skill: Skill) => this.calculateHitsPower(skill, unit, result));
  }

  protected calculateHitsPower(skill: Skill, unit: Unit, result: AlgorithmResultChaining): Array<number> {
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
      if (this.isExecutingTwice(skill, unit)) {
        for (let j = 0; j < skill.hits; j++) {
          if (j > 0 && frames[j] - frames[j - 1] > 25) {
            chainCombos = 0;
          }
          hitsPower.push(skill.power * damages[j] / 100 * Math.min(4, 1 + chainCombos * result.combosIncrement * 2));
          chainCombos++;
        }
      }
      return hitsPower;
    }
  }

  protected calculateLevelCorrection(): number {
    return 2;
  }

  protected checkSkillsInput(skills: Array<Skill>) {
    if (isNullOrUndefined(skills) || !Array.isArray(skills) || skills.length === 0) {
      throw new Error('Cannot calculate chaining without a skill list');
    } else {
      skills.forEach((skill: Skill) => this.checkSkillInput(skill));
    }
  }

  protected checkSkillInput(skill: Skill) {
    if (skill.hits && skill.hits > 0) {
      const frames: Array<number> = skill.frames.split(' ').map((s: string) => +s);
      const damages: Array<number> = skill.damages.split(' ').map((s: string) => +s);
      if (frames.length !== skill.hits || damages.length !== skill.hits) {
        throw new Error('Cannot calculate chaining without proper frames and damages according to number of hits');
      }
    }
  }
}
