import {ResultChaining} from './result-chaining.model';

export class ResultHybridChaining extends ResultChaining {
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
