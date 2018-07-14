import {DamageTypePhysical} from './damage-type-physical.model';
import {Unit} from './unit.model';
import {ResultTurnDamages} from './result-turn-damages.model';

export class DamageTypeEsperPhysical extends DamageTypePhysical {
  public calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultTurnDamages) {
    this.calculateDamageVariance(unit, result);
    result.physicalResult = result.physicalElementalDamages / def * result.finalVariance / 100;
    result.result = result.physicalResult;
  }

  protected calculateDamageVariance(unit: Unit, result: ResultTurnDamages) {
    result.finalVariance = 92.5;
  }
}
