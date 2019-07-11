import {Unit} from './unit.model';
import {isNullOrUndefined} from 'util';
import {Skill} from './skill.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {AlgorithmOffensive} from './algorithm-offensive.model';

export class AlgorithmChaining extends AlgorithmOffensive {

  protected calculateTurn(skill: Skill, unit: Unit): ResultTurnDamages {
    const result: ResultTurnDamages = new ResultTurnDamages();
    result.skill = skill;
    skill.damageType.calculateLevelCorrection(unit, result);
    skill.damageType.calculateBuffs(unit, skill, this.isSupportBuffing, this.supportBuff, result);
    this.calculateCombosIncrement(skill, unit, result);
    this.calculateHitsPower(skill, unit, result);
    skill.damageType.calculateDamages(unit, result);
    const killerValue: number = skill.skillType.getActiveKillers(unit, this.opponentKillerType, this.opponentKillerType2, result);
    const killerActive: number = skill.skillType.getSkillActiveKillers(skill, this.opponentKillerType, this.opponentKillerType2);
    skill.damageType.calculateKillerDamages(unit, this.isKillerActive, killerValue, killerActive, result);
    this.calculateEffectiveResistances(skill, result);
    skill.damageType.calculateElementalDamages(unit, skill.skillType.getElements(skill, unit), result);
    skill.damageType.calculateFinalResult(unit, this.opponentDef, this.opponentSpr, result);
    return result;
  }

  private calculateCombosIncrement(skill: Skill, unit: Unit, result: ResultTurnDamages) {
    let increment = 0.1;
    const elements = skill.skillType.getElements(skill, unit);
    if (Array.isArray(elements) && elements.length > 0) {
      increment += 0.2 * elements.length;
    }
    if (this.isSparkChain) {
      increment += 0.15;
    }
    result.combosIncrement = increment;
  }

  private calculateHitsPower(skill: Skill, unit: Unit, result: ResultTurnDamages) {
    const nbAttacks = skill.skillType.getNumberOfExecutions(skill, unit);
    result.isTurnCounting = skill.isTurnCounting;
    if (isNullOrUndefined(skill.hits) || skill.hits < 1) {
      result.hitsPower = [0];
      result.power = 0;
    } else {
      const frames: Array<number> = ('' + skill.frames).split(' ').map((s: string) => +s);
      const damages: Array<number> = ('' + skill.damages).split(' ').map((s: string) => +s);
      const hitsPower: Array<number> = [];
      let chainCombos = skill.chainCombo ? +skill.chainCombo / 2 : 0;
      const maxChainCombo = unit.stats.tdwCapIncrease && unit.selectedBuild.selectedEquipmentSet.isDualWielding() ? 6 : 4;

      let lbMultiplier = unit.getLbMultiplier();
      if (skill.lb_multiplier && skill.lb_multiplier > 1) {
        lbMultiplier += skill.lb_multiplier - 1;
      }
      const lbPower = unit.getLbPowerIncrease();
      const jumpMultiplier = 100 + (skill.isJump ? unit.stats.jump + unit.stats.equipment_jump : 0);
      let skillTotalPower = skill.power + unit.selectedBuild.selectedEquipmentSet.sumSkillModIncrease(skill.id);
      if (skill.isLimitBreak && lbPower > 0) {
        skillTotalPower += lbPower;
      }

      for (let i = 0; i < skill.hits; i++) {
        if (i > 0 && ((frames[i] - frames[i - 1] > 20 && this.isSparkChain) || (frames[i] - frames[i - 1] > 23))) {
          chainCombos = 0;
        }
        let hitPower = skillTotalPower * damages[i] / 100 * Math.min(maxChainCombo, 1 + chainCombos * result.combosIncrement * 2);
        if (skill.isLimitBreak && lbMultiplier > 1) {
          result.lbMultiplier = lbMultiplier;
          hitPower *= lbMultiplier;
        }
        if (skill.isJump) {
          result.jumpMultiplier = jumpMultiplier;
          hitPower *= jumpMultiplier / 100;
        }
        hitsPower.push(hitPower);
        chainCombos++;
      }
      if (nbAttacks > 1) {
        for (let i = 1; i < nbAttacks; i++) {
          if (skill.isBreakingChain) {
            chainCombos = 0;
          }
          for (let j = 0; j < skill.hits; j++) {
            if (j > 0 && ((frames[j] - frames[j - 1] > 20 && this.isSparkChain) || (frames[i] - frames[i - 1] > 23))) {
              chainCombos = 0;
            }
            let hitPower = skillTotalPower * damages[j] / 100 * Math.min(maxChainCombo, 1 + chainCombos * result.combosIncrement * 2);
            if (skill.isJump) {
              hitPower *= jumpMultiplier / 100;
            }
            hitsPower.push(hitPower);
            chainCombos++;
          }
        }
      }
      result.hitsPower = hitsPower;
      result.power = hitsPower.reduce((val1, val2) => val1 + val2, 0);
    }
  }
}
