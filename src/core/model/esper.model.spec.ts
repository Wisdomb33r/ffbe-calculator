import {Esper} from './esper.model';

describe('Esper', () => {

  it('#calculateStatIncrease should return one hundredth of esper stats without stat boost', () => {
    // GIVEN
    const esper: Esper = new Esper();
    esper.atk = 6000;
    // WHEN
    const atkBoost = esper.calculateStatIncrease('atk');
    // THEN
    expect(atkBoost).toBeCloseTo(60);
  });

  it('#calculateStatIncrease should return one hundredth of augmented esper stats with stat boost', () => {
    // GIVEN
    const esper: Esper = new Esper();
    esper.atk = 6000;
    esper.stats_percent = 20;
    // WHEN
    const atkBoost = esper.calculateStatIncrease('atk');
    // THEN
    expect(atkBoost).toBeCloseTo(72);
  });
});
