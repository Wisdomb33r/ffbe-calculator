import {DamageType} from './damage-type.model';
import {Unit} from './unit.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {DamageTypeEsperPhysical} from './damage-type-esper-physical.model';
import {DamageTypeEsperMagical} from './damage-type-esper-magical.model';
import {Skill} from './skill.model';

export class DamageTypeEsper extends DamageType {

  private damageType: DamageType;

  public calculateLevelCorrection(unit: Unit, result: ResultTurnDamages) {
    result.levelCorrection = 1 + unit.selectedBuild.esper.level / 100;
  }

  public calculateBuffs(unit: Unit, skill: Skill, isSupportBuffing: boolean, supportBuff: number, result: ResultTurnDamages) {
    result.atk = unit.selectedBuild.esper.atk;
    result.mag = unit.selectedBuild.esper.mag;
    result.def = unit.selectedBuild.esper.def;
    result.spr = unit.selectedBuild.esper.spr;
    result.evo = unit.stats.evo.total;
    result.esperDamageModifier = unit.getEsperDamageModifier();
  }

  public calculateDamages(unit: Unit, result: ResultTurnDamages) {
    switch (unit.selectedBuild.esper.damageType) {
      case 'physical':
        this.calculatePhysicalDamages(unit, result);
        this.damageType = new DamageTypeEsperPhysical();
        break;
      case 'magical':
        this.calculateMagicalDamages(unit, result);
        this.damageType = new DamageTypeEsperMagical();
        break;
      default:
        result.magicalDamages = 0;
        result.magicalKillerDamages = 0;
        result.magicalResult = 0;
        break;
    }
  }

  public calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, killerActive: number, result: ResultTurnDamages) {
    this.damageType.calculateKillerDamages(unit, isKillerActive, killer, killerActive, result);
  }

  public calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultTurnDamages) {
    this.damageType.calculateElementalDamages(unit, elements, result);
  }

  public calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultTurnDamages) {
    this.damageType.calculateFinalResult(unit, def, spr, result);
  }

  private calculatePhysicalDamages(unit: Unit, result: ResultTurnDamages) {
    const base = Math.floor((result.atk + result.def + result.mag / 2 + result.spr / 2) / 100 * (1 + unit.stats.evo.total / 100));
    result.physicalDamages = Math.pow(base, 2) * result.power * result.esperDamageModifier / 100 * result.levelCorrection;
  }

  private calculateMagicalDamages(unit: Unit, result: ResultTurnDamages) {
    const base = Math.floor((result.mag + result.spr + result.atk / 2 + result.def / 2) / 100 * (1 + unit.stats.evo.total / 100));
    result.magicalDamages = Math.pow(base, 2) * result.power * result.esperDamageModifier / 100 * result.levelCorrection;
  }
}
