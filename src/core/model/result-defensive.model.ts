import {Result} from './result.model';

export class ResultDefensive extends Result {
  public hp: number;
  public def: number;
  public spr: number;
  public selfDefBuff: number;
  public selfSprBuff: number;
  public buffedDef: number;
  public buffedSpr: number;
  public mitigation: number;
  public effectiveMitigation: number;
  public physicalMitigation: number;
  public effectivePhysicalMitigation: number;
  public magicalMitigation: number;
  public effectiveMagicalMitigation: number;
  public physicalCover: number;
  public effectivePhysicalCover: number;
  public magicalCover: number;
  public effectiveMagicalCover: number;
  public physicalResistance: number;
  public magicalResistance: number;
  public basePhysicalEffectiveHp: number;
  public baseMagicalEffectiveHp: number;
  public physicalEffectiveHp: number;
  public magicalEffectiveHp: number;
  public physicalResult: number;
  public magicalResult: number;
}
