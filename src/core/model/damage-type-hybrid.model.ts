import {ResultTurnDamages} from './result-turn-damages.model';
import {Unit} from './unit.model';
import {DamageType} from './damage-type.model';
import {DamageTypePhysical} from './damage-type-physical.model';
import {DamageTypeMagical} from './damage-type-magical.model';
import {Skill} from './skill.model';

export class DamageTypeHybrid extends DamageType {

  private physical: DamageTypePhysical;
  private magical: DamageTypeMagical;

  constructor() {
    super();
    this.physical = new DamageTypePhysical();
    this.magical = new DamageTypeMagical();
  }

  public calculateBuffs(unit: Unit, skill: Skill, isSupportBuffing: boolean, supportBuff: number, result: ResultTurnDamages) {
    this.physical.calculateBuffs(unit, skill, isSupportBuffing, supportBuff, result);
    this.magical.calculateBuffs(unit, skill, isSupportBuffing, supportBuff, result);
  }

  public calculateDamages(unit: Unit, result: ResultTurnDamages) {
    result.power /= 2;
    result.hitsPower = result.hitsPower.map(power => power / 2);
    this.physical.calculateDamages(unit, result);
    this.magical.calculateDamages(unit, result);
  }

  public calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, result: ResultTurnDamages) {
    this.physical.calculateKillerDamages(unit, isKillerActive, killer, result);
    this.magical.calculateKillerDamages(unit, isKillerActive, killer, result);
  }

  public calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultTurnDamages) {
    this.physical.calculateElementalDamages(unit, elements, result);
    this.magical.calculateElementalDamages(unit, elements, result);
  }

  public calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultTurnDamages) {
    this.physical.calculateFinalResult(unit, def, spr, result);
    this.magical.calculateFinalResult(unit, def, spr, result);
    result.result = result.physicalResult + result.magicalResult;
  }
}
