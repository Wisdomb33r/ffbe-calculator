import {Unit} from './unit.model';
import {ResultOffensive} from './result-offensive.model';
import {Skill} from './skill.model';
import {Result} from './result.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {isNullOrUndefined} from 'util';
import {AlgorithmOffensive} from './algorithm-offensive.model';

export class AlgorithmFinish extends AlgorithmOffensive {

  public withCombo = true;

  public calculate(unit: Unit): Result {
    const result: ResultOffensive = new ResultOffensive();
    unit.selectedBuild.skills.forEach((skill: Skill) => result.turnDamages.push(this.calculateTurn(skill, unit)));
    result.result = result.turnDamages
      .map(r => r.result)
      .reduce((val1, val2) => val1 + val2, 0) / result.turnDamages.length;
    return result;
  }

  private calculateTurn(skill: Skill, unit: Unit): ResultTurnDamages {
    const result: ResultTurnDamages = new ResultTurnDamages();
    skill.damageType.calculateLevelCorrection(unit, result);
    skill.damageType.calculateBuffs(unit, skill, this.isSupportBuffing, this.supportBuff, result);
    this.calculateHitsPower(skill, unit, result);
    skill.damageType.calculateDamages(unit, result);
    const killerValue = skill.skillType.getActiveKillers(unit, this.opponentKillerType, this.opponentKillerType2);
    skill.damageType.calculateKillerDamages(unit, this.isKillerActive, killerValue, result);
    this.calculateEffectiveResistances(skill, result);
    skill.damageType.calculateElementalDamages(unit, skill.skillType.getElements(skill, unit), result);
    skill.damageType.calculateFinalResult(unit, this.opponentDef, this.opponentSpr, result);
    return result;
  }

  private calculateHitsPower(skill: Skill, unit: Unit, result: ResultTurnDamages) {
    const nbAttacks = skill.skillType.getNumberOfExecutions(skill, unit);
    if (skill.isEsper) {
      skill.power = unit.selectedBuild.esper.power;
    }
    if (isNullOrUndefined(skill.hits) || skill.hits < 1) {
      result.hitsPower = [0];
      result.power = 0;
    } else {
      result.combosIncrement = 4;
      const damages: Array<number> = ('' + skill.damages).split(' ').map((s: string) => +s);
      const hitsPower: Array<number> = [];
      if (skill.isBreakingChain) {
        result.combosIncrement = 2.5;
      }
      if (skill.isDwBreakingChain && nbAttacks > 1) {
        result.combosIncrement = 2.5;
      }
      if (skill.isOutOfChain || !this.withCombo) {
        result.combosIncrement = 1;
      }
      for (let i = 0; i < skill.hits; i++) {
        let hitPower = skill.power * damages[i] / 100 * result.combosIncrement;
        if (skill.isLimitBreak) {
          const lbMultiplier = unit.selectedBuild.equipments.sumEquipmentStat('lb_multiplier');
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
