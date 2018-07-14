import {Result} from './result.model';
import {ResultTurnDamages} from './result-turn-damages.model';

export class ResultOffensive extends Result {
  public turnDamages: Array<ResultTurnDamages> = [];
}
