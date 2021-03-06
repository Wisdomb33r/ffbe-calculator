import {Unit} from './unit.model';
import {Equipment} from './equipment.model';
import {CalculatorTestutils} from '../calculator-testutils.spec';
import {ResultOffensive} from './result-offensive.model';
import {ResultTurnDamages} from './result-turn-damages.model';
import {AlgorithmChaining} from './algorithm-chaining.model';

const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":300,"atk":200,"mag":200,"def":100,"spr":100}';
const EQUIPMENT_TEST_DATA = '{"id":1,"category":1,"atk":100,"twoHanded":false}';
const EQUIPMENTS_TEST_DATA = '{"right_hand":' + EQUIPMENT_TEST_DATA + ',"head":' + EQUIPMENT_TEST_DATA + ',"body":' + EQUIPMENT_TEST_DATA + ',"accessory1":' + EQUIPMENT_TEST_DATA + ',"accessory2":' + EQUIPMENT_TEST_DATA + ',"materia1":' + EQUIPMENT_TEST_DATA + ',"materia2":' + EQUIPMENT_TEST_DATA + ',"materia3":' + EQUIPMENT_TEST_DATA + ',"materia4":' + EQUIPMENT_TEST_DATA + '}';
const SKILLS_TEST_DATA = '[{"category":6,"power":500,"hits":5,"frames":"10 20 30 40 50","damages":"10 20 30 30 10","damages_type":"physical","isTurnCounting":true},{"category":6,"power":1000,"hits":4,"frames":"10 20 30 40","damages":"10 20 30 40","damages_type":"physical","isTurnCounting":true}]';
const BUILD_TEST_DATA = '{"algorithmId":1,"equipments":' + EQUIPMENTS_TEST_DATA + ',"skills":' + SKILLS_TEST_DATA + '}';
const UNIT_TEST_DATA = '{"id":9999,"stats":' + UNIT_STATS_TEST_DATA + ',"builds":[' + BUILD_TEST_DATA + ']}';

describe('AlgorithmChaining', () => {

  it('#calculate should set the result object values for a single-handed chain', () => {
    // GIVEN
    const algorithm = new AlgorithmChaining();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    algorithm.isSupportBuffing = false;
    algorithm.isSparkChain = true;
    algorithm.isKillerActive = false;
    unit.stats.atk.total = 1000;
    unit.selectedEquipmentSet.right_hand['twoHanded'] = true;
    unit.selectedEquipmentSet.right_hand.minVariance = 100;
    unit.selectedEquipmentSet.right_hand.maxVariance = 160;
    unit.selectedBuild.skills[1].nb = 3;
    unit.selectedBuild.skills[1].isBreakingChain = true;
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof ResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(75.3102);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: ResultTurnDamages) => {
      expect(turn.atk).toEqual(1000);
      expect(turn.buffed_atk).toEqual(1000);
      expect(turn.isDualWielding).toBeFalsy();
      expect(turn.combosIncrement).toBeCloseTo(0.25);
      expect(turn.killerPassive).toBeCloseTo(0);
      expect(turn.levelCorrection).toBeCloseTo(2);
      expect(turn.enemyWeaponVariance).toBeCloseTo(0.8915);
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['power']).toBeCloseTo(1025);
    expect(turn1['physicalDamages']).toEqual(20500000);
    expect(turn1['physicalKillerDamages']).toBeCloseTo(20500000);
    expect(turn1['physicalElementalDamages']).toBeCloseTo(20500000);
    expect(turn1['hitsPower'].length).toEqual(5);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [50, 150, 300, 375, 150]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['power']).toBeCloseTo(6000);
    expect(turn2['physicalDamages']).toEqual(120000000);
    expect(turn2['physicalKillerDamages']).toBeCloseTo(120000000);
    expect(turn2['physicalElementalDamages']).toBeCloseTo(120000000);
    expect(turn2['hitsPower'].length).toEqual(12);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn2['hitsPower'], [100, 300, 600, 1000, 100, 300, 600, 1000, 100, 300, 600, 1000]);
  });

  it('#calculate should set the result object values for a dual-wielded chain', () => {
    // GIVEN
    const algorithm = new AlgorithmChaining();
    const unit = new Unit(JSON.parse(UNIT_TEST_DATA));
    unit.selectDefaultBuild();
    unit.stats.atk.total = 1000;
    unit.stats.atk.dw_equipment = 50;
    unit.selectedEquipmentSet.right_hand.minVariance = 100;
    unit.selectedEquipmentSet.right_hand.maxVariance = 110; // one-handed weapon with variance
    unit.selectedEquipmentSet.left_hand = new Equipment(JSON.parse(EQUIPMENT_TEST_DATA));
    unit.selectedEquipmentSet.left_hand.elements = [1]; // fire element on left hand weapon for increment calculation
    unit.selectedBuild.skills[0].resists_break = [-100, 0, 0, 0, 0, 0, 0, 0]; // skill under 100% fire break
    // WHEN
    const result = algorithm.calculate(unit);
    // THEN
    expect(result).toBeTruthy();
    expect(result instanceof ResultOffensive).toBeTruthy();
    expect(result.result).toBeCloseTo(201.740);
    expect(result['turnDamages'].length).toEqual(2);
    result['turnDamages'].forEach((turn: ResultTurnDamages) => {
      expect(turn.atk).toEqual(1000);
      expect(turn.buffed_atk).toEqual(1300);
      expect(turn.rightHandStat).toEqual(100);
      expect(turn.leftHandStat).toEqual(100);
      expect(turn.isDualWielding).toBeTruthy();
      expect(turn.combosIncrement).toBeCloseTo(0.3);
      expect(turn.killerPassive).toBeCloseTo(0);
      expect(turn.levelCorrection).toBeCloseTo(2);
      expect(turn.enemyWeaponVariance).toBeCloseTo(0.9324);
      expect(turn.averageWeaponVariance).toBeCloseTo(105);
    });

    const turn1 = result['turnDamages'][0];
    expect(turn1['power']).toBeCloseTo(3130);
    expect(turn1['physicalDamages']).toEqual(90144000);
    expect(turn1['physicalKillerDamages']).toBeCloseTo(90144000);
    expect(turn1['physicalElementalDamages']).toBeCloseTo(180288000);
    expect(turn1['hitsPower'].length).toEqual(10);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn1['hitsPower'], [50, 160, 330, 420, 170, 200, 400, 600, 600, 200]);

    const turn2 = result['turnDamages'][1];
    expect(turn2['power']).toBeCloseTo(6140);
    expect(turn2['physicalDamages']).toEqual(176832000);
    expect(turn2['physicalKillerDamages']).toBeCloseTo(176832000);
    expect(turn2['physicalElementalDamages']).toBeCloseTo(265248000);
    expect(turn2['hitsPower'].length).toEqual(8);
    CalculatorTestutils.expectArrayOfNumberToBeCloseTo(turn2['hitsPower'], [100, 320, 660, 1120, 340, 800, 1200, 1600]);
  });
});
