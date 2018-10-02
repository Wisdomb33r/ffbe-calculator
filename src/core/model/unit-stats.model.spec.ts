import {UnitStats} from './unit-stats.model';
import {GOLEM_TANKING} from '../calculator-constants';
import {ConditionalPassive} from './conditional-passive.model';

describe('UnitStats', () => {
  const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":200,"atk":300,"mag":400,"def":500,"spr":500}';
  const UNIT_STATS_COMPLETE_TEST_DATA = `{
    "hp":1,"mp":2,"atk":3,"mag":4,"def":5,"spr":6,
    "hp_passive":11,"mp_passive":12,"atk_passive":13,"mag_passive":14,"def_passive":15,"spr_passive":16,
    "hp_dh":21,"mp_dh":22,"atk_dh":23,"mag_dh":24,"def_dh":25,"spr_dh":26,
    "hp_tdh":31,"mp_tdh":32,"atk_tdh":33,"mag_tdh":34,"def_tdh":35,"spr_tdh":36,
    "hp_dw":37,"mp_dw":38,"atk_dw":39,"mag_dw":40,"def_dw":41,"spr_dw":42
  }`;
  const CONDITIONAL_PASSIVE_TEST_DATA = '{"category": 1, "element": 1, "hp": 10, "mp": 20, "atk": 30, "mag": 40, "def": 50, "spr": 60}';

  it('#constructor should construct with absolute, passive, dh and tdh values', () => {
    // WHEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_COMPLETE_TEST_DATA));
    // THEN
    expect(unitStats.hp.base).toEqual(1);
    expect(unitStats.mp.base).toEqual(2);
    expect(unitStats.atk.base).toEqual(3);
    expect(unitStats.mag.base).toEqual(4);
    expect(unitStats.def.base).toEqual(5);
    expect(unitStats.spr.base).toEqual(6);
    expect(unitStats.hp.passive).toEqual(11);
    expect(unitStats.mp.passive).toEqual(12);
    expect(unitStats.atk.passive).toEqual(13);
    expect(unitStats.mag.passive).toEqual(14);
    expect(unitStats.def.passive).toEqual(15);
    expect(unitStats.spr.passive).toEqual(16);
    expect(unitStats.hp.dh).toEqual(21);
    expect(unitStats.mp.dh).toEqual(22);
    expect(unitStats.atk.dh).toEqual(23);
    expect(unitStats.mag.dh).toEqual(24);
    expect(unitStats.def.dh).toEqual(25);
    expect(unitStats.spr.dh).toEqual(26);
    expect(unitStats.hp.tdh).toEqual(31);
    expect(unitStats.mp.tdh).toEqual(32);
    expect(unitStats.atk.tdh).toEqual(33);
    expect(unitStats.mag.tdh).toEqual(34);
    expect(unitStats.def.tdh).toEqual(35);
    expect(unitStats.spr.tdh).toEqual(36);
    expect(unitStats.hp.dw).toEqual(37);
    expect(unitStats.mp.dw).toEqual(38);
    expect(unitStats.atk.dw).toEqual(39);
    expect(unitStats.mag.dw).toEqual(40);
    expect(unitStats.def.dw).toEqual(41);
    expect(unitStats.spr.dw).toEqual(42);
  });

  it('#defineEquipmentsStats should set equipment stats', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    // WHEN
    unitStats.defineEquipmentsStats(10, 20, 30, 40, 50, 60, 10);
    // THEN
    expect(unitStats.hp.base_equipment).toEqual(10);
    expect(unitStats.mp.base_equipment).toEqual(20);
    expect(unitStats.atk.base_equipment).toEqual(30);
    expect(unitStats.mag.base_equipment).toEqual(40);
    expect(unitStats.def.base_equipment).toEqual(50);
    expect(unitStats.spr.base_equipment).toEqual(60);
    expect(unitStats.evo.base_equipment).toEqual(10);
  });

  it('#defineConditionalPassives should dispatch conditional passive to the different stats', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    // WHEN
    unitStats.defineConditionalPassives([JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA), JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA)]);
    // THEN
    expect(unitStats.hp.conditional_passive).toEqual(20);
    expect(unitStats.mp.conditional_passive).toEqual(40);
    expect(unitStats.atk.conditional_passive).toEqual(60);
    expect(unitStats.mag.conditional_passive).toEqual(80);
    expect(unitStats.def.conditional_passive).toEqual(100);
    expect(unitStats.spr.conditional_passive).toEqual(120);
  });

  it('#defineEquipmentPassives should set equipment passives', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    // WHEN
    unitStats.defineEquipmentPassives(10, 20, 30, 40, 50, 60, 100,
      [
        new ConditionalPassive(JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA)),
        new ConditionalPassive(JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA)),
      ]);
    // THEN
    expect(unitStats.hp.passive_equipment).toEqual(30);
    expect(unitStats.mp.passive_equipment).toEqual(60);
    expect(unitStats.atk.passive_equipment).toEqual(90);
    expect(unitStats.mag.passive_equipment).toEqual(120);
    expect(unitStats.def.passive_equipment).toEqual(150);
    expect(unitStats.spr.passive_equipment).toEqual(180);
    expect(unitStats.jump).toBeUndefined();
    expect(unitStats.equipment_jump).toEqual(100);
  });

  it('#defineEquipmentDwBonuses should set equipment DW passives', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    const json = '{"category": 1, "element": 1, "hp_dw": 10, "mp_dw": 20, "atk_dw": 30, "mag_dw": 40, "def_dw": 50, "spr_dw": 60}';
    const conditional: ConditionalPassive = new ConditionalPassive(JSON.parse(json));
    // WHEN
    unitStats.defineEquipmentDwBonuses(10, 20, 30, 40, 50, 60,
      [conditional, conditional]);
    // THEN
    expect(unitStats.hp.dw_equipment).toEqual(30);
    expect(unitStats.mp.dw_equipment).toEqual(60);
    expect(unitStats.atk.dw_equipment).toEqual(90);
    expect(unitStats.mag.dw_equipment).toEqual(120);
    expect(unitStats.def.dw_equipment).toEqual(150);
    expect(unitStats.spr.dw_equipment).toEqual(180);
  });

  it('#defineEquipmentDhBonuses should set equipment DH passives', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    const json = '{"category": 1, "element": 1, "hp_dh": 10, "mp_dh": 20, "atk_dh": 30, "mag_dh": 40, "def_dh": 50, "spr_dh": 60}';
    const conditional: ConditionalPassive = new ConditionalPassive(JSON.parse(json));
    // WHEN
    unitStats.defineEquipmentDhBonuses(10, 20, 30, 40, 50, 60,
      [conditional, conditional]);
    // THEN
    expect(unitStats.hp.dh_equipment).toEqual(30);
    expect(unitStats.mp.dh_equipment).toEqual(60);
    expect(unitStats.atk.dh_equipment).toEqual(90);
    expect(unitStats.mag.dh_equipment).toEqual(120);
    expect(unitStats.def.dh_equipment).toEqual(150);
    expect(unitStats.spr.dh_equipment).toEqual(180);
  });

  it('#defineEquipmentTdhBonuses should set equipment TDH passives', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    const json = '{"category": 1, "element": 1, "hp_tdh": 10, "mp_tdh": 20, "atk_tdh": 30, "mag_tdh": 40, "def_tdh": 50, "spr_tdh": 60}';
    const conditional: ConditionalPassive = new ConditionalPassive(JSON.parse(json));
    // WHEN
    unitStats.defineEquipmentTdhBonuses(10, 20, 30, 40, 50, 60,
      [conditional, conditional]);
    // THEN
    expect(unitStats.hp.tdh_equipment).toEqual(30);
    expect(unitStats.mp.tdh_equipment).toEqual(60);
    expect(unitStats.atk.tdh_equipment).toEqual(90);
    expect(unitStats.mag.tdh_equipment).toEqual(120);
    expect(unitStats.def.tdh_equipment).toEqual(150);
    expect(unitStats.spr.tdh_equipment).toEqual(180);
  });

  it('#defineEsperStats should set esper stats', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    // WHEN
    unitStats.defineEsperStats(GOLEM_TANKING);
    // THEN
    expect(unitStats.hp.value_from_esper).toBeCloseTo(130.2);
    expect(unitStats.mp.value_from_esper).toBeCloseTo(85.4);
    expect(unitStats.atk.value_from_esper).toBeCloseTo(71.12);
    expect(unitStats.mag.value_from_esper).toBeCloseTo(42.49);
    expect(unitStats.def.value_from_esper).toBeCloseTo(108.92);
    expect(unitStats.spr.value_from_esper).toBeCloseTo(43.68);
    expect(unitStats.hp.passive_esper).toEqual(10);
  });

  it('#computeTotals should delegate to stats objects', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    spyOn(unitStats.hp, 'computeTotal').and.callThrough();
    spyOn(unitStats.mp, 'computeTotal').and.callThrough();
    spyOn(unitStats.atk, 'computeTotal').and.callThrough();
    spyOn(unitStats.mag, 'computeTotal').and.callThrough();
    spyOn(unitStats.def, 'computeTotal').and.callThrough();
    spyOn(unitStats.spr, 'computeTotal').and.callThrough();
    // WHEN
    unitStats.computeTotals(true, true, true);
    // THEN
    expect(unitStats.hp.computeTotal).toHaveBeenCalled();
    expect(unitStats.mp.computeTotal).toHaveBeenCalled();
    expect(unitStats.atk.computeTotal).toHaveBeenCalled();
    expect(unitStats.mag.computeTotal).toHaveBeenCalled();
    expect(unitStats.def.computeTotal).toHaveBeenCalled();
    expect(unitStats.spr.computeTotal).toHaveBeenCalled();
  });

});
