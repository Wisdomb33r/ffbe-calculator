import {ResultChaining} from './result-chaining.model';
import {Unit} from './unit.model';
import {DamageType} from './damage-type.model';
import {DamageTypePhysical} from './damage-type-physical.model';
import {DamageTypeMagical} from './damage-type-magical.model';

export class DamageTypeHybrid extends DamageType {

  private physical: DamageTypePhysical;
  private magical: DamageTypeMagical;

  constructor() {
    super();
    this.physical = new DamageTypePhysical();
    this.magical = new DamageTypeMagical();
  }

  public calculateBuffs(unit: Unit, isSupportBuffing: boolean, supportBuff: number, result: ResultChaining) {
    this.physical.calculateBuffs(unit, isSupportBuffing, supportBuff, result);
    this.magical.calculateBuffs(unit, isSupportBuffing, supportBuff, result);
  }

  public calculateDamages(unit: Unit, result: ResultChaining) {
    result.power /= 2;
    result.hitsPower = result.hitsPower.map(power => power / 2);
    this.physical.calculateDamages(unit, result);
    this.magical.calculateDamages(unit, result);
  }

  public calculateKillerDamages(unit: Unit, killer: number, result: ResultChaining) {
    this.physical.calculateKillerDamages(unit, killer, result);
    this.magical.calculateKillerDamages(unit, killer, result);
  }
}
