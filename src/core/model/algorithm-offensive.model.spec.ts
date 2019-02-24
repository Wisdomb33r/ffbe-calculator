import {AlgorithmOffensive} from './algorithm-offensive.model';
import {AlgorithmFinish} from './algorithm-finish.model';
import {ResultOffensive} from './result-offensive.model';
import {ResultTurnDamages} from './result-turn-damages.model';

describe('AlgorithmOffensive', () => {

  it('#calculateTenTurnsResult should calculate average 10 turns result with start phase', () => {
    // GIVEN
    const algorithm = new AlgorithmFinish();
    const result: ResultOffensive = new ResultOffensive();
    result.startPhaseTurnDamages = [
      {result: 100, isTurnCounting: true} as ResultTurnDamages,
      {result: 200, isTurnCounting: false} as ResultTurnDamages,
      {result: 300, isTurnCounting: true} as ResultTurnDamages,
      {result: 400, isTurnCounting: false} as ResultTurnDamages,
    ];
    result.turnDamages = [
      {result: 1000, isTurnCounting: true} as ResultTurnDamages,
    ];
    // WHEN
    algorithm['calculateTenTurnsResult'](result);
    // THEN
    expect(result.tenTurnsResult).toBeCloseTo(900);
  });

  it('#calculateTenTurnsResult should calculate average 10 turns result with only start phase', () => {
    // GIVEN
    const algorithm = new AlgorithmFinish();
    const result: ResultOffensive = new ResultOffensive();
    result.startPhaseTurnDamages = [
      {result: 100, isTurnCounting: true} as ResultTurnDamages,
      {result: 200, isTurnCounting: false} as ResultTurnDamages,
      {result: 300, isTurnCounting: true} as ResultTurnDamages,
      {result: 400, isTurnCounting: false} as ResultTurnDamages,
      {result: 500, isTurnCounting: true} as ResultTurnDamages,
      {result: 600, isTurnCounting: false} as ResultTurnDamages,
      {result: 700, isTurnCounting: true} as ResultTurnDamages,
      {result: 800, isTurnCounting: false} as ResultTurnDamages,
      {result: 900, isTurnCounting: true} as ResultTurnDamages,
      {result: 1000, isTurnCounting: false} as ResultTurnDamages,
      {result: 1100, isTurnCounting: true} as ResultTurnDamages,
      {result: 1200, isTurnCounting: false} as ResultTurnDamages,
      {result: 1300, isTurnCounting: true} as ResultTurnDamages,
      {result: 1400, isTurnCounting: false} as ResultTurnDamages,
      {result: 1500, isTurnCounting: true} as ResultTurnDamages,
      {result: 1600, isTurnCounting: false} as ResultTurnDamages,
      {result: 1700, isTurnCounting: true} as ResultTurnDamages,
      {result: 1800, isTurnCounting: false} as ResultTurnDamages,
      {result: 1900, isTurnCounting: true} as ResultTurnDamages,
      {result: 2000, isTurnCounting: false} as ResultTurnDamages,
      {result: 2100, isTurnCounting: true} as ResultTurnDamages,
      {result: 2200, isTurnCounting: false} as ResultTurnDamages,
    ];
    result.turnDamages = [
      {result: 50, isTurnCounting: true} as ResultTurnDamages,
    ];
    // WHEN
    algorithm['calculateTenTurnsResult'](result);
    // THEN
    expect(result.tenTurnsResult).toBeCloseTo(2100);
  });

  it('#calculateTenTurnsResult should calculate average 10 turns result with only stable phase', () => {
    // GIVEN
    const algorithm = new AlgorithmFinish();
    const result: ResultOffensive = new ResultOffensive();
    result.turnDamages = [
      {result: 50, isTurnCounting: true} as ResultTurnDamages,
      {result: 100, isTurnCounting: false} as ResultTurnDamages,
      {result: 150, isTurnCounting: true} as ResultTurnDamages,
      {result: 200, isTurnCounting: false} as ResultTurnDamages,
    ];
    // WHEN
    algorithm['calculateTenTurnsResult'](result);
    // THEN
    expect(result.tenTurnsResult).toBeCloseTo(250);
  });
});
