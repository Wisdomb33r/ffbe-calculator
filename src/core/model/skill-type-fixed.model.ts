import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';

export class SkillTypeFixed implements SkillType {
  getActiveKillers(unit: Unit): number {
    return 0;
  }

  getElements(skill: Skill, unit: Unit): Array<number> {
    return skill.isEsper ? unit.selectedBuild.esper.elements : skill.elements;
  }

  isExecutingTwice(skill: Skill, unit: Unit): boolean {
    return false;
  }

}
