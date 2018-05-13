import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';

export class SkillTypePhysical implements SkillType {
  public getActiveKillers(unit: Unit): number {
    return unit.getPhysicalKillers();
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
    return elements;
  }

  public isExecutingTwice(skill: Skill, unit: Unit): boolean {
    return (skill.nb === 2 || unit.selectedBuild.equipments.isDualWielding()) && !skill.isLimitBreak;
  }
}
