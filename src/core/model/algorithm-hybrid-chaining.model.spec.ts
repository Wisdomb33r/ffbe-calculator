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
const EQUIPMENT_TEST_DATA = '{"id":1,"category":1,"atk":100,"mag":100}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + ',"left_hand":' + EQUIPMENT_TEST_DATA + ',"head":' + EQUIPMENT_TEST_DATA + ',"body":' + EQUIPMENT_TEST_DATA + ',"accessory1":' + EQUIPMENT_TEST_DATA + ',"accessory2":' + EQUIPMENT_TEST_DATA + ',"materia1":' + EQUIPMENT_TEST_DATA + ',"materia2":' + EQUIPMENT_TEST_DATA + ',"materia3":' + EQUIPMENT_TEST_DATA + ',"materia4":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA = '[{"category":8,"power":500,"hits":5,"frames":"10 20 30 40 50","damages":"10 20 30 30 10","damages_type":"hybrid","isTurnCounting":true},{"category":8,"power":1000,"hits":4,"frames":"10 20 30 40","damages":"10 20 30 40","damages_type":"hybrid","isTurnCounting":true}]';
const BUILD_TEST_DATA =
  `{
    "algorithmId":3,
    "physical_killers": ${PHYSICAL_KILLERS},
    "magical_killers":${MAGICAL_KILLERS},
    "equipments":${EQUIPMENTS_TEST_DATA },
    "skills":${SKILLS_TEST_DATA}
  }`;
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmChaining', () => {

  it('#calculate should set the result object values for a dual-wielded chain', () => {
    // GIVEN
    const algorithm = new AlgorithmChaining();
    algorithm.opponentKillerType = 'dragon';
    algorithm.opponentKillerType2 = 'human';
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.stats.atk.total = 800;
    unit.stats.mag.total = 1000;
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof ResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(85.8446);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: ResultTurnDamages) => {
      expect(turn['atk']).toEqual(800);
      expect(turn['buffed_atk']).toEqual(1100);
      expect(turn['mag']).toEqual(1000);
      expect(turn['buffed_mag']).toEqual(1300);
      expect(turn['isDualWielding']).toBeTruthy();
      expect(turn['combosIncrement']).toBeCloseTo(0.1);
      expect(turn['killerPassive']).toBeCloseTo(250);
      expect(turn.levelCorrection).toBeCloseTo(2);
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['power']).toBeCloseTo(960);
    expect(turn1['physicalDamages']).toBeCloseTo(19200000);
    expect(turn1['magicalDamages']).toBeCloseTo(32448000);
    expect(turn1['physicalKillerDamages']).toBeCloseTo(24000000);
    expect(turn1['magicalKillerDamages']).toBeCloseTo(40560000);
    expect(turn1['physicalElementalDamages']).toBeCloseTo(24000000);
    expect(turn1['magicalElementalDamages']).toBeCloseTo(40560000);
    expect(turn1['physicalResult']).toBeCloseTo(22.2);
    expect(turn1['magicalResult']).toBeCloseTo(37.518);
    expect(turn1['hitsPower'].length).toEqual(10);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [25, 60, 105, 120, 45, 50, 110, 180, 195, 70]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['power']).toBeCloseTo(1800);
    expect(turn2['physicalDamages']).toEqual(36000000);
    expect(turn2['magicalDamages']).toEqual(60840000);
    expect(turn2['physicalKillerDamages']).toBeCloseTo(45000000);
    expect(turn2['magicalKillerDamages']).toBeCloseTo(76050000);
    expect(turn2['physicalElementalDamages']).toBeCloseTo(45000000);
    expect(turn2['magicalElementalDamages']).toBeCloseTo(76050000);
    expect(turn2['physicalResult']).toBeCloseTo(41.625);
    expect(turn2['magicalResult']).toBeCloseTo(70.346);
    expect(turn2['hitsPower'].length).toEqual(8);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn2['hitsPower'], [50, 120, 210, 320, 90, 200, 330, 480]);
  });

  it('#calculate should set the result object values for a single-wielded chain', () => {
    // GIVEN
    const algorithm = new AlgorithmChaining();
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
    expect(result instanceof ResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(47.956);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: ResultTurnDamages) => {
      expect(turn['atk']).toEqual(800);
      expect(turn['buffed_atk']).toEqual(800);
      expect(turn['mag']).toEqual(1000);
      expect(turn['buffed_mag']).toEqual(1000);
      expect(turn['isDualWielding']).toBeFalsy();
      expect(turn['combosIncrement']).toBeCloseTo(0.45);
      expect(turn['killerPassive']).toBeCloseTo(0);
      expect(turn.levelCorrection).toBeCloseTo(2);
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['power']).toBeCloseTo(707.5);
    expect(turn1['physicalDamages']).toBeCloseTo(9056000);
    expect(turn1['magicalDamages']).toBeCloseTo(14150000);
    expect(turn1['physicalKillerDamages']).toBeCloseTo(9056000);
    expect(turn1['magicalKillerDamages']).toBeCloseTo(14150000);
    expect(turn1['physicalElementalDamages']).toBeCloseTo(13584000);
    expect(turn1['magicalElementalDamages']).toBeCloseTo(21225000);
    expect(turn1['physicalResult']).toBeCloseTo(12.565);
    expect(turn1['magicalResult']).toBeCloseTo(19.633);
    expect(turn1['hitsPower'].length).toEqual(5);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [25, 95, 210, 277.5, 100]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['power']).toBeCloseTo(1400);
    expect(turn2['physicalDamages']).toEqual(17920000);
    expect(turn2['magicalDamages']).toEqual(28000000);
    expect(turn2['physicalKillerDamages']).toBeCloseTo(17920000);
    expect(turn2['magicalKillerDamages']).toBeCloseTo(28000000);
    expect(turn2['physicalElementalDamages']).toBeCloseTo(26880000);
    expect(turn2['magicalElementalDamages']).toBeCloseTo(42000000);
    expect(turn2['physicalResult']).toBeCloseTo(24.864);
    expect(turn2['magicalResult']).toBeCloseTo(38.85);
    expect(turn2['hitsPower'].length).toEqual(4);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn2['hitsPower'], [50, 190, 420, 740]);
  });
});
