import {Unit} from './unit.model';
import {Skill} from './skill.model';
import {ResultTurnDamages} from './result-turn-damages.model';

export interface SkillType {
  getActiveKillers(unit: Unit, opponentKillerType: string, opponentKillerType2: string, result: ResultTurnDamages): number;

  getElements(skill: Skill, unit: Unit): Array<number>;

  getNumberOfExecutions(skill: Skill, unit: Unit): number;
}
