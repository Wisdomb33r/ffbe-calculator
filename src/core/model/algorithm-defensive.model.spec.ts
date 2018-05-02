import {AlgorithmDefensive} from './algorithm-defensive.model';
import {AlgorithmResultDefensive} from './algorithm-result-defensive.model';
import {Unit} from './unit.model';

const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":200,"atk":300,"mag":400,"def":500,"spr":500}';
const EQUIPMENT_TEST_DATA = '{"id":1}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + ',"head":' + EQUIPMENT_TEST_DATA + ',"body":' + EQUIPMENT_TEST_DATA + ',"accessory1":' + EQUIPMENT_TEST_DATA + ',"accessory2":' + EQUIPMENT_TEST_DATA + ',"materia1":' + EQUIPMENT_TEST_DATA + ',"materia2":' + EQUIPMENT_TEST_DATA + ',"materia3":' + EQUIPMENT_TEST_DATA + ',"materia4":' + EQUIPMENT_TEST_DATA + '}';
const BUILD_TEST_DATA = '{"algorithmId":8,"equipments":' + EQUIPMENTS_TEST_DATA + '}';
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmDefensive', () => {

  it('#calculate should set the result object values', () => {
    // GIVEN
    const algorithm = new AlgorithmDefensive();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.stats.hp.total = 10000;
    unit.stats.def.total = 500;
    unit.stats.spr.total = 300;
    algorithm.isCovering = true;
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof AlgorithmResultDefensive).toBeTruthy();
    expect(result.result).toBeCloseTo(11.428571429);
    expect(result['basePhysicalEffectiveHp']).toEqual(5000000);
    expect(result['baseMagicalEffectiveHp']).toEqual(3000000);
  });
});
