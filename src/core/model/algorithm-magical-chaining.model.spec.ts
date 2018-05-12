import {Unit} from './unit.model';
import {CalculatorTestutils} from '../calculator-testutils.spec';
import {AlgorithmMagicalChaining} from './algorithm-magical-chaining.model';
import {AlgorithmResultOffensive} from './algorithm-result-offensive.model';
import {AlgorithmResultMagicalChaining} from './algorithm-result-magical-chaining.model';

const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":300,"atk":200,"mag":200,"def":100,"spr":100}';
const EQUIPMENT_TEST_DATA = '{"id":1,"category":1,"mag":100}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + ',"head":' + EQUIPMENT_TEST_DATA + ',"body":' + EQUIPMENT_TEST_DATA + ',"accessory1":' + EQUIPMENT_TEST_DATA + ',"accessory2":' + EQUIPMENT_TEST_DATA + ',"materia1":' + EQUIPMENT_TEST_DATA + ',"materia2":' + EQUIPMENT_TEST_DATA + ',"materia3":' + EQUIPMENT_TEST_DATA + ',"materia4":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA = '[{"category":7,"power":500,"hits":5,"frames":"10 20 30 40 50","damages":"10 20 30 30 10"},{"category":7,"power":1000,"hits":4,"frames":"10 20 30 40","damages":"10 20 30 40"}]';
const BUILD_TEST_DATA = '{"algorithmId":2,"physical_killer": 50,"magical_killer":100,"equipments":' + EQUIPMENTS_TEST_DATA + ',"skills":' + SKILLS_TEST_DATA + '}';
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmMagicalChaining', () => {

  it('#calculate should set the result object values', () => {
    // GIVEN
    const algorithm = new AlgorithmMagicalChaining();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.stats.mag.total = 1000;
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof AlgorithmResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(30.916);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: AlgorithmResultMagicalChaining) => {
      expect(turn instanceof AlgorithmResultMagicalChaining).toBeTruthy();
      expect(turn['mag']).toEqual(1000);
      expect(turn['buffedMag']).toEqual(1200);
      expect(turn['combosIncrement']).toEqual(0.1);
      expect(turn['killerPassive']).toBeCloseTo(100);
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['power']).toBeCloseTo(710);
    expect(turn1['rawDamages']).toEqual(20448000);
    expect(turn1['killerDamages']).toBeCloseTo(22492800);
    expect(turn1['elementalDamages']).toBeCloseTo(22492800);
    expect(turn1['hitsPower'].length).toEqual(5);
    CalculatorTestutils.expectArrayOfArrayOfNumberToBeCloseTo(turn1['hitsPower'], [50, 120, 210, 240, 90]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['power']).toBeCloseTo(1400);
    expect(turn2['rawDamages']).toEqual(40320000);
    expect(turn2['killerDamages']).toBeCloseTo(44352000);
    expect(turn2['elementalDamages']).toBeCloseTo(44352000);
    expect(turn2['hitsPower'].length).toEqual(4);
    CalculatorTestutils.expectArrayOfArrayOfNumberToBeCloseTo(turn2['hitsPower'], [100, 240, 420, 640]);
  });
});
