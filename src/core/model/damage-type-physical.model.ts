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
    const rawDamages = unit.selectedEquipmentSet.isDualWielding()
      ? this.calculateDwDamages(unit, result) : this.calculateDhDamages(unit, result);
    result.physicalDamages = rawDamages * result.power / 100 * result.levelCorrection;
    result.physicalStat = this.calculationStat;
  }

  public calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, killerActive: number, result: ResultTurnDamages) {
    result.killerPassive = 0;
    result.killerActive = 0;
    result.physicalKillerDamages = result.physicalDamages;
    if ((killer || killerActive) && isKillerActive) {
      result.killerPassive = killer;
      result.killerActive = killerActive;
      result.physicalKillerDamages *= (1 + (killer + killerActive) / 1000);
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
    result.physicalResult = result.physicalElementalDamages / def * result.averageWeaponVariance / 100 * result.finalVariance / 100
      * result.enemyWeaponVariance;
    result.result = result.physicalResult;
  }

  protected calculateDamageVariance(unit: Unit, result: ResultTurnDamages) {
    const right_hand: Equipment = unit.selectedEquipmentSet.right_hand;
    const left_hand: Equipment = unit.selectedEquipmentSet.left_hand;
    result.averageWeaponVariance = 100;
    if (right_hand && right_hand.minVariance && right_hand.maxVariance) {
      result.averageWeaponVariance = (right_hand.minVariance + right_hand.maxVariance) / 2;
    }
    if (result.isDualWielding) {
      const mainHandStat = right_hand && right_hand[this.calculationStat] ? right_hand[this.calculationStat] : 0;
      const offHandStat = left_hand && left_hand[this.calculationStat] ? left_hand[this.calculationStat] : 0;
      result.enemyWeaponVariance = Math.log((mainHandStat + offHandStat) / 2 + 5 + 25) / Math.log(185);
    } else if (right_hand) {
      const mainHandStat = right_hand[this.calculationStat] ? right_hand[this.calculationStat] : 0;
      result.enemyWeaponVariance = Math.log(mainHandStat + 5) / Math.log(185);
    } else {
      result.enemyWeaponVariance = 1;
    }
    result.finalVariance = 92.5;
  }

  protected calculateDwDamages(unit: Unit, result: ResultTurnDamages): number {
    result.isDualWielding = true;
    result.leftHandStat = unit.selectedEquipmentSet.left_hand[this.calculationStat];
    result.rightHandStat = unit.selectedEquipmentSet.right_hand[this.calculationStat];
    if (result.skill.isLimitBreak) {
      return this.calculateDwLbDamages(unit, result);
    } else {
      return this.calculateDwAbilityDamages(unit, result);
    }
  }

  protected calculateDwLbDamages(unit, result): number {
    if (result.leftHandStat > result.rightHandStat) {
      result.leftHandStat = result.rightHandStat;
    } else {
      result.rightHandStat = result.leftHandStat;
    }
    return (result['buffed_' + this.calculationStat] - result.leftHandStat)
      * (result['buffed_' + this.calculationStat] - result.rightHandStat);
  }

  protected calculateDwAbilityDamages(unit: Unit, result: ResultTurnDamages): number {
    const isMultiSkill = unit.selectedBuild.isMultiSkill(result.skill);
    if (isMultiSkill) {
      result.rightHandStat = result.leftHandStat;
    }
    return (result['buffed_' + this.calculationStat] - result.leftHandStat)
      * (result['buffed_' + this.calculationStat] - result.rightHandStat);
  }

  protected calculateDhDamages(unit: Unit, result: ResultTurnDamages): number {
    result.isDualWielding = false;
    return result['buffed_' + this.calculationStat] * result['buffed_' + this.calculationStat];
  }
}
