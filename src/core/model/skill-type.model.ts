import {Unit} from './unit.model';

export interface SkillType {
  getCombosIncrementFromWeapons(unit: Unit): number;

  getActiveKillers(unit: Unit): number;
}
