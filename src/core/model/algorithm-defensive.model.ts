import {Algorithm} from './algorithm.model';
import {Result} from './result.model';
import {ResultDefensive} from './result-defensive.model';
import {Unit} from './unit.model';

export class AlgorithmDefensive implements Algorithm {

  public isSupportMitigating = true;
  public supportMitigation = 30;
  public isSupportPhysicalMitigating = false;
  public supportPhysicalMitigation = 30;
  public isSupportMagicalMitigating = false;
  public supportMagicalMitigation = 25;
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

  public calculate(unit: Unit): Result {
    if (!this.isInitialized) {
      this.init(unit);
    }
    const result = new ResultDefensive();
    this.calculateBuffs(unit, result);
    this.calculateBaseEffectiveHp(unit, result);
    this.calculateMitigation(unit, result);
    this.calculateCover(unit, result);
    this.calculateResistances(unit, result);
    this.calculateFinalResult(unit, result);
    return result;
  }

  private calculateBuffs(unit: Unit, result: ResultDefensive) {
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

    // TODO currently hardcoded for tanks because self-buffs are in skills and defensive characters not configured with a skill rotation
    if (unit.id === 8016) { // WKN
      result.selfDefBuff = 150;
      result.selfSprBuff = 150;
    }
    if (unit.id === 955 || unit.id === 1136) { // Awakened Rain
      result.selfDefBuff = 200;
      result.selfSprBuff = 200;
    }
    if (unit.id === 955 || unit.id === 8016 || unit.id === 1136) {
      if (result.selfDefBuff > this.supportBuff) {
        result.buffedDef = result.def + unit.stats.def.base * result.selfDefBuff / 100;
      }
      if (result.selfSprBuff > this.supportBuff) {
        result.buffedSpr = result.spr + unit.stats.spr.base * result.selfSprBuff / 100;
      }
    }
  }

  private calculateFinalResult(unit: Unit, result: ResultDefensive) {
    result.physicalResult = result.physicalEffectiveHp / 1000000;
    result.magicalResult = result.magicalEffectiveHp / 1000000;
    result.result = (result.physicalEffectiveHp + result.magicalEffectiveHp) / 2000000;
  }

  private calculateMitigation(unit: Unit, result: ResultDefensive) {
    result.mitigation = unit.selectedBuild.mitigation ? unit.selectedBuild.mitigation : 0;
    result.effectiveMitigation = result.mitigation;
    if (this.isSupportMitigating && this.supportMitigation > result.effectiveMitigation) {
      result.effectiveMitigation = this.supportMitigation;
    }
    result.physicalMitigation = unit.selectedBuild.physical_mitigation ? unit.selectedBuild.physical_mitigation : 0;
    result.effectivePhysicalMitigation = result.physicalMitigation;
    if (this.isSupportPhysicalMitigating && this.supportPhysicalMitigation > result.effectivePhysicalMitigation) {
      result.effectivePhysicalMitigation = this.supportPhysicalMitigation;
    }
    result.magicalMitigation = unit.selectedBuild.magical_mitigation ? unit.selectedBuild.magical_mitigation : 0;
    result.effectiveMagicalMitigation = result.magicalMitigation;
    if (this.isSupportMagicalMitigating && this.supportMagicalMitigation > result.effectiveMagicalMitigation) {
      result.effectiveMagicalMitigation = this.supportMagicalMitigation;
    }
    result.physicalEffectiveHp =
      result.physicalEffectiveHp / (1 - result.effectiveMitigation / 100) / (1 - result.effectivePhysicalMitigation / 100);
    result.magicalEffectiveHp =
      result.magicalEffectiveHp / (1 - result.effectiveMitigation / 100) / (1 - result.effectiveMagicalMitigation / 100);
  }

  private calculateCover(unit: Unit, result: ResultDefensive) {
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

  private calculateResistances(unit: Unit, result: ResultDefensive) {
    result.physicalResistance = unit.selectedBuild.physical_resistance ? unit.selectedBuild.physical_resistance : 0;
    result.magicalResistance = unit.selectedBuild.magical_resistance ? unit.selectedBuild.magical_resistance : 0;
    result.physicalEffectiveHp = result.physicalEffectiveHp / (1 - result.physicalResistance / 100);
    result.magicalEffectiveHp = result.magicalEffectiveHp / (1 - result.magicalResistance / 100);
  }

  private calculateBaseEffectiveHp(unit: Unit, result: ResultDefensive) {
    result.basePhysicalEffectiveHp = result.hp * result.buffedDef;
    result.baseMagicalEffectiveHp = result.hp * result.buffedSpr;
    result.physicalEffectiveHp = result.basePhysicalEffectiveHp;
    result.magicalEffectiveHp = result.baseMagicalEffectiveHp;
  }
}
