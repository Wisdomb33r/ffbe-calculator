import {FENRIR, GOLEM_TANKING, IFRIT_STATS_BOOST, RAMUH_EVOKE_BOOST} from '../calculator-constants';
import {Esper} from './esper.model';

export class EsperFactory {
  public static getInstance(algorithmId: number): Esper {
    switch (algorithmId) {
      case 1:
      case 4:
        return FENRIR;
      case 2:
      case 5:
        return FENRIR;
      case 3:
      case 6:
        return FENRIR;
      case 7:
        return RAMUH_EVOKE_BOOST;
      case 8:
        return GOLEM_TANKING;
      default:
        return IFRIT_STATS_BOOST;
    }
  }
}
