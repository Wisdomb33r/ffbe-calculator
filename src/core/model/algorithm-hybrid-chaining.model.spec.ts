import {Unit} from './unit.model';
import {CalculatorTestutils} from '../calculator-testutils.spec';
import {AlgorithmHybridChaining} from './algorithm-hybrid-chaining.model';
import {AlgorithmResultHybridChaining} from './algorithm-result-hybrid-chaining.model';
import {AlgorithmResultOffensive} from './algorithm-result-offensive.model';

const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":300,"atk":200,"mag":200,"def":100,"spr":100}';
const EQUIPMENT_TEST_DATA = '{"id":1,"category":1,"atk":100,"mag":100}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + ',"left_hand":' + EQUIPMENT_TEST_DATA + ',"head":' + EQUIPMENT_TEST_DATA + ',"body":' + EQUIPMENT_TEST_DATA + ',"accessory1":' + EQUIPMENT_TEST_DATA + ',"accessory2":' + EQUIPMENT_TEST_DATA + ',"materia1":' + EQUIPMENT_TEST_DATA + ',"materia2":' + EQUIPMENT_TEST_DATA + ',"materia3":' + EQUIPMENT_TEST_DATA + ',"materia4":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA = '[{"power":500,"hits":5,"frames":"10 20 30 40 50","damages":"10 20 30 30 10"},{"power":1000,"hits":4,"frames":"10 20 30 40","damages":"10 20 30 40"}]';
const BUILD_TEST_DATA = '{"algorithmId":3,"physical_killer": 50,"magical_killer":100,"equipments":' + EQUIPMENTS_TEST_DATA + ',"skills":' + SKILLS_TEST_DATA + '}';
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmHybridChaining', () => {

  fit('#calculate should set the result object values for a dual-wielded chain', () => {
    // GIVEN
    const algorithm = new AlgorithmHybridChaining();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.stats.atk.total = 800;
    unit.stats.mag.total = 1000;
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof AlgorithmResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(60.315);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: AlgorithmResultHybridChaining) => {
      expect(turn instanceof AlgorithmResultHybridChaining).toBeTruthy();
      expect(turn['atk']).toEqual(800);
      expect(turn['buffedAtk']).toEqual(1000);
      expect(turn['mag']).toEqual(1000);
      expect(turn['buffedMag']).toEqual(1200);
      expect(turn['isDualWielding']).toBeTruthy();
      expect(turn['combosIncrement']).toBeCloseTo(0.1);
      expect(turn['killerPassive']).toBeCloseTo(50);
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['power']).toBeCloseTo(1920);
    expect(turn1['physicalDamages']).toBeCloseTo(15552000);
    expect(turn1['magicalDamages']).toBeCloseTo(27648000);
    expect(turn1['physicalKillerDamages']).toBeCloseTo(16329600);
    expect(turn1['magicalKillerDamages']).toBeCloseTo(29030400);
    expect(turn1['physicalElementalDamages']).toBeCloseTo(16329600);
    expect(turn1['magicalElementalDamages']).toBeCloseTo(29030400);
    expect(turn1['physicalResult']).toBeCloseTo(15.1);
    expect(turn1['magicalResult']).toBeCloseTo(26.85);
    expect(turn1['hitsPower'].length).toEqual(10);
    CalculatorTestutils.expectArrayOfArrayOfNumberToBeCloseTo(turn1['hitsPower'], [50, 120, 210, 240, 90, 100, 220, 360, 390, 140]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['power']).toBeCloseTo(3600);
    expect(turn2['physicalDamages']).toEqual(29160000);
    expect(turn2['magicalDamages']).toEqual(51840000);
    expect(turn2['physicalKillerDamages']).toBeCloseTo(30618000);
    expect(turn2['magicalKillerDamages']).toBeCloseTo(54432000);
    expect(turn2['physicalElementalDamages']).toBeCloseTo(30618000);
    expect(turn2['magicalElementalDamages']).toBeCloseTo(54432000);
    expect(turn2['physicalResult']).toBeCloseTo(28.3216);
    expect(turn2['magicalResult']).toBeCloseTo(50.3496);
    expect(turn2['hitsPower'].length).toEqual(8);
    CalculatorTestutils.expectArrayOfArrayOfNumberToBeCloseTo(turn2['hitsPower'], [100, 240, 420, 640, 180, 400, 660, 960]);
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
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof AlgorithmResultHybridChaining).toBeTruthy();
    expect(result.result).toBeCloseTo(47.956);
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
