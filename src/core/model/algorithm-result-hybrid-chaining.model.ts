import {AlgorithmResultChaining} from './algorithm-result-chaining.model';

export class AlgorithmResultHybridChaining extends AlgorithmResultChaining {
  public mag: number;
  public buffedMag: number;
  public atk: number;
  public leftHandAtk: number;
  public rightHandAtk: number;
  public buffedAtk: number;
  public averageWeaponVariance: number;
  public isDualWielding: boolean;
  public physicalDamages;
  public magicalDamages;
  public physicalKillerDamages;
  public magicalKillerDamages;
  public physicalElementalDamages;
  public magicalElementalDamages;
  public physicalResult;
  public magicalResult;
}
