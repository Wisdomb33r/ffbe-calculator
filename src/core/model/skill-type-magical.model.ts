import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';

export class SkillTypeMagical implements SkillType {
  public getActiveKillers(unit: Unit, opponentKillerType: string, opponentKillerType2: string): number {
    switch (opponentKillerType) {
      case 'unknown':
        return unit.getMagicalKillers() + unit.selectedBuild.esper.magical_killers.getKillerSum();
      default:
        switch (opponentKillerType2) {
          case 'none':
            return 10 * (unit.getMagicalKiller(opponentKillerType) + unit.selectedBuild.esper.magical_killers[opponentKillerType]);
          default:
            return 5 * (
              unit.getMagicalKiller(opponentKillerType) + unit.selectedBuild.esper.magical_killers[opponentKillerType]
              + unit.getMagicalKiller(opponentKillerType2) + unit.selectedBuild.esper.magical_killers[opponentKillerType2]
            );
        }
    }
  }

  public getElements(skill: Skill, unit: Unit): Array<number> {
    return skill.elements ? skill.elements.sort() : skill.elements;
  }

  public isExecutingTwice(skill: Skill, unit: Unit): boolean {
    return skill.nb === 2;
  }
}
