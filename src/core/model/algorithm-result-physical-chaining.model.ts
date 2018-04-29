import {AlgorithmResult} from './algorithm-result.model';

export class AlgorithmResultPhysicalChaining extends AlgorithmResult {
  public perTurnHitsPower: Array<Array<number>>;
  public meanTurnPower: number;
  public preDefDamages: number;
}
