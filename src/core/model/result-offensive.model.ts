import {Result} from './result.model';
import {ResultChaining} from './result-chaining.model';

export class ResultOffensive extends Result {
  public turnDamages: Array<ResultChaining> = [];
}
