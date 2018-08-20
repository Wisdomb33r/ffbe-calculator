import {Result} from './result.model';
import {ResultTurnDamages} from './result-turn-damages.model';

export class ResultOffensive extends Result {
  public turnDamages: Array<ResultTurnDamages> = [];

  public getTurnCount(index: number) {
    return this.turnDamages.slice(0, index + 1).filter((turn: ResultTurnDamages) => turn.isTurnCounting).length;
  }
}
