import {AlgorithmResult} from './algorithm-result.model';

export class AlgorithmResultMagicalChaining extends AlgorithmResult {
  public mag: number;
  public buffedMag: number;
  public combosIncrement: number;
  public perTurnHitsPower: Array<Array<number>>;
  public averageTurnPower: number;
  public preSprDamages: number;
  public averageElementalResistance: number;
  public elementalPreSprDamages: number;
  public finalVariance: number;
}
