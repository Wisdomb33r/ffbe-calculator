import {Algorithm} from './algorithm.model';
import {AlgorithmResult} from './algorithm-result.model';
import {AlgorithmResultDefensive} from './algorithm-result-defensive.model';
import {Unit} from './unit.model';

export class AlgorithmDefensive implements Algorithm {

  public isSupportMitigating = true;
  public supportMitigation = 30;
  public isPhysicalCovering = false;
  public isMagicalCovering = false;
  public isSupportBuffing = true;
  public supportBuff = 100;
  private isInitialized = false;

  public init(unit: Unit) {
    if (unit.selectedBuild.physical_cover) {
      this.isPhysicalCovering = true;
    } else if (unit.selectedBuild.magical_cover) {
      this.isMagicalCovering = true;
    }
    this.isInitialized = true;
  }

  public calculate(unit: Unit): AlgorithmResult {
    if (!this.isInitialized) {
      this.init(unit);
    }
    const result = new AlgorithmResultDefensive();
    this.calculateBuffs(unit, result);
    this.calculateBaseEffectiveHp(unit, result);
    this.calculateMitigation(unit, result);
    this.calculateCover(unit, result);
    this.calculateResistances(unit, result);
    this.calculateFinalResult(unit, result);
    return result;
  }

  private calculateBuffs(unit: Unit, result: AlgorithmResultDefensive) {
    result.hp = unit.stats.hp.total;
    result.def = unit.stats.def.total;
    result.buffedDef = result.def;
    if (this.isSupportBuffing) {
      result.buffedDef += unit.stats.def.base * this.supportBuff / 100;
    }
    result.spr = unit.stats.spr.total;
    result.buffedSpr = result.spr;
    if (this.isSupportBuffing) {
      result.buffedSpr += unit.stats.spr.base * this.supportBuff / 100;
    }
  }

  private calculateFinalResult(unit: Unit, result: AlgorithmResultDefensive) {
    result.physicalResult = result.physicalEffectiveHp / 1000000;
    result.magicalResult = result.magicalEffectiveHp / 1000000;
    result.result = (result.physicalEffectiveHp + result.magicalEffectiveHp) / 2000000;
  }

  private calculateMitigation(unit: Unit, result: AlgorithmResultDefensive) {
    result.mitigation = unit.selectedBuild.mitigation ? unit.selectedBuild.mitigation : 0;
    result.effectiveMitigation = result.mitigation;
    if (this.isSupportMitigating && this.supportMitigation > result.effectiveMitigation) {
      result.effectiveMitigation = this.supportMitigation;
    }
    result.physicalEffectiveHp = result.physicalEffectiveHp / (1 - result.effectiveMitigation / 100);
    result.magicalEffectiveHp = result.magicalEffectiveHp / (1 - result.effectiveMitigation / 100);
  }

  private calculateCover(unit: Unit, result: AlgorithmResultDefensive) {
    result.physicalCover = unit.selectedBuild.physical_cover ? unit.selectedBuild.physical_cover : 0;
    result.magicalCover = unit.selectedBuild.magical_cover ? unit.selectedBuild.magical_cover : 0;
    if (this.isPhysicalCovering) {
      result.effectivePhysicalCover = result.physicalCover;
      result.effectiveMagicalCover = 0;
      result.physicalEffectiveHp = result.physicalEffectiveHp / (1 - result.physicalCover / 100);
    } else if (this.isMagicalCovering) {
      result.effectiveMagicalCover = result.magicalCover;
      result.effectivePhysicalCover = 0;
      result.magicalEffectiveHp = result.magicalEffectiveHp / (1 - result.magicalCover / 100);
    }
  }

  private calculateResistances(unit: Unit, result: AlgorithmResultDefensive) {
    result.physicalResistance = unit.selectedBuild.physical_resistance ? unit.selectedBuild.physical_resistance : 0;
    result.magicalResistance = unit.selectedBuild.magical_resistance ? unit.selectedBuild.magical_resistance : 0;
    result.physicalEffectiveHp = result.physicalEffectiveHp / (1 - result.physicalResistance / 100);
    result.magicalEffectiveHp = result.magicalEffectiveHp / (1 - result.magicalResistance / 100);
  }

  private calculateBaseEffectiveHp(unit: Unit, result: AlgorithmResultDefensive) {
    result.basePhysicalEffectiveHp = result.hp * result.buffedDef;
    result.baseMagicalEffectiveHp = result.hp * result.buffedSpr;
    result.physicalEffectiveHp = result.basePhysicalEffectiveHp;
    result.magicalEffectiveHp = result.baseMagicalEffectiveHp;
  }
}
