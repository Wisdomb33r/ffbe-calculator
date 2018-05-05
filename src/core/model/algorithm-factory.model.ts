import {Algorithm} from './algorithm.model';
import {AlgorithmPhysicalChaining} from './algorithm-physical-chaining.model';
import {AlgorithmDefensive} from './algorithm-defensive.model';
import {AlgorithmMagicalChaining} from './algorithm-magical-chaining.model';

export class AlgorithmFactory {
  public static getInstance(algorithmId: number): Algorithm {
    switch (algorithmId) {
      case 1:
        return new AlgorithmPhysicalChaining();
      case 2:
        return new AlgorithmMagicalChaining();
      /*case 3:
        return new AlgorithmHybridChaining();
      case 4:
        return new AlgorithmPhysicalFinisher();
      case 5:
        return new AlgorithmMagicalFinisher();
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
