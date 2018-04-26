import {Algorithm} from './algorithm.model';
import {AlgorithmResult} from './algorithm-result.model';
import {Unit} from './unit.model';

export abstract class AlgorithmChaining implements Algorithm {
  public abstract calculate(unit: Unit): AlgorithmResult;
}
