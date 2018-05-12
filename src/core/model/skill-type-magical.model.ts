import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';

export class SkillTypeMagical implements SkillType {
  public getCombosIncrementFromWeapons(unit: Unit): number {
    return 0;
  }

  public getActiveKillers(unit: Unit): number {
    return unit.getMagicalKillers();
  }
}
