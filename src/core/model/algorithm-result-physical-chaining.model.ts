import {AlgorithmResult} from './algorithm-result.model';

export class AlgorithmResultPhysicalChaining extends AlgorithmResult {
  public atk: number;
  public leftHandAtk: number;
  public rightHandAtk: number;
  public buffedAtk: number;
  public combosIncrement: number;
  public perTurnHitsPower: Array<Array<number>>;
  public averageTurnPower: number;
  public preDefDamages: number;
  public isDualWielding: boolean;
}
