import 'rxjs/add/observable/of';
import {UnitStats} from './unit-stats.model';
import {ConditionalPassive} from './conditional-passive.model';

describe('UnitStats', () => {
  const UNIT_STATS_TEST_DATA = '{"hp":3000,"mp":200,"atk":300,"mag":400,"def":500,"spr":500}';
  const UNIT_STATS_COMPLETE_TEST_DATA = '{"hp":1,"mp":2,"atk":3,"mag":4,"def":5,"spr":6,"hp_passive":11,"mp_passive":12,"atk_passive":13,"mag_passive":14,"def_passive":15,"spr_passive":16,"hp_dh":21,"mp_dh":22,"atk_dh":23,"mag_dh":24,"def_dh":25,"spr_dh":26,"hp_tdh":31,"mp_tdh":32,"atk_tdh":33,"mag_tdh":34,"def_tdh":35,"spr_tdh":36}';
  const CONDITIONAL_PASSIVE_TEST_DATA = '{"category": 1, "element": 1, "hp": 10, "mp": 20, "atk": 30, "mag": 40, "def": 50, "spr": 60}';

  it('should construct with absolute, passive, dh and tdh values', () => {
    // WHEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_COMPLETE_TEST_DATA));
    // THEN
    expect(unitStats.hp).toEqual(1);
    expect(unitStats.mp).toEqual(2);
    expect(unitStats.atk).toEqual(3);
    expect(unitStats.mag).toEqual(4);
    expect(unitStats.def).toEqual(5);
    expect(unitStats.spr).toEqual(6);
    expect(unitStats.hp_passive).toEqual(11);
    expect(unitStats.mp_passive).toEqual(12);
    expect(unitStats.atk_passive).toEqual(13);
    expect(unitStats.mag_passive).toEqual(14);
    expect(unitStats.def_passive).toEqual(15);
    expect(unitStats.spr_passive).toEqual(16);
    expect(unitStats.hp_dh).toEqual(21);
    expect(unitStats.mp_dh).toEqual(22);
    expect(unitStats.atk_dh).toEqual(23);
    expect(unitStats.mag_dh).toEqual(24);
    expect(unitStats.def_dh).toEqual(25);
    expect(unitStats.spr_dh).toEqual(26);
    expect(unitStats.hp_tdh).toEqual(31);
    expect(unitStats.mp_tdh).toEqual(32);
    expect(unitStats.atk_tdh).toEqual(33);
    expect(unitStats.mag_tdh).toEqual(34);
    expect(unitStats.def_tdh).toEqual(35);
    expect(unitStats.spr_tdh).toEqual(36);
  });

  it('should define equipment stats', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    // WHEN
    unitStats.defineEquipmentsStats(10, 20, 30, 40, 50, 60, 70, 80, 90, 100);
    // THEN
    expect(unitStats.hp_equipment).toEqual(10);
    expect(unitStats.mp_equipment).toEqual(20);
    expect(unitStats.atk_equipment).toEqual(30);
    expect(unitStats.mag_equipment).toEqual(40);
    expect(unitStats.def_equipment).toEqual(50);
    expect(unitStats.spr_equipment).toEqual(60);
    expect(unitStats.atk_dh_equipment).toEqual(70);
    expect(unitStats.atk_tdh_equipment).toEqual(80);
    expect(unitStats.mag_dh_equipment).toEqual(90);
    expect(unitStats.mag_tdh_equipment).toEqual(100);
  });

  it('should define unit conditional passives', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    // WHEN
    unitStats.defineConditionalPassives([JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA), JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA)]);
    // THEN
    expect(unitStats.hp_cond_passive).toEqual(20);
    expect(unitStats.mp_cond_passive).toEqual(40);
    expect(unitStats.atk_cond_passive).toEqual(60);
    expect(unitStats.mag_cond_passive).toEqual(80);
    expect(unitStats.def_cond_passive).toEqual(100);
    expect(unitStats.spr_cond_passive).toEqual(120);
  });

  it('should define equipment passives', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    // WHEN
    unitStats.defineEquipmentPassives(10, 20, 30, 40, 50, 60,
      [JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA), JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA)]);
    // THEN
    expect(unitStats.hp_equipment_passive).toEqual(30);
    expect(unitStats.mp_equipment_passive).toEqual(60);
    expect(unitStats.atk_equipment_passive).toEqual(90);
    expect(unitStats.mag_equipment_passive).toEqual(120);
    expect(unitStats.def_equipment_passive).toEqual(150);
    expect(unitStats.spr_equipment_passive).toEqual(180);
  });

  it('should define esper stats', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    // WHEN
    unitStats.defineEsperStats(10, 20, 30, 40, 50, 60);
    // THEN
    expect(unitStats.hp_from_esper).toEqual(10);
    expect(unitStats.mp_from_esper).toEqual(20);
    expect(unitStats.atk_from_esper).toEqual(30);
    expect(unitStats.mag_from_esper).toEqual(40);
    expect(unitStats.def_from_esper).toEqual(50);
    expect(unitStats.spr_from_esper).toEqual(60);
  });

  it('should set 0 dh value and non null tdh value if only true double hand is active', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    unitStats.atk_dh = 100;
    unitStats.atk_tdh = 50;
    // WHEN
    unitStats.defineDhActivation(false, true);
    // THEN
    expect(unitStats.effective_atk_dh).toEqual(0);
    expect(unitStats.effective_atk_tdh).toEqual(50);
  });

  it('should set non null dh value and non null tdh value if both double hand are active', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    unitStats.atk_dh = 100;
    unitStats.atk_tdh = 50;
    // WHEN
    unitStats.defineDhActivation(true, true);
    // THEN
    expect(unitStats.effective_atk_dh).toEqual(100);
    expect(unitStats.effective_atk_tdh).toEqual(50);
  });

  it('should set 0 dh and tdh value if no double hand is active', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    unitStats.atk_dh = 100;
    unitStats.atk_tdh = 50;
    // WHEN
    unitStats.defineDhActivation(false, false);
    // THEN
    expect(unitStats.effective_atk_dh).toEqual(0);
    expect(unitStats.effective_atk_tdh).toEqual(0);
  });

  it('should compute totals as base stats if no bonus', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    unitStats.defineEquipmentsStats(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    unitStats.defineEquipmentPassives(0, 0, 0, 0, 0, 0, []);
    unitStats.defineConditionalPassives([]);
    unitStats.defineDhActivation(false, false);
    unitStats.defineEsperStats(0, 0, 0, 0, 0, 0);
    // WHEN
    unitStats.computeTotals();
    // THEN
    expect(unitStats.hp_total).toEqual(3000);
    expect(unitStats.mp_total).toEqual(200);
    expect(unitStats.atk_total).toEqual(300);
    expect(unitStats.mag_total).toEqual(400);
    expect(unitStats.def_total).toEqual(500);
    expect(unitStats.spr_total).toEqual(500);
  });

  it('should compute atk totals with equipment bonuses and conditional passives', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    unitStats.defineEquipmentsStats(0, 0, 200, 0, 0, 0, 50, 100, 0, 0);
    unitStats.defineEquipmentPassives(0, 0, 100, 0, 0, 0, []);
    unitStats.defineConditionalPassives([new ConditionalPassive(JSON.parse('{"category": 15,"atk": 50}'))]);
    unitStats.defineDhActivation(true, true);
    unitStats.defineEsperStats(0, 0, 150, 0, 0, 0);
    // WHEN
    unitStats.computeTotals();
    // THEN
    expect(unitStats.hp_total).toEqual(3000);
    expect(unitStats.mp_total).toEqual(200);
    expect(unitStats.atk_total).toEqual(1400); // 300 base with +150% + 200 equipment with +150% DH + esper 150
    expect(unitStats.mag_total).toEqual(400);
    expect(unitStats.def_total).toEqual(500);
    expect(unitStats.spr_total).toEqual(500);
  });

  it('should compute atk totals with passive increase limit exceeded', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    unitStats.atk_passive = 150;
    unitStats.defineEquipmentsStats(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    unitStats.defineEquipmentPassives(0, 0, 150, 0, 0, 0, []);
    unitStats.defineConditionalPassives([new ConditionalPassive(JSON.parse('{"category": 15,"atk": 150}'))]);
    unitStats.defineDhActivation(false, false);
    unitStats.defineEsperStats(0, 0, 0, 0, 0, 0);
    // WHEN
    unitStats.computeTotals();
    // THEN
    expect(unitStats.atk_total).toEqual(1200); // 300 base with +300% (out of the 450%)
  });

  it('should compute atk totals with dh increase limit exceeded', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    unitStats.atk_dh = 150;
    unitStats.defineEquipmentsStats(0, 0, 200, 0, 0, 0, 150, 150, 0, 0);
    unitStats.defineEquipmentPassives(0, 0, 0, 0, 0, 0, []);
    unitStats.defineConditionalPassives([]);
    unitStats.defineDhActivation(true, true);
    unitStats.defineEsperStats(0, 0, 0, 0, 0, 0);
    // WHEN
    unitStats.computeTotals();
    // THEN
    expect(unitStats.atk_total).toEqual(1100); // 300 base + 200 equipment + 300% (out of the 450% DH)
  });

});
