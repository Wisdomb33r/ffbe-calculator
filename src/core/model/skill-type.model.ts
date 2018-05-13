import {Unit} from './unit.model';
import {Skill} from './skill.model';

export interface SkillType {
  getActiveKillers(unit: Unit): number;

  getElements(skill: Skill, unit: Unit): Array<number>;

  isExecutingTwice(skill: Skill, unit: Unit): boolean;
}
