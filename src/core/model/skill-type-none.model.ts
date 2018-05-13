import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';

export class SkillTypeNone implements SkillType {
  getActiveKillers(unit: Unit): number {
    return 0;
  }

  getElements(skill: Skill, unit: Unit): Array<number> {
    return undefined;
  }

  isExecutingTwice(skill: Skill, unit: Unit): boolean {
    return false;
  }

}
