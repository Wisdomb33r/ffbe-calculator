import {Result} from './result.model';

export class ResultChaining extends Result {
  // stats
  public atk: number;
  public leftHandAtk: number;
  public rightHandAtk: number;
  public buffedAtk: number;
  public mag: number;
  public buffedMag: number;

  // skill power
  public combosIncrement: number;
  public hitsPower: Array<number>;
  public power: number;

  // skill behavior
  public isDualWielding: boolean;
  public averageWeaponVariance: number;
  public finalVariance: number;
  public killerPassive: number;
  public elements: Array<number>;
  public resistances: Array<number>;
  public averageElementalResistance: number;

  // damages
  public physicalDamages;
  public magicalDamages;
  public physicalKillerDamages;
  public magicalKillerDamages;
  public physicalElementalDamages;
  public magicalElementalDamages;
  public physicalResult;
  public magicalResult;
}
