import {Unit} from './unit.model';
import {Skill} from './skill.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {isNullOrUndefined} from 'util';
import {AlgorithmOffensive} from './algorithm-offensive.model';

export class AlgorithmFinish extends AlgorithmOffensive {

  protected calculateTurn(skill: Skill, unit: Unit): ResultTurnDamages {
    const result: ResultTurnDamages = new ResultTurnDamages();
    result.skill = skill;
    skill.damageType.calculateLevelCorrection(unit, result);
    skill.damageType.calculateBuffs(unit, skill, this.isSupportBuffing, this.supportBuff, result);
    this.calculateComboMultiplier(skill, result);
    this.calculateHitsPower(skill, unit, result);
    skill.damageType.calculateDamages(unit, result);
    const killerValue = skill.skillType.getActiveKillers(unit, this.opponentKillerType, this.opponentKillerType2, result);
    const killerActive: number = skill.skillType.getSkillActiveKillers(skill, this.opponentKillerType, this.opponentKillerType2);
    skill.damageType.calculateKillerDamages(unit, this.isKillerActive, killerValue, killerActive, result);
    this.calculateEffectiveResistances(skill, result);
    skill.damageType.calculateElementalDamages(unit, skill.skillType.getElements(skill, unit), result);
    skill.damageType.calculateFinalResult(unit, this.opponentDef, this.opponentSpr, result);
    return result;
  }

  private calculateComboMultiplier(skill: Skill, result: ResultTurnDamages) {
    result.combosIncrement = 4;
    if (skill.chainCombo) {
      result.combosIncrement = +skill.chainCombo;
    } else {
      skill.chainCombo = '4.0';
    }
  }

  private calculateHitsPower(skill: Skill, unit: Unit, result: ResultTurnDamages) {
    const nbAttacks = skill.skillType.getNumberOfExecutions(skill, unit);
    if (skill.isEsper) {
      skill.power = unit.selectedBuild.esper.power;
    }
    result.isTurnCounting = skill.isTurnCounting;
    if (isNullOrUndefined(skill.hits) || skill.hits < 1) {
      result.hitsPower = [0];
      result.power = 0;
    } else {
      const damages: Array<number> = ('' + skill.damages).split(' ').map((s: string) => +s);
      const hitsPower: Array<number> = [];

      let lbMultiplier = unit.getLbMultiplier();
      if (skill.lb_multiplier && skill.lb_multiplier > 1) {
        lbMultiplier += skill.lb_multiplier - 1;
      }
      const lbPower = unit.getLbPowerIncrease();
      const jumpMultiplier = 100 + (skill.isJump ? unit.stats.jump + unit.stats.equipment_jump : 0);
      let skillTotalPower = skill.power + unit.selectedEquipmentSet.sumSkillModIncrease(skill.id);
      if (skill.isLimitBreak && lbPower > 0) {
        skillTotalPower += lbPower;
      }

      for (let i = 0; i < skill.hits; i++) {
        let hitPower = skillTotalPower * damages[i] / 100 * result.combosIncrement;
        if (skill.isLimitBreak && lbMultiplier > 1) {
          result.lbMultiplier = lbMultiplier;
          hitPower = lbMultiplier * hitPower;
        }
        if (skill.isJump) {
          result.jumpMultiplier = jumpMultiplier;
          hitPower *= jumpMultiplier / 100;
        }
        hitsPower.push(hitPower);
      }
      if (nbAttacks > 1) {
        for (let i = 1; i < nbAttacks; i++) {
          for (let j = 0; j < skill.hits; j++) {
            let hitPower = skillTotalPower * damages[j] / 100 * result.combosIncrement;
            if (skill.isJump) {
              hitPower *= jumpMultiplier / 100;
            }
            hitsPower.push(hitPower);
          }
        }
      }
      result.hitsPower = hitsPower;
      result.power = hitsPower.reduce((val1, val2) => val1 + val2, 0);
    }
  }
}
