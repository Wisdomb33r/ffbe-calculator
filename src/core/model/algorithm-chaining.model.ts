import {Algorithm} from './algorithm.model';
import {AlgorithmResult} from './algorithm-result.model';
import {Unit} from './unit.model';
import {isNullOrUndefined} from 'util';
import {Skill} from './skill.model';

export abstract class AlgorithmChaining implements Algorithm {
  public abstract calculate(unit: Unit): AlgorithmResult;

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
