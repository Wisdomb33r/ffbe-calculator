import {AlgorithmResult} from './algorithm-result.model';
import {AlgorithmResultChaining} from './algorithm-result-chaining.model';

export class AlgorithmResultOffensive extends AlgorithmResult {
  public turnDamages: Array<AlgorithmResultChaining> = [];
}
