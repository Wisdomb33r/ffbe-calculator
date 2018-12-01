import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';
import {ResultTurnDamages} from './result-turn-damages.model';

export class SkillTypeFixed implements SkillType {
  getSkillActiveKillers(skill: Skill, opponentKillerType: string, opponentKillerType2: string): number {
    return 0;
  }

  getActiveKillers(unit: Unit, opponentKillerType: string, opponentKillerType2: string, result: ResultTurnDamages): number {
    return 0;
  }

  getElements(skill: Skill, unit: Unit): Array<number> {
    return skill.isEsper ? unit.selectedBuild.esper.elements : skill.elements;
  }

  getNumberOfExecutions(skill: Skill, unit: Unit): number {
    return skill.nb ? skill.nb : 1;
  }

}
