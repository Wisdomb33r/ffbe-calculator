import {DamageType} from './damage-type.model';
import {isNullOrUndefined} from 'util';
import {Unit} from './unit.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {Equipment} from './equipment.model';

export class DamageTypePhysical extends DamageType {

  constructor(calculation_stat?: string) {
    super();
    if (!isNullOrUndefined(calculation_stat) && ['atk', 'mag', 'def', 'spr'].indexOf(calculation_stat) > -1) {
      this.calculationStat = calculation_stat;
    } else {
      this.calculationStat = 'atk';
    }
  }

  public calculateDamages(unit: Unit, result: ResultTurnDamages) {
    const rawDamages = unit.selectedBuild.equipments.isDualWielding()
      ? this.calculateDwDamages(unit, result) : this.calculateDhDamages(unit, result);
    result.physicalDamages = rawDamages * result.power / 100 * result.levelCorrection;
  }

  public calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, result: ResultTurnDamages) {
    result.killerPassive = 0;
    result.physicalKillerDamages = result.physicalDamages;
    if (killer && isKillerActive) {
      result.killerPassive = killer;
      result.physicalKillerDamages *= (1 + result.killerPassive / 1000);
    }
  }

  public calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultTurnDamages) {
    result.elements = elements;
    result.physicalElementalDamages = result.physicalKillerDamages;
    if (elements && elements.length) {
      result.averageElementalResistance = elements
        .map((element: number) => result.resistances[element - 1])
        .reduce((val1, val2) => val1 + val2, 0) / elements.length;
      result.physicalElementalDamages = result.physicalKillerDamages * (1 - result.averageElementalResistance / 100);
    }
  }

  public calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultTurnDamages) {
    this.calculateDamageVariance(unit, result);
    result.physicalResult = result.physicalElementalDamages / def * result.averageWeaponVariance / 100 * result.finalVariance / 100;
    result.result = result.physicalResult;
  }

  protected calculateDamageVariance(unit: Unit, result: ResultTurnDamages) {
    const right_hand: Equipment = unit.selectedBuild.equipments.right_hand;
    result.averageWeaponVariance = right_hand.isTwoHanded() ? (right_hand.variance_min + right_hand.variance_max) / 2 : 100;
    result.finalVariance = 92.5;
  }

  protected calculateDwDamages(unit: Unit, result: ResultTurnDamages): number {
    result.isDualWielding = true;
    result.leftHandStat = unit.selectedBuild.equipments.left_hand[this.calculationStat];
    result.rightHandStat = unit.selectedBuild.equipments.right_hand[this.calculationStat];
    return (result['buffed_' + this.calculationStat] - result.leftHandStat)
      * (result['buffed_' + this.calculationStat] - result.rightHandStat);
  }

  protected calculateDhDamages(unit: Unit, result: ResultTurnDamages): number {
    result.isDualWielding = false;
    return result['buffed_' + this.calculationStat] * result['buffed_' + this.calculationStat];
  }
}
