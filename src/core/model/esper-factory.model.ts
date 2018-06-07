import {IFRIT_STATS_BOOST} from '../calculator-constants';
import {Esper} from './esper.model';

export class EsperFactory {
  public static getInstance(algorithmId: number): Esper {
    switch (algorithmId) {
      case 1:
      case 4:
        return IFRIT_STATS_BOOST;
      default:
        return IFRIT_STATS_BOOST;
    }
  }
}
