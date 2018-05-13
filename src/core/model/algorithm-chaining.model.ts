import {Algorithm} from './algorithm.model';
import {Result} from './result.model';
import {Unit} from './unit.model';
import {isNullOrUndefined} from 'util';
import {Skill} from './skill.model';
import {ResultChaining} from './result-chaining.model';

export abstract class AlgorithmChaining implements Algorithm {

  public isKillerActive = true;
  public isSparkChain = false;
  public isSupportBuffing = true;
  public supportBuff = 100;
  public opponentDef = 1000000;
  public opponentSpr = 1000000;
  public opponentResistances: Array<number> = [-50, -50, -50, -50, -50, -50, -50, -50];

  public abstract calculate(unit: Unit): Result;

  protected abstract isExecutingTwice(skill: Skill, unit: Unit): boolean;

  protected calculateCombosIncrement(skill: Skill, unit: Unit, result: ResultChaining) {
    let increment = 0.1;
    increment += skill.skillType.getCombosIncrementFromWeapons(unit);
    if (this.isSparkChain) {
      increment += 0.15;
    }
    // TODO check skill elements when possible
    result.combosIncrement = increment;
  }

  protected calculateHitsPower(skill: Skill, unit: Unit, result: ResultChaining) {
    if (isNullOrUndefined(skill.hits) || skill.hits <= 1) {
      result.hitsPower = [0];
      result.power = 0;
    } else {
      const frames: Array<number> = skill.frames.split(' ').map((s: string) => +s);
      const damages: Array<number> = skill.damages.split(' ').map((s: string) => +s);
      const hitsPower: Array<number> = [];
      let chainCombos = 0;
      for (let i = 0; i < skill.hits; i++) {
        if (i > 0 && frames[i] - frames[i - 1] > 25) {
          chainCombos = 0;
        }
        hitsPower.push(skill.power * damages[i] / 100 * Math.min(4, 1 + chainCombos * result.combosIncrement * 2));
        chainCombos++;
      }
      // TODO chainCombos = 0 if the skill does not perfect chain (ie Beatrix)
      if (this.isExecutingTwice(skill, unit)) {
        for (let j = 0; j < skill.hits; j++) {
          if (j > 0 && frames[j] - frames[j - 1] > 25) {
            chainCombos = 0;
          }
          hitsPower.push(skill.power * damages[j] / 100 * Math.min(4, 1 + chainCombos * result.combosIncrement * 2));
          chainCombos++;
        }
      }
      result.hitsPower = hitsPower;
      result.power = hitsPower.reduce((val1, val2) => val1 + val2, 0);
    }
  }
}
