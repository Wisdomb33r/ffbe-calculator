import {Unit} from './unit.model';
import {ResultOffensive} from './result-offensive.model';
import {Skill} from './skill.model';
import {Result} from './result.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {isNullOrUndefined} from 'util';
import {AlgorithmOffensive} from './algorithm-offensive.model';

export class AlgorithmFinish extends AlgorithmOffensive {

  public calculate(unit: Unit): Result {
    const result: ResultOffensive = new ResultOffensive();
    unit.selectedBuild.skills.forEach((skill: Skill) => result.turnDamages.push(this.calculateTurn(skill, unit)));
    result.result = result.turnDamages
      .map(r => r.result)
      .reduce((val1, val2) => val1 + val2, 0) / result.turnDamages.filter((turn: ResultTurnDamages) => turn.isTurnCounting).length;
    return result;
  }

  private calculateTurn(skill: Skill, unit: Unit): ResultTurnDamages {
    const result: ResultTurnDamages = new ResultTurnDamages();
    result.skill = skill;
    skill.damageType.calculateLevelCorrection(unit, result);
    skill.damageType.calculateBuffs(unit, skill, this.isSupportBuffing, this.supportBuff, result);
    this.calculateComboMultiplier(skill, result);
    this.calculateHitsPower(skill, unit, result);
    skill.damageType.calculateDamages(unit, result);
    const killerValue = skill.skillType.getActiveKillers(unit, this.opponentKillerType, this.opponentKillerType2, result);
    skill.damageType.calculateKillerDamages(unit, this.isKillerActive, killerValue, result);
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

      const lbMultiplier = unit.selectedBuild.equipments.sumEquipmentStat('lb_multiplier');
      const lbPower = unit.selectedBuild.equipments.getAllActiveConditionalPassives(unit.id)
        .map(p => p.lb_power ? p.lb_power : 0)
        .reduce((val1, val2) => val1 + val2, 0);

      for (let i = 0; i < skill.hits; i++) {
        let hitPower = skill.power * damages[i] / 100 * result.combosIncrement;
        if (skill.isLimitBreak) {
          if (lbPower > 0) {
            hitPower += lbPower * damages[i] / 100 * result.combosIncrement;
          }
          if (lbMultiplier > 0) {
            result.lbMultiplier = lbMultiplier;
            hitPower = lbMultiplier * hitPower;
          }
        }
        hitsPower.push(hitPower);
      }
      if (nbAttacks > 1) {
        for (let i = 1; i < nbAttacks; i++) {
          for (let j = 0; j < skill.hits; j++) {
            hitsPower.push(skill.power * damages[j] / 100 * result.combosIncrement);
          }
        }
      }
      result.hitsPower = hitsPower;
      result.power = hitsPower.reduce((val1, val2) => val1 + val2, 0);
    }
  }
}
