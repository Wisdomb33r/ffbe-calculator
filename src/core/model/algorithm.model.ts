import {AlgorithmResult} from './algorithm-result.model';
import {Unit} from './unit.model';

export interface Algorithm {
  calculate(unit: Unit): AlgorithmResult;
}
