import {Esper} from './esper.model';

describe('Esper', () => {

  it('#calculateStatIncrease should return one hundredth of esper stats with stat boost from character or equipment', () => {
    // GIVEN
    const esper: Esper = new Esper();
    esper.atk = 6000;
    // WHEN
    const atkBoost = esper.calculateStatIncrease('atk', 100);
    // THEN
    expect(atkBoost).toBeCloseTo(60);
  });

  it('#calculateStatIncrease should return 0 for undefined or null values', () => {
    // GIVEN
    const esper: Esper = new Esper();
    esper.atk = 6000;
    esper.stats_percent = 20;
    // WHEN
    const atkBoostUndefined = esper.calculateStatIncrease('atk', undefined);
    const atkBoostNull = esper.calculateStatIncrease('atk', null);
    // THEN
    expect(atkBoostUndefined).toBeCloseTo(0);
    expect(atkBoostNull).toBeCloseTo(0);
  });
});
