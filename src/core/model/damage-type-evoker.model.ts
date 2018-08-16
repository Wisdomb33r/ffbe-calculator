import {Unit} from './unit.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {DamageTypeMagical} from './damage-type-magical.model';
import {Skill} from './skill.model';

export class DamageTypeEvoker extends DamageTypeMagical {

  public calculateBuffs(unit: Unit, skill: Skill, isSupportBuffing: boolean, supportBuff: number, result: ResultTurnDamages) {
    this.calculationStat = 'spr';
    super.calculateBuffs(unit, skill, isSupportBuffing, supportBuff, result);
    this.calculationStat = 'mag';
    super.calculateBuffs(unit, skill, isSupportBuffing, supportBuff, result);
    result.evo = unit.stats.evo.total;
    result.damageAlgorithm = 'evoker';
  }

  calculateDamages(unit: Unit, result: ResultTurnDamages) {
    result.magicalDamages = (result['buffed_mag'] * result['buffed_mag'] + result['buffed_spr'] * result['buffed_spr']) / 2
      * (1 + result.evo / 100) * result.power / 100 * result.levelCorrection;
  }
}
