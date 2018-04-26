import {Algorithm} from './algorithm.model';
import {AlgorithmResult} from './algorithm-result.model';
import {AlgorithmResultDefensive} from './algorithm-result-defensive.model';
import {Unit} from './unit.model';

export class AlgorithmDefensive implements Algorithm {
  public calculate(unit: Unit): AlgorithmResult {
    const result = new AlgorithmResultDefensive();
    result.physicalEffectiveHp = unit.stats.hp.total * unit.stats.def.total;
    result.magicalEffectiveHp = unit.stats.hp.total * unit.stats.spr.total;
    result.result = (result.physicalEffectiveHp + result.magicalEffectiveHp) / 2;
    return result;
  }
}
