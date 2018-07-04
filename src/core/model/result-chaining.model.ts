import {Result} from './result.model';

export class ResultChaining extends Result {
  // stats
  public atk: number;
  public leftHandAtk: number;
  public rightHandAtk: number;
  public buffed_atk: number;
  public mag: number;
  public buffed_mag: number;
  public def: number;
  public buffed_def: number;
  public spr: number;
  public evo: number;
  public buffed_spr: number;
  public calculationStat: string;
  public self_buff: number;

  // skill power
  public combosIncrement: number;
  public hitsPower: Array<number>;
  public power: number;
  public esperDamageModifier: number;
  public levelCorrection: number;

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
