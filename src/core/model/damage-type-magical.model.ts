import {DamageType} from './damage-type.model';
import {isNullOrUndefined} from 'util';
import {Unit} from './unit.model';
import {ResultTurnDamages} from './result-turn-damages.model';

export class DamageTypeMagical extends DamageType {

  constructor(calculation_stat?: string) {
    super();
    if (!isNullOrUndefined(calculation_stat) && ['atk', 'mag', 'def', 'spr'].indexOf(calculation_stat) > -1) {
      this.calculationStat = calculation_stat;
    } else {
      this.calculationStat = 'mag';
    }
  }

  public calculateDamages(unit: Unit, result: ResultTurnDamages) {
    result.magicalDamages = result['buffed_' + this.calculationStat] * result['buffed_' + this.calculationStat]
      * result.power / 100 * result.levelCorrection;
    result.magicalStat = this.calculationStat;
  }

  public calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, killerActive: number, result: ResultTurnDamages) {
    result.killerPassive = 0;
    result.killerActive = 0;
    result.magicalKillerDamages = result.magicalDamages;
    if ((killer || killerActive) && isKillerActive) {
      result.killerPassive = killer;
      result.killerActive = killerActive;
      result.magicalKillerDamages *= (1 + (killer + killerActive) / 1000);
    }
  }

  public calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultTurnDamages) {
    result.elements = elements;
    result.magicalElementalDamages = result.magicalKillerDamages;
    if (elements && elements.length) {
      result.averageElementalResistance = elements
        .map((element: number) => result.resistances[element - 1])
        .reduce((val1, val2) => val1 + val2, 0) / elements.length;
      result.magicalElementalDamages = result.magicalKillerDamages * (1 - result.averageElementalResistance / 100);
    }
  }

  public calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultTurnDamages) {
    this.calculateDamageVariance(unit, result);
    result.magicalResult = result.magicalElementalDamages / spr * result.finalVariance / 100;
    result.result = result.magicalResult;
  }

  private calculateDamageVariance(unit: Unit, result: ResultTurnDamages) {
    result.finalVariance = 92.5;
  }
}
