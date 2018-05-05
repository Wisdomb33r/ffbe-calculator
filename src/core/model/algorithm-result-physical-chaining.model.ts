import {AlgorithmResultChaining} from './algorithm-result-chaining.model';

export class AlgorithmResultPhysicalChaining extends AlgorithmResultChaining {
  public atk: number;
  public leftHandAtk: number;
  public rightHandAtk: number;
  public buffedAtk: number;
  public preDefDamages: number;
  public averageElementalResistance: number;
  public elementalPreDefDamages: number;
  public averageWeaponVariance: number;
  public finalVariance: number;
  public isDualWielding: boolean;
}
