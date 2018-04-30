import {Unit} from './unit.model';
import {AlgorithmPhysicalChaining} from './algorithm-physical-chaining.model';
import {AlgorithmResultPhysicalChaining} from './algorithm-result-physical-chaining.model';
import {Equipment} from './equipment.model';

const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":200,"atk":300,"mag":400,"def":500,"spr":500}';
const EQUIPMENT_TEST_DATA = '{"id":1,"category":1,"atk":100}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + ',"head":' + EQUIPMENT_TEST_DATA + ',"body":' + EQUIPMENT_TEST_DATA + ',"accessory1":' + EQUIPMENT_TEST_DATA + ',"accessory2":' + EQUIPMENT_TEST_DATA + ',"materia1":' + EQUIPMENT_TEST_DATA + ',"materia2":' + EQUIPMENT_TEST_DATA + ',"materia3":' + EQUIPMENT_TEST_DATA + ',"materia4":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA = '[{"power":500,"hits":5,"frames":"10 20 30 40 50","damages":"10 20 30 30 10"},{"power":1000,"hits":4,"frames":"10 20 30 40","damages":"10 20 30 40"}]';
const BUILD_TEST_DATA = '{"algorithmId":1,"equipments":' + EQUIPMENTS_TEST_DATA + ',"skills":' + SKILLS_TEST_DATA + '}';
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmPhysicalChaining', () => {

  it('#calculate should set the result object values for a single-handed chain', () => {
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
    expect(result.result).toEqual(333);
    expect(result['meanTurnPower']).toEqual(1665);
    expect(result['preDefDamages']).toEqual(33300000);
    expect(result['perTurnHitsPower'][0].length).toEqual(5);
    expect(result['perTurnHitsPower'][1].length).toEqual(4);
    expect(result['perTurnHitsPower']).toEqual([[50, 160, 330, 420, 170], [100, 320, 660, 1120]]);
  });

  it('#calculate should set the result object values for a dual-wielded chain', () => {
    // GIVEN
    const algorithm = new AlgorithmPhysicalChaining();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.stats.atk.total = 1000;
    unit.selectedBuild.equipments.left_hand = new Equipment(JSON.parse(EQUIPMENT_TEST_DATA));
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof AlgorithmResultPhysicalChaining).toBeTruthy();
    expect(result.result).toEqual(750.87);
    expect(result['meanTurnPower']).toEqual(4635);
    expect(result['preDefDamages']).toEqual(75087000);
    expect(result['perTurnHitsPower'][0].length).toEqual(10);
    expect(result['perTurnHitsPower'][1].length).toEqual(8);
    expect(result['perTurnHitsPower']).toEqual([
      [50, 160, 330, 420, 170, 200, 400, 600, 600, 200],
      [100, 320, 660, 1120, 340, 800, 1200, 1600]
    ]);
  });
});