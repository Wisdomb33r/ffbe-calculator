import {Result} from './result.model';
import {ResultTurnDamages} from './result-turn-damages.model';

export class ResultOffensive extends Result {
  public tenTurnsResult: number;
  public startPhaseResult: number;
  public startPhaseTurnDamages: Array<ResultTurnDamages> = [];
  public turnDamages: Array<ResultTurnDamages> = [];

  public getStartPhaseTurnCount(index: number) {
    return this.startPhaseTurnDamages.slice(0, index + 1).filter((turn: ResultTurnDamages) => turn.isTurnCounting).length;
  }

  public getTurnCount(index: number) {
    return this.turnDamages.slice(0, index + 1).filter((turn: ResultTurnDamages) => turn.isTurnCounting).length;
  }
}
