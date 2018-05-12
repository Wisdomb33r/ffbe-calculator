import {AlgorithmResult} from './algorithm-result.model';

export class AlgorithmResultChaining extends AlgorithmResult {
  public combosIncrement: number;
  public hitsPower: Array<number>;
  public power: number;
  public rawDamages: number;
  public killerPassive: number;
  public killerDamages: number;
  public averageElementalResistance: number;
  public elementalDamages: number;
  public finalVariance: number;
}
