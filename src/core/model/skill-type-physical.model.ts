import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';
import {Skill} from './skill.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {KILLER_LIMIT_CAP} from '../calculator-constants';

export class SkillTypePhysical implements SkillType {
  public getSkillActiveKillers(skill: Skill, opponentKillerType: string, opponentKillerType2: string): number {
    if (opponentKillerType === 'unknown') {
      return skill.physical_killers ? skill.physical_killers.getKillerSum() : 0;
    } else {
      if (opponentKillerType2 === 'none') {
        return 10 * (skill.physical_killers ? skill.physical_killers[opponentKillerType] : 0);
      } else {
        const killerType1 = (skill.physical_killers ? skill.physical_killers[opponentKillerType] : 0);
        const killerType2 = (skill.physical_killers ? skill.physical_killers[opponentKillerType2] : 0);
        return 5 * (killerType1 + killerType2);
      }
    }
  }

  public getActiveKillers(unit: Unit, opponentKillerType: string, opponentKillerType2: string, result: ResultTurnDamages): number {
    if (opponentKillerType === 'unknown') {
      return unit.getPhysicalKillers() + unit.selectedBuild.esper.physical_killers.getKillerSum();
    } else {
      if (opponentKillerType2 === 'none') {
        let killerValue = unit.getPhysicalKiller(opponentKillerType) + unit.selectedBuild.esper.physical_killers[opponentKillerType];
        if (killerValue > KILLER_LIMIT_CAP) {
          result.isKillerLimitExceeded = true;
          killerValue = KILLER_LIMIT_CAP;
        }
        return 10 * killerValue;
      } else {
        let killerValueType1 =
          unit.getPhysicalKiller(opponentKillerType) + unit.selectedBuild.esper.physical_killers[opponentKillerType];
        if (killerValueType1 > KILLER_LIMIT_CAP) {
          result.isKillerLimitExceeded = true;
          killerValueType1 = KILLER_LIMIT_CAP;
        }
        let killerValueType2 =
          unit.getPhysicalKiller(opponentKillerType2) + unit.selectedBuild.esper.physical_killers[opponentKillerType2];
        if (killerValueType2 > KILLER_LIMIT_CAP) {
          result.isKillerLimitExceeded = true;
          killerValueType2 = KILLER_LIMIT_CAP;
        }
        return 5 * (killerValueType1 + killerValueType2);
      }
    }
  }

  public getElements(skill: Skill, unit: Unit): Array<number> {
    const elements = unit.selectedEquipmentSet.getWeaponsElements();
    if (Array.isArray(skill.elements) && skill.elements.length > 0) {
      skill.elements.forEach(element => {
        if (elements.indexOf(element) === -1) {
          elements.push(element);
        }
      });
    }
    return elements ? elements.sort((a, b) => a - b) : elements;
  }

  public getNumberOfExecutions(skill: Skill, unit: Unit): number {
    if (skill.nb >= 2) {
      return skill.nb;
    }
    const isMultiSkill = unit.selectedBuild.isMultiSkill(skill);
    return unit.selectedEquipmentSet.isDualWielding() && !skill.isDwBlocked && !skill.isLimitBreak && !isMultiSkill ? 2 : 1;
  }
}
