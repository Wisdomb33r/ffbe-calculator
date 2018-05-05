import {AlgorithmResult} from './algorithm-result.model';

export class AlgorithmResultChaining extends AlgorithmResult {
  public combosIncrement: number;
  public perTurnHitsPower: Array<Array<number>>;
  public averageTurnPower: number;
}
