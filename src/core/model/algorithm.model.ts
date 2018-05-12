import {Result} from './result.model';
import {Unit} from './unit.model';

export interface Algorithm {
  calculate(unit: Unit): Result;
}
