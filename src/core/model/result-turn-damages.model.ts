import {Result} from './result.model';

export class ResultTurnDamages extends Result {
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
  public lbMultiplier: number;

  // skill behavior
  public isDualWielding: boolean;
  public isTurnCounting: boolean;
  public averageWeaponVariance: number;
  public finalVariance: number;
  public killerPassive: number;
  public elements: Array<number>;
  public resistances: Array<number>;
  public averageElementalResistance: number;

  // damages
  public damageAlgorithm: string;
  public physicalDamages: number;
  public magicalDamages: number;
  public physicalKillerDamages: number;
  public magicalKillerDamages: number;
  public physicalElementalDamages: number;
  public magicalElementalDamages: number;
  public physicalResult: number;
  public magicalResult: number;
}
