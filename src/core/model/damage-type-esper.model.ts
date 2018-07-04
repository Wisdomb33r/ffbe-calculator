import {DamageType} from './damage-type.model';
import {Unit} from './unit.model';
import {ResultChaining} from './result-chaining.model';
import {Esper} from './esper.model';
import {DamageTypeEsperPhysical} from './damage-type-esper-physical.model';
import {DamageTypeEsperMagical} from './damage-type-esper-magical.model';
import {Skill} from './skill.model';

export class DamageTypeEsper extends DamageType {

  private damageType: DamageType;

  public calculateLevelCorrection(unit: Unit) {
    return 1 + unit.selectedBuild.esper.level / 100;
  }

  public calculateBuffs(unit: Unit, skill: Skill, isSupportBuffing: boolean, supportBuff: number, result: ResultChaining) {
    result.atk = unit.selectedBuild.esper.atk;
    result.mag = unit.selectedBuild.esper.mag;
    result.def = unit.selectedBuild.esper.def;
    result.spr = unit.selectedBuild.esper.spr;
    result.evo = unit.stats.evo.total;
    result.esperDamageModifier = unit.selectedBuild.esper.damage_modifier;
  }

  public calculateDamages(unit: Unit, result: ResultChaining) {
    result.levelCorrection = 1 + unit.selectedBuild.esper.level / 100; // TODO move this in calculateLevelCorrection
    switch (unit.selectedBuild.esper.damageType) {
      case 'physical':
        this.calculatePhysicalDamages(unit, result);
        this.damageType = new DamageTypeEsperPhysical();
        break;
      case 'magical':
        this.calculateMagicalDamages(unit, result);
        this.damageType = new DamageTypeEsperMagical();
        break;
    }
  }

  public calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, result: ResultChaining) {
    this.damageType.calculateKillerDamages(unit, isKillerActive, killer, result);
  }

  public calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultChaining) {
    this.damageType.calculateElementalDamages(unit, elements, result);
  }

  public calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultChaining) {
    this.damageType.calculateFinalResult(unit, def, spr, result);
  }

  private calculatePhysicalDamages(unit: Unit, result: ResultChaining) {
    const esper: Esper = unit.selectedBuild.esper;
    const base = Math.floor((esper.atk + esper.def + esper.mag / 2 + esper.spr / 2) / 100 * (1 + unit.stats.evo.total / 100));
    result.physicalDamages = Math.pow(base, 2) * result.power * esper.damage_modifier;
  }

  private calculateMagicalDamages(unit: Unit, result: ResultChaining) {
    const esper: Esper = unit.selectedBuild.esper;
    const base = Math.floor((esper.mag + esper.spr + esper.atk / 2 + esper.def / 2) / 100 * (1 + unit.stats.evo.total / 10));
    result.magicalDamages = Math.pow(base, 2) * result.power * esper.damage_modifier;
  }
}
