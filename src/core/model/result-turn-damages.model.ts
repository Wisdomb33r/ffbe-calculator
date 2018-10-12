import {Result} from './result.model';
import {Skill} from './skill.model';

export class ResultTurnDamages extends Result {
  public skill: Skill;

  // stats
  public atk: number;
  public leftHandStat: number;
  public rightHandStat: number;
  public buffed_atk: number;
  public mag: number;
  public buffed_mag: number;
  public def: number;
  public buffed_def: number;
  public spr: number;
  public evo: number;
  public buffed_spr: number;
  public physicalStat: string;
  public magicalStat: string;
  public self_buff: number;

  // skill power
  public combosIncrement: number;
  public hitsPower: Array<number>;
  public power: number;
  public esperDamageModifier: number;
  public levelCorrection: number;
  public lbMultiplier: number;
  public jumpMultiplier: number;

  // skill behavior
  public isDualWielding: boolean;
  public isTurnCounting: boolean;
  public averageWeaponVariance: number;
  public finalVariance: number;
  public killerPassive: number;
  public isKillerLimitExceeded = false;
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
