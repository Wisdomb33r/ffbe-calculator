import {Algorithm} from './algorithm.model';
import {AlgorithmDefensive} from './algorithm-defensive.model';
import {AlgorithmChaining} from './algorithm-chaining.model';
import {AlgorithmFinish} from './algorithm-finish.model';

export class AlgorithmFactory {
  public static getInstance(algorithmId: number): Algorithm {
    switch (algorithmId) {
      case 1:
      case 2:
      case 3:
        return new AlgorithmChaining();
      case 4:
      case 5:
      case 6:
        return new AlgorithmFinish();
      case 8:
        return new AlgorithmDefensive();
      default:
        return null;
    }
  }
}
