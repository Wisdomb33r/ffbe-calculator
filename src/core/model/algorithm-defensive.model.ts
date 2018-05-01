import {Algorithm} from './algorithm.model';
import {AlgorithmResult} from './algorithm-result.model';
import {AlgorithmResultDefensive} from './algorithm-result-defensive.model';
import {Unit} from './unit.model';

export class AlgorithmDefensive implements Algorithm {

  public isSupportMitigation = true;
  public supportMitigation = 30;
  public isCovering = false;
  public coverMitigation = 50;

  public calculate(unit: Unit): AlgorithmResult {
    const result = new AlgorithmResultDefensive();
    this.calculateBaseEffectiveHp(unit, result);
    this.calculateMitigation(unit, result);
    this.calculateCover(unit, result);
    this.calculateResistances(unit, result);
    this.calculateFinalResult(unit, result);
    result.result = (result.physicalEffectiveHp + result.magicalEffectiveHp) / 2;
    return result;
  }

  private calculateFinalResult(unit: Unit, result: AlgorithmResultDefensive) {
    result.physicalResult = result.physicalEffectiveHp / 1000000;
    result.magicalResult = result.magicalEffectiveHp / 1000000;
    result.result = (result.physicalEffectiveHp + result.magicalEffectiveHp) / 200000;
  }

  private calculateMitigation(unit: Unit, result: AlgorithmResultDefensive) {
    if (this.isSupportMitigation) {
      result.physicalEffectiveHp = result.physicalEffectiveHp / (1 - this.supportMitigation / 100);
      result.magicalEffectiveHp = result.magicalEffectiveHp / (1 - this.supportMitigation / 100);
    }
  }

  private calculateCover(unit: Unit, result: AlgorithmResultDefensive) {
    if (this.isCovering) {
      result.physicalEffectiveHp = result.physicalEffectiveHp / (1 - this.coverMitigation / 100);
      result.magicalEffectiveHp = result.magicalEffectiveHp / (1 - this.coverMitigation / 100);
    }
  }

  private calculateResistances(unit: Unit, result: AlgorithmResultDefensive) {
    // TODO insert physical and magical resistance into the calculation when possible
  }

  private calculateBaseEffectiveHp(unit: Unit, result: AlgorithmResultDefensive) {
    result.basePhysicalEffectiveHp = unit.stats.hp.total * unit.stats.def.total;
    result.baseMagicalEffectiveHp = unit.stats.hp.total * unit.stats.spr.total;
    result.physicalEffectiveHp = result.basePhysicalEffectiveHp;
    result.magicalEffectiveHp = result.baseMagicalEffectiveHp;
  }
}
