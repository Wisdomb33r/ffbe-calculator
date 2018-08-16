import {Unit} from './unit.model';
import {CalculatorTestutils} from '../calculator-testutils.spec';
import {ResultOffensive} from './result-offensive.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {AlgorithmChaining} from './algorithm-chaining.model';

const PHYSICAL_KILLERS =
  `{
      "dragon":50,
      "insect":0,
      "fairy":0,
      "undead":0,
      "plant":0,
      "beast":0,
      "human":0,
      "machine":0,
      "stone":0,
      "demon":0,
      "aquatic":0,
      "bird":0
  }`;
const MAGICAL_KILLERS =
  `{
      "dragon":0,
      "insect":0,
      "fairy":0,
      "undead":25,
      "plant":0,
      "beast":25,
      "human":0,
      "machine":25,
      "stone":0,
      "demon":0,
      "aquatic":25,
      "bird":0
  }`;
const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":300,"atk":200,"mag":200,"def":100,"spr":100}';
const EQUIPMENT_TEST_DATA = '{"id":1,"category":1,"mag":100}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + ',"head":' + EQUIPMENT_TEST_DATA + ',"body":' + EQUIPMENT_TEST_DATA + ',"accessory1":' + EQUIPMENT_TEST_DATA + ',"accessory2":' + EQUIPMENT_TEST_DATA + ',"materia1":' + EQUIPMENT_TEST_DATA + ',"materia2":' + EQUIPMENT_TEST_DATA + ',"materia3":' + EQUIPMENT_TEST_DATA + ',"materia4":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA = '[{"category":7,"power":500,"hits":5,"frames":"10 20 30 40 50","damages":"10 20 30 30 10","damages_type":"magical"},{"category":7,"power":1000,"hits":4,"frames":"10 20 30 40","damages":"10 20 30 40","damages_type":"magical"}]';
const BUILD_TEST_DATA =
  `{
    "algorithmId":2,
    "physical_killers":${PHYSICAL_KILLERS},
    "magical_killers":${MAGICAL_KILLERS},
    "equipments":${EQUIPMENTS_TEST_DATA},
    "skills":${SKILLS_TEST_DATA}
  }`;
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmChaining', () => {

  it('#calculate should set the result object values', () => {
    // GIVEN
    const algorithm = new AlgorithmChaining();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.stats.mag.total = 1000;
    unit.selectedBuild.skills[1].mag_buff = 150;
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof ResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(37.611);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: ResultTurnDamages) => {
      expect(turn['mag']).toEqual(1000);
      expect(turn['combosIncrement']).toEqual(0.1);
      expect(turn['killerPassive']).toBeCloseTo(200);
      expect(turn.levelCorrection).toBeCloseTo(2);
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['self_buff']).toEqual(0);
    expect(turn1['buffed_mag']).toEqual(1200);
    expect(turn1['power']).toBeCloseTo(710);
    expect(turn1['magicalDamages']).toEqual(20448000);
    expect(turn1['magicalKillerDamages']).toBeCloseTo(24537600);
    expect(turn1['magicalElementalDamages']).toBeCloseTo(24537600);
    expect(turn1['hitsPower'].length).toEqual(5);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [50, 120, 210, 240, 90]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['self_buff']).toEqual(150);
    expect(turn2['buffed_mag']).toEqual(1300);
    expect(turn2['power']).toBeCloseTo(1400);
    expect(turn2['magicalDamages']).toEqual(47320000);
    expect(turn2['magicalKillerDamages']).toBeCloseTo(56784000);
    expect(turn2['magicalElementalDamages']).toBeCloseTo(56784000);
    expect(turn2['hitsPower'].length).toEqual(4);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn2['hitsPower'], [100, 240, 420, 640]);
  });
});
