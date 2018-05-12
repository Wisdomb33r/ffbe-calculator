import {SkillType} from './skill-type.model';
import {Unit} from './unit.model';

export class SkillTypePhysical implements SkillType {
  public getCombosIncrementFromWeapons(unit: Unit): number {
    if (unit.selectedBuild.equipments.getWeaponsElements() && unit.selectedBuild.equipments.getWeaponsElements().length) {
      return 0.2 * unit.selectedBuild.equipments.getWeaponsElements().length;
    }
    return 0;
  }

  public getActiveKillers(unit: Unit): number {
    return unit.getPhysicalKillers();
  }
}
