import {Unit} from './unit.model';
import {CalculatorTestutils} from '../calculator-testutils.spec';
import {AlgorithmHybridChaining} from './algorithm-hybrid-chaining.model';
import {AlgorithmResultHybridChaining} from './algorithm-result-hybrid-chaining.model';

const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":300,"atk":200,"mag":200,"def":100,"spr":100}';
const EQUIPMENT_TEST_DATA = '{"id":1,"category":1,"atk":100,"mag":100}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + ',"left_hand":' + EQUIPMENT_TEST_DATA + ',"head":' + EQUIPMENT_TEST_DATA + ',"body":' + EQUIPMENT_TEST_DATA + ',"accessory1":' + EQUIPMENT_TEST_DATA + ',"accessory2":' + EQUIPMENT_TEST_DATA + ',"materia1":' + EQUIPMENT_TEST_DATA + ',"materia2":' + EQUIPMENT_TEST_DATA + ',"materia3":' + EQUIPMENT_TEST_DATA + ',"materia4":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA = '[{"power":500,"hits":5,"frames":"10 20 30 40 50","damages":"10 20 30 30 10"},{"power":1000,"hits":4,"frames":"10 20 30 40","damages":"10 20 30 40"}]';
const BUILD_TEST_DATA = '{"algorithmId":3,"physical_killer": 50,"magical_killer":100,"equipments":' + EQUIPMENTS_TEST_DATA + ',"skills":' + SKILLS_TEST_DATA + '}';
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmHybridChaining', () => {

  it('#calculate should set the result object values for a dual-wielded chain', () => {
    // GIVEN
    const algorithm = new AlgorithmHybridChaining();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.stats.atk.total = 800;
    unit.stats.mag.total = 1000;
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof AlgorithmResultHybridChaining).toBeTruthy();
    expect(result.result).toBeCloseTo(41.014);
    expect(result['combosIncrement']).toEqual(0.1);
    expect(result['averageTurnPower']).toEqual(2760);
    expect(result['perTurnHitsPower'][0].length).toEqual(10);
    expect(result['perTurnHitsPower'][1].length).toEqual(8);
    CalculatorTestutils.expectArrayOfArrayOfNumberToBeCloseTo(result['perTurnHitsPower'], [
      [50, 120, 210, 240, 90, 100, 220, 360, 390, 140], [100, 240, 420, 640, 180, 400, 660, 960]
    ]);

    expect(result['atk']).toEqual(800);
    expect(result['buffedAtk']).toEqual(1000);
    expect(result['physicalDamages']).toEqual(22356000);
    expect(result['physicalKillerDamages']).toBeCloseTo(23473800);
    expect(result['physicalElementalDamages']).toBeCloseTo(23473800);
    expect(result['physicalResult']).toBeCloseTo(21.713);

    expect(result['mag']).toEqual(1000);
    expect(result['buffedMag']).toEqual(1200);
    expect(result['magicalDamages']).toEqual(39744000);
    expect(result['magicalKillerDamages']).toBeCloseTo(41731200);
    expect(result['magicalElementalDamages']).toBeCloseTo(41731200);
    expect(result['magicalResult']).toBeCloseTo(38.60);
  });

  it('#calculate should set the result object values for a single-wielded chain', () => {
    // GIVEN
    const algorithm = new AlgorithmHybridChaining();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.stats.atk.total = 800;
    unit.stats.mag.total = 1000;
    algorithm.isKillerActive = false;
    algorithm.isSparkChain = true;
    algorithm.isSupportBuffing = false;
    unit.selectedBuild.equipments.right_hand.elements = [1];
    unit.selectedBuild.equipments.left_hand = undefined;
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof AlgorithmResultHybridChaining).toBeTruthy();
    expect(result.result).toBeCloseTo(33.335);
    expect(result['combosIncrement']).toBeCloseTo(0.45);
    expect(result['averageTurnPower']).toBeCloseTo(2107.5);
    expect(result['perTurnHitsPower'][0].length).toEqual(5);
    expect(result['perTurnHitsPower'][1].length).toEqual(4);
    CalculatorTestutils.expectArrayOfArrayOfNumberToBeCloseTo(result['perTurnHitsPower'], [
      [50, 190, 420, 555, 200], [100, 380, 840, 1480]
    ]);

    expect(result['atk']).toEqual(800);
    expect(result['buffedAtk']).toEqual(800);
    expect(result['physicalDamages']).toEqual(13488000);
    expect(result['physicalKillerDamages']).toBeCloseTo(13488000);
    expect(result['physicalElementalDamages']).toBeCloseTo(20232000);
    expect(result['physicalResult']).toBeCloseTo(18.7146);

    expect(result['mag']).toEqual(1000);
    expect(result['buffedMag']).toEqual(1000);
    expect(result['magicalDamages']).toEqual(21075000);
    expect(result['magicalKillerDamages']).toBeCloseTo(21075000);
    expect(result['magicalElementalDamages']).toBeCloseTo(31612500);
    expect(result['magicalResult']).toBeCloseTo(29.24);
  });
});
