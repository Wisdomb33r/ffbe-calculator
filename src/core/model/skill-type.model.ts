import {Unit} from './unit.model';
import {Skill} from './skill.model';

export interface SkillType {
  getActiveKillers(unit: Unit, opponentKillerType: string): number;

  getElements(skill: Skill, unit: Unit): Array<number>;

  isExecutingTwice(skill: Skill, unit: Unit): boolean;
}
