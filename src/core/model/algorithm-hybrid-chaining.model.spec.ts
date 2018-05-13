import {Unit} from './unit.model';
import {CalculatorTestutils} from '../calculator-testutils.spec';
import {AlgorithmHybridChaining} from './algorithm-hybrid-chaining.model';
import {ResultOffensive} from './result-offensive.model';
import {ResultChaining} from './result-chaining.model';

const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":300,"atk":200,"mag":200,"def":100,"spr":100}';
const EQUIPMENT_TEST_DATA = '{"id":1,"category":1,"atk":100,"mag":100}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + ',"left_hand":' + EQUIPMENT_TEST_DATA + ',"head":' + EQUIPMENT_TEST_DATA + ',"body":' + EQUIPMENT_TEST_DATA + ',"accessory1":' + EQUIPMENT_TEST_DATA + ',"accessory2":' + EQUIPMENT_TEST_DATA + ',"materia1":' + EQUIPMENT_TEST_DATA + ',"materia2":' + EQUIPMENT_TEST_DATA + ',"materia3":' + EQUIPMENT_TEST_DATA + ',"materia4":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA = '[{"category":8,"power":500,"hits":5,"frames":"10 20 30 40 50","damages":"10 20 30 30 10","damages_type":"hybrid"},{"category":8,"power":1000,"hits":4,"frames":"10 20 30 40","damages":"10 20 30 40","damages_type":"hybrid"}]';
const BUILD_TEST_DATA = '{"algorithmId":3,"physical_killer": 50,"magical_killer":100,"equipments":' + EQUIPMENTS_TEST_DATA + ',"skills":' + SKILLS_TEST_DATA + '}';
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmHybridChaining', () => {

  it('#calculate should set the result object values for a dual-wielded chain', () => {
    // GIVEN
    const algorithm = new AlgorithmHybridChaining();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.stats.atk.total = 800;
    unit.stats.mag.total = 1000;
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof ResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(60.315);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: ResultChaining) => {
      expect(turn instanceof ResultChaining).toBeTruthy();
      expect(turn['atk']).toEqual(800);
      expect(turn['buffedAtk']).toEqual(1000);
      expect(turn['mag']).toEqual(1000);
      expect(turn['buffedMag']).toEqual(1200);
      expect(turn['isDualWielding']).toBeTruthy();
      expect(turn['combosIncrement']).toBeCloseTo(0.1);
      expect(turn['killerPassive']).toBeCloseTo(50);
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['power']).toBeCloseTo(960);
    expect(turn1['physicalDamages']).toBeCloseTo(15552000);
    expect(turn1['magicalDamages']).toBeCloseTo(27648000);
    expect(turn1['physicalKillerDamages']).toBeCloseTo(16329600);
    expect(turn1['magicalKillerDamages']).toBeCloseTo(29030400);
    expect(turn1['physicalElementalDamages']).toBeCloseTo(16329600);
    expect(turn1['magicalElementalDamages']).toBeCloseTo(29030400);
    expect(turn1['physicalResult']).toBeCloseTo(15.1);
    expect(turn1['magicalResult']).toBeCloseTo(26.85);
    expect(turn1['hitsPower'].length).toEqual(10);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [25, 60, 105, 120, 45, 50, 110, 180, 195, 70]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['power']).toBeCloseTo(1800);
    expect(turn2['physicalDamages']).toEqual(29160000);
    expect(turn2['magicalDamages']).toEqual(51840000);
    expect(turn2['physicalKillerDamages']).toBeCloseTo(30618000);
    expect(turn2['magicalKillerDamages']).toBeCloseTo(54432000);
    expect(turn2['physicalElementalDamages']).toBeCloseTo(30618000);
    expect(turn2['magicalElementalDamages']).toBeCloseTo(54432000);
    expect(turn2['physicalResult']).toBeCloseTo(28.3216);
    expect(turn2['magicalResult']).toBeCloseTo(50.3496);
    expect(turn2['hitsPower'].length).toEqual(8);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn2['hitsPower'], [50, 120, 210, 320, 90, 200, 330, 480]);
  });

  it('#calculate should set the result object values for a single-wielded chain', () => {
    // GIVEN
    const algorithm = new AlgorithmHybridChaining();
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
    expect(result.result).toBeCloseTo(50.354);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: ResultChaining) => {
      expect(turn instanceof ResultChaining).toBeTruthy();
      expect(turn['atk']).toEqual(800);
      expect(turn['buffedAtk']).toEqual(800);
      expect(turn['mag']).toEqual(1000);
      expect(turn['buffedMag']).toEqual(1000);
      expect(turn['isDualWielding']).toBeFalsy();
      expect(turn['combosIncrement']).toBeCloseTo(0.45);
      expect(turn['killerPassive']).toBeCloseTo(50);
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['power']).toBeCloseTo(707.5);
    expect(turn1['physicalDamages']).toBeCloseTo(9056000);
    expect(turn1['magicalDamages']).toBeCloseTo(14150000);
    expect(turn1['physicalKillerDamages']).toBeCloseTo(9508800);
    expect(turn1['magicalKillerDamages']).toBeCloseTo(14857500);
    expect(turn1['physicalElementalDamages']).toBeCloseTo(14263200);
    expect(turn1['magicalElementalDamages']).toBeCloseTo(22286250);
    expect(turn1['physicalResult']).toBeCloseTo(13.19346);
    expect(turn1['magicalResult']).toBeCloseTo(20.615);
    expect(turn1['hitsPower'].length).toEqual(5);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [25, 95, 210, 277.5, 100]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['power']).toBeCloseTo(1400);
    expect(turn2['physicalDamages']).toEqual(17920000);
    expect(turn2['magicalDamages']).toEqual(28000000);
    expect(turn2['physicalKillerDamages']).toBeCloseTo(18816000);
    expect(turn2['magicalKillerDamages']).toBeCloseTo(29400000);
    expect(turn2['physicalElementalDamages']).toBeCloseTo(28224000);
    expect(turn2['magicalElementalDamages']).toBeCloseTo(44100000);
    expect(turn2['physicalResult']).toBeCloseTo(26.1072);
    expect(turn2['magicalResult']).toBeCloseTo(40.7925);
    expect(turn2['hitsPower'].length).toEqual(4);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn2['hitsPower'], [50, 190, 420, 740]);
  });
});
