import {AlgorithmFinish} from './algorithm-finish.model';
import {Unit} from './unit.model';
import {ResultOffensive} from './result-offensive.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {CalculatorTestutils} from '../calculator-testutils.spec';
import {LEVIATHAN_EVOKE_BOOST} from '../calculator-constants';

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
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof ResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(307.347456);
    expect(result['turnDamages'].length).toEqual(1);
    result['turnDamages'].forEach((turn: ResultTurnDamages) => {
      expect(turn.atk).toEqual(6680);
      expect(turn.mag).toEqual(8210);
      // expect(turn.buffed_mag).toEqual(700);
      // expect(turn.combosIncrement).toBeCloseTo(4.0);
      // expect(turn.levelCorrection).toBeCloseTo(2.2);
    });

    // const turn1 = result['turnDamages'][0];
    // expect(turn1['evo']).toEqual(50);
    // expect(turn1['spr']).toEqual(400);
    // expect(turn1['buffed_spr']).toEqual(500);
    // expect(turn1['killerPassive']).toBeCloseTo(0);
    // expect(turn1['power']).toBeCloseTo(8000);
    // expect(turn1['magicalDamages']).toBeCloseTo(97680000);
    // expect(turn1['magicalKillerDamages']).toBeCloseTo(97680000);
    // expect(turn1['magicalElementalDamages']).toBeCloseTo(97680000);
    // expect(turn1['hitsPower'].length).toEqual(5);
    // CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [800, 1600, 2400, 2400, 800]);
    //
    // const turn2 = result['turnDamages'][1];
    // expect(turn2['evo']).toBeUndefined();
    // expect(turn2['spr']).toBeUndefined();
    // expect(turn2['buffed_spr']).toBeUndefined();
    // expect(turn2['killerPassive']).toBeCloseTo(100);
    // expect(turn2['power']).toBeCloseTo(400);
    // expect(turn2['magicalDamages']).toBeCloseTo(4312000);
    // expect(turn2['magicalKillerDamages']).toBeCloseTo(4743200);
    // expect(turn2['magicalElementalDamages']).toBeCloseTo(4743200);
    // expect(turn2['hitsPower'].length).toEqual(4);
    // CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn2['hitsPower'], [40, 80, 120, 160]);
  });
});
