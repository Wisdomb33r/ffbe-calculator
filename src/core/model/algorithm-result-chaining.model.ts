import {AlgorithmResult} from './algorithm-result.model';

export class AlgorithmResultChaining extends AlgorithmResult {
  public combosIncrement: number;
  public perTurnHitsPower: Array<Array<number>>;
  public averageTurnPower: number;
  public rawDamages: number;
  public killerPassive: number;
  public killerDamages: number;
  public averageElementalResistance: number;
  public elementalDamages: number;
  public finalVariance: number;
}
