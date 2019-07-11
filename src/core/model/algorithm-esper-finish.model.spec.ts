import {AlgorithmFinish} from './algorithm-finish.model';
import {Unit} from './unit.model';
import {ResultOffensive} from './result-offensive.model';
import {LEVIATHAN_EVOKE_BOOST} from '../calculator-constants';
import {CalculatorTestutils} from '../calculator-testutils.spec';
import {ResultTurnDamages} from './result-turn-damages.model';
import {ConditionalPassive} from './conditional-passive.model';

const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":300,"atk":200,"mag":200,"def":100,"spr":100}';
const EQUIPMENT_TEST_DATA = '{"id":1,"category":1,"mag":100,"spr":50}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + ',"accessory1":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA =
  `[
    {"category":9,"power":300,"hits":1,"frames":"10","damages":"100","damages_type":"esper","isTurnCounting":true,"isEsper":true}
  ]`;
const BUILD_TEST_DATA =
  `{
    "algorithmId":7,
    "equipments":${EQUIPMENTS_TEST_DATA},
    "skills":${SKILLS_TEST_DATA}
  }`;
const UNIT_TEST_DATA = '{"id":9999,"rank":7,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmFinish for esper invocation', () => {
  it('#calculate should set the result object values', () => {
    // GIVEN
    const algorithm = new AlgorithmFinish();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.selectedBuild.esper = LEVIATHAN_EVOKE_BOOST;
    unit.stats.evo.total = 80;
    unit.selectedBuild.selectedEquipmentSet.right_hand.conditional_passives = [new ConditionalPassive(JSON.parse('{"esper":14,"esper_damage":100}'))];
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof ResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(1498.5);
    expect(result['turnDamages'].length).toEqual(1);

    const turn1: ResultTurnDamages = result['turnDamages'][0];
    expect(turn1.atk).toEqual(6680);
    expect(turn1.mag).toEqual(8210);
    expect(turn1.def).toEqual(6460);
    expect(turn1.spr).toEqual(6080);
    expect(turn1.buffed_atk).toBeUndefined();
    expect(turn1.buffed_mag).toBeUndefined();
    expect(turn1.buffed_def).toBeUndefined();
    expect(turn1.buffed_spr).toBeUndefined();
    expect(turn1.combosIncrement).toBeCloseTo(4.0);
    expect(turn1.levelCorrection).toBeCloseTo(1.6);
    expect(turn1.evo).toEqual(80);
    expect(turn1.esperDamageModifier).toBeCloseTo(300);
    expect(turn1.killerActive).toBeCloseTo(0);
    expect(turn1.killerPassive).toBeCloseTo(0);
    expect(turn1.power).toBeCloseTo(1600);
    expect(turn1.magicalDamages).toBeCloseTo(1080000000);
    expect(turn1.magicalKillerDamages).toBeCloseTo(1080000000);
    expect(turn1.magicalElementalDamages).toBeCloseTo(1620000000);
    expect(turn1.hitsPower.length).toEqual(1);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [1600]);
  });
});
