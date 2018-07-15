import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';

export class SkillTypePhysical implements SkillType {
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
        return 10 * (unit.getPhysicalKiller(opponentKillerType) + unit.selectedBuild.esper.physical_killers[opponentKillerType]);
      default:
        return unit.getPhysicalKillers() + unit.selectedBuild.esper.physical_killers.getKillerSum();
    }
  }

  public getElements(skill: Skill, unit: Unit): Array<number> {
    const elements = unit.selectedBuild.equipments.getWeaponsElements();
    if (Array.isArray(skill.elements) && skill.elements.length > 0) {
      skill.elements.forEach(element => {
        if (elements.indexOf(element) === -1) {
          elements.push(element);
        }
      });
    }
    return elements ? elements.sort() : elements;
  }

  public isExecutingTwice(skill: Skill, unit: Unit): boolean {
    return (skill.nb === 2 || unit.selectedBuild.equipments.isDualWielding()) && !skill.isLimitBreak;
  }
}
