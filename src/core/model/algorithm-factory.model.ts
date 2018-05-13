import {Algorithm} from './algorithm.model';
import {AlgorithmDefensive} from './algorithm-defensive.model';
import {AlgorithmChaining} from './algorithm-chaining.model';

export class AlgorithmFactory {
  public static getInstance(algorithmId: number): Algorithm {
    switch (algorithmId) {
      case 1:
      case 2:
      case 3:
        return new AlgorithmChaining();
      /*case 4:
      case 5:
      case 6:
        return new AlgorithmHybridFinisher();
      case 7:
        return new AlgorithmEsper();*/
      case 8:
        return new AlgorithmDefensive();
      default:
        return null;
    }
  }
}
