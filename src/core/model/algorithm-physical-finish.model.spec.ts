import {Unit} from './unit.model';
import {CalculatorTestutils} from '../calculator-testutils.spec';
import {ResultOffensive} from './result-offensive.model';
import {ResultChaining} from './result-chaining.model';
import {AlgorithmFinish} from './algorithm-finish.model';

const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":300,"atk":200,"mag":200,"def":100,"spr":100}';
const EQUIPMENT_TEST_DATA = '{"id":1,"category":1,"atk":100}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA = '['
  + '{"category":6,"power":500,"hits":2,"frames":"20 200","damages":"50 50","damages_type":"physical","isBreakingChain":true},'
  + '{"category":6,"power":1000,"hits":1,"frames":"50","damages":"100","damages_type":"physical"}'
  + ']';
const BUILD_TEST_DATA = '{"algorithmId":4,"equipments":' + EQUIPMENTS_TEST_DATA + ',"skills":' + SKILLS_TEST_DATA + '}';
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmPhysicalFinish', () => {

  it('#calculate should set the result object values for a single-handed finish move', () => {
    // GIVEN
    const algorithm = new AlgorithmFinish();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    algorithm.isSupportBuffing = false;
    algorithm.isSparkChain = true;
    algorithm.isKillerActive = false;
    unit.stats.atk.total = 1000;
    unit.selectedBuild.equipments.right_hand.variance_min = 100;
    unit.selectedBuild.equipments.right_hand.variance_max = 160;
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof ResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(63.13125);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: ResultChaining) => {
      expect(turn instanceof ResultChaining).toBeTruthy();
      expect(turn['atk']).toEqual(1000);
      expect(turn['buffed_atk']).toEqual(1000);
      expect(turn['isDualWielding']).toBeFalsy();
      expect(turn['killerPassive']).toBeCloseTo(0);
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['combosIncrement']).toBeCloseTo(2.5);
    expect(turn1['power']).toBeCloseTo(1250);
    expect(turn1['physicalDamages']).toEqual(25000000);
    expect(turn1['physicalKillerDamages']).toBeCloseTo(25000000);
    expect(turn1['physicalElementalDamages']).toBeCloseTo(25000000);
    expect(turn1['hitsPower'].length).toEqual(2);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [625, 625]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['combosIncrement']).toBeCloseTo(4);
    expect(turn2['power']).toBeCloseTo(4000);
    expect(turn2['physicalDamages']).toEqual(80000000);
    expect(turn2['physicalKillerDamages']).toBeCloseTo(80000000);
    expect(turn2['physicalElementalDamages']).toBeCloseTo(80000000);
    expect(turn2['hitsPower'].length).toEqual(1);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn2['hitsPower'], [4000]);
  });

  fit('#calculate should set the result object values for a physical esper calculation', () => {
    // GIVEN
    const algorithm = new AlgorithmFinish();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.selectedBuild.skills[1].category = 9; // fixed skill
    unit.selectedBuild.skills[1].damages_type = 'esper'; // esper damages
    unit.selectedBuild.skills[1].power = 235;
    unit.selectedBuild.skills[1].elements = [1];
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof ResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(63.13125);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: ResultChaining) => {
      expect(turn instanceof ResultChaining).toBeTruthy();
      expect(turn['atk']).toEqual(1000);
      expect(turn['buffed_atk']).toEqual(1000);
      expect(turn['isDualWielding']).toBeFalsy();
      expect(turn['killerPassive']).toBeCloseTo(0);
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['combosIncrement']).toBeCloseTo(2.5);
    expect(turn1['power']).toBeCloseTo(1250);
    expect(turn1['physicalDamages']).toEqual(25000000);
    expect(turn1['physicalKillerDamages']).toBeCloseTo(25000000);
    expect(turn1['physicalElementalDamages']).toBeCloseTo(25000000);
    expect(turn1['hitsPower'].length).toEqual(2);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [625, 625]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['combosIncrement']).toBeCloseTo(4);
    expect(turn2['power']).toBeCloseTo(4000);
    expect(turn2['physicalDamages']).toEqual(80000000);
    expect(turn2['physicalKillerDamages']).toBeCloseTo(80000000);
    expect(turn2['physicalElementalDamages']).toBeCloseTo(80000000);
    expect(turn2['hitsPower'].length).toEqual(1);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn2['hitsPower'], [4000]);
  });
});
