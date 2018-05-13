import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';

export class SkillTypeMagical implements SkillType {
  public getActiveKillers(unit: Unit): number {
    return unit.getMagicalKillers();
  }

  public getElements(skill: Skill, unit: Unit): Array<number> {
    return skill.elements;
  }

  public isExecutingTwice(skill: Skill, unit: Unit): boolean {
    return skill.nb === 2;
  }
}
