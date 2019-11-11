import {Unit} from './unit.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {Skill} from './skill.model';

export abstract class DamageType {

  public calculationStat: string;

  public calculateBuffs(unit: Unit, skill: Skill, isSupportBuffing: boolean, supportBuff: number, result: ResultTurnDamages) {
    result[this.calculationStat] = unit.stats[this.calculationStat].total;
    result['buffed_' + this.calculationStat] = unit.stats[this.calculationStat].total;
    result.selfBuff = skill[this.calculationStat + 'Buff'] ? skill[this.calculationStat + 'Buff'] : 0;
    const specialSelfBuff = this.getSpecialSelfBuff(unit, skill, this.calculationStat);
    if (specialSelfBuff && specialSelfBuff > result.selfBuff) {
      result.selfBuff = specialSelfBuff;
    }
    const buff = Math.max(result.selfBuff, specialSelfBuff, isSupportBuffing && supportBuff ? supportBuff : 0);
    if (buff) {
      result['buffed_' + this.calculationStat] += unit.stats[this.calculationStat].base * buff / 100;
    }
  }

  private getSpecialSelfBuff(unit: Unit, skill: Skill, stat: string): number {
    // Randy LB buff activated by TA
    if (unit.id === 1152 && !skill.isLimitBreak && stat === 'atk'
      && (unit.selectedEquipmentSet.isEquipped(1019) || unit.selectedEquipmentSet.isEquipped(3423))) {
      return 300;
    }
    return 0;
  }

  abstract calculateDamages(unit: Unit, result: ResultTurnDamages);

  abstract calculateKillerDamages(unit: Unit, isKillerActive: boolean, killer: number, killerActive: number, result: ResultTurnDamages);

  abstract calculateElementalDamages(unit: Unit, elements: Array<number>, result: ResultTurnDamages);

  abstract calculateFinalResult(unit: Unit, def: number, spr: number, result: ResultTurnDamages);

  public calculateLevelCorrection(unit: Unit, result: ResultTurnDamages) {
    result.levelCorrection = unit.rank === 7 ? 2.2 : 2;
  }
}
