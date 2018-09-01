import {Unit} from './unit.model';
import {CalculatorTestutils} from '../calculator-testutils.spec';
import {ResultOffensive} from './result-offensive.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {AlgorithmFinish} from './algorithm-finish.model';
import {Skill} from './skill.model';
import {IFRIT_EVOKE_BOOST, IFRIT_KILLERS} from '../calculator-constants';

const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":300,"atk":200,"mag":200,"def":100,"spr":100}';
const EQUIPMENT_TEST_DATA = '{"id":1,"category":1,"atk":100}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA = '['
  + '{"category":6,"power":500,"hits":2,"frames":"20 200","damages":"50 50","damages_type":"physical","chainCombo":2.5,"isTurnCounting":true},'
  + '{"category":6,"power":1000,"hits":1,"frames":"50","damages":"100","damages_type":"physical","isTurnCounting":true}'
  + ']';
const BUILD_TEST_DATA = '{"algorithmId":4,"equipments":' + EQUIPMENTS_TEST_DATA + ',"skills":' + SKILLS_TEST_DATA + '}';
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmFinish', () => {

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
    result['turnDamages'].forEach((turn: ResultTurnDamages) => {
      expect(turn['atk']).toEqual(1000);
      expect(turn['buffed_atk']).toEqual(1000);
      expect(turn['isDualWielding']).toBeFalsy();
      expect(turn['killerPassive']).toBeCloseTo(0);
      expect(turn.levelCorrection).toBeCloseTo(2);
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

  it('#calculate should set the result object values for a physical esper calculation', () => {
    // GIVEN
    const algorithm = new AlgorithmFinish();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.stats.atk.total = 1000;
    unit.stats.evo.total = 50;
    const ESPER_SKILL = '{"category":9,"power":235,"hits":1,"frames":"50","damages":"100","damages_type":"esper","elements":[1],"isTurnCounting":true}';
    unit.selectedBuild.skills[1] = new Skill(JSON.parse(ESPER_SKILL));
    unit.selectedBuild.esper = IFRIT_EVOKE_BOOST;
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof ResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(99.83);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: ResultTurnDamages) => {
      expect(turn['isDualWielding']).toBeFalsy();
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['atk']).toEqual(1000);
    expect(turn1['buffed_atk']).toEqual(1200);
    expect(turn1['evo']).toBeFalsy();
    expect(turn1['killerPassive']).toBeCloseTo(100);
    expect(turn1['combosIncrement']).toBeCloseTo(2.5);
    expect(turn1['power']).toBeCloseTo(1250);
    expect(turn1['physicalDamages']).toEqual(36000000);
    expect(turn1['physicalKillerDamages']).toBeCloseTo(39600000);
    expect(turn1['physicalElementalDamages']).toBeCloseTo(39600000);
    expect(turn1['hitsPower'].length).toEqual(2);
    expect(turn1.levelCorrection).toBeCloseTo(2);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [625, 625]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['atk']).toEqual(7640);
    expect(turn2['mag']).toEqual(4150);
    expect(turn2['def']).toEqual(5060);
    expect(turn2['spr']).toEqual(3880);
    expect(turn2['evo']).toEqual(50);
    expect(turn2['combosIncrement']).toBeCloseTo(4);
    expect(turn2['power']).toBeCloseTo(940);
    expect(turn2['physicalDamages']).toEqual(117500000);
    expect(turn2['physicalKillerDamages']).toBeCloseTo(117500000);
    expect(turn2['physicalElementalDamages']).toBeCloseTo(176250000);
    expect(turn2['hitsPower'].length).toEqual(1);
    expect(turn2.levelCorrection).toBeCloseTo(1.6);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn2['hitsPower'], [940]);
  });
});
