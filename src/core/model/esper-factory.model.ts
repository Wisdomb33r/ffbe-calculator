import {FENRIR, GOLEM_TANKING, LEVIATHAN_EVOKE_BOOST, SHIVA_STATS_BOOST} from '../calculator-constants';
import {Esper} from './esper.model';

export class EsperFactory {
  public static getInstance(algorithmId: number): Esper {
    switch (algorithmId) {
      case 7:
        return LEVIATHAN_EVOKE_BOOST;
      case 8:
        return GOLEM_TANKING;
      case 9:
      case 10:
        return SHIVA_STATS_BOOST;
      default:
        return FENRIR;
    }
  }
}
