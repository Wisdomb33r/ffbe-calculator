import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {KILLER_LIMIT_CAP} from '../calculator-constants';

export class SkillTypeMagical implements SkillType {
  public getSkillActiveKillers(skill: Skill, opponentKillerType: string, opponentKillerType2: string): number {
    switch (opponentKillerType) {
      case 'unknown':
        return skill.magical_killers ? skill.magical_killers.getKillerSum() : 0;
      default:
        switch (opponentKillerType2) {
          case 'none':
            return 10 * (skill.magical_killers ? skill.magical_killers[opponentKillerType] : 0);
          default:
            const killerType1 = (skill.magical_killers ? skill.magical_killers[opponentKillerType] : 0);
            const killerType2 = (skill.magical_killers ? skill.magical_killers[opponentKillerType2] : 0);
            return 5 * (killerType1 + killerType2);
        }
    }
  }

  public getActiveKillers(unit: Unit, opponentKillerType: string, opponentKillerType2: string, result: ResultTurnDamages): number {
    switch (opponentKillerType) {
      case 'unknown':
        return unit.getMagicalKillers() + unit.selectedBuild.esper.magical_killers.getKillerSum();
      default:
        switch (opponentKillerType2) {
          case 'none':
            let killerValue = unit.getMagicalKiller(opponentKillerType) + unit.selectedBuild.esper.magical_killers[opponentKillerType];
            if (killerValue > KILLER_LIMIT_CAP) {
              result.isKillerLimitExceeded = true;
              killerValue = KILLER_LIMIT_CAP;
            }
            return 10 * killerValue;
          default:
            let killerValueType1 = unit.getMagicalKiller(opponentKillerType) + unit.selectedBuild.esper.magical_killers[opponentKillerType];
            if (killerValueType1 > KILLER_LIMIT_CAP) {
              result.isKillerLimitExceeded = true;
              killerValueType1 = KILLER_LIMIT_CAP;
            }
            let killerValueType2 =
              unit.getMagicalKiller(opponentKillerType2) + unit.selectedBuild.esper.magical_killers[opponentKillerType2];
            if (killerValueType2 > KILLER_LIMIT_CAP) {
              result.isKillerLimitExceeded = true;
              killerValueType2 = KILLER_LIMIT_CAP;
            }
            return 5 * (killerValueType1 + killerValueType2);
        }
    }
  }

  public getElements(skill: Skill, unit: Unit): Array<number> {
    return skill.elements ? skill.elements.sort((a, b) => a - b) : skill.elements;
  }

  public getNumberOfExecutions(skill: Skill, unit: Unit): number {
    return skill.nb ? skill.nb : 1;
  }
}
