import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';

export class SkillTypeMagical implements SkillType {
  public getActiveKillers(unit: Unit, opponentKillerType: string): number {
    switch (opponentKillerType) {
      case 'aquatic':
      case 'beast':
      case 'bird':
      case 'demon':
      case 'dragon':
      case 'fairy':
      case 'human':
      case 'insect':
      case 'machine':
      case 'plant':
      case 'stone':
      case 'undead':
        return unit.getMagicalKiller(opponentKillerType) + unit.selectedBuild.esper.magical_killers[opponentKillerType];
      default:
        return unit.getMagicalKillers() + unit.selectedBuild.esper.magical_killers.getKillerSum();
    }
  }

  public getElements(skill: Skill, unit: Unit): Array<number> {
    return skill.elements ? skill.elements.sort() : skill.elements;
  }

  public isExecutingTwice(skill: Skill, unit: Unit): boolean {
    return skill.nb === 2;
  }
}
