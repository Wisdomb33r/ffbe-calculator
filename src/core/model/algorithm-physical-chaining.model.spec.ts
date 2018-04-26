import {Unit} from './unit.model';
import {AlgorithmPhysicalChaining} from './algorithm-physical-chaining.model';
import {AlgorithmResultPhysicalChaining} from './algorithm-result-physical-chaining.model';

const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":200,"atk":300,"mag":400,"def":500,"spr":500}';
const EQUIPMENT_TEST_DATA = '{"id":1}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + ',"head":' + EQUIPMENT_TEST_DATA + ',"body":' + EQUIPMENT_TEST_DATA + ',"accessory1":' + EQUIPMENT_TEST_DATA + ',"accessory2":' + EQUIPMENT_TEST_DATA + ',"materia1":' + EQUIPMENT_TEST_DATA + ',"materia2":' + EQUIPMENT_TEST_DATA + ',"materia3":' + EQUIPMENT_TEST_DATA + ',"materia4":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA = '[{"power":500},{"power":1000}]';
const BUILD_TEST_DATA = '{"algorithmId":8,"equipments":' + EQUIPMENTS_TEST_DATA + ',"skills":' + SKILLS_TEST_DATA + '}';
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmPhysicalChaining', () => {

  it('#calculate should set the mean per turn power, the pre DEF damages and the result', () => {
    // GIVEN
    const algorithm = new AlgorithmPhysicalChaining();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.stats.atk.total = 1000;
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof AlgorithmResultPhysicalChaining).toBeTruthy();
    expect(result.result).toEqual(150);
    expect(result['meanTurnPower']).toEqual(750);
    expect(result['preDefDamages']).toEqual(15000000);
  });
});
