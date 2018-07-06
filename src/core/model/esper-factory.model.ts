import {BAHAMUT, GOLEM_KILLERS, IFRIT_STATS_BOOST, RAMUH_DEMON_KILLER, RAMUH_EVOKE_BOOST} from '../calculator-constants';
import {Esper} from './esper.model';

export class EsperFactory {
  public static getInstance(algorithmId: number): Esper {
    switch (algorithmId) {
      case 1:
      case 4:
        return IFRIT_STATS_BOOST;
      case 2:
      case 5:
        return RAMUH_DEMON_KILLER;
      case 3:
      case 6:
        return BAHAMUT;
      case 7:
        return RAMUH_EVOKE_BOOST;
      case 8:
        return GOLEM_KILLERS;
      default:
        return IFRIT_STATS_BOOST;
    }
  }
}
