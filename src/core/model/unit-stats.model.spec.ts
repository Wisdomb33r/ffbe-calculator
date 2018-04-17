import 'rxjs/add/observable/of';
import {UnitStats} from './unit-stats.model';

describe('UnitStats', () => {
  const VALID_UNIT_STATS = '{"hp": 3000, "mp": 200, "atk": 300, "mag": 400, "def": 500, "spr": 500}';
  const VALID_CONDITIONAL_PASSIVE = '{"category": 1, "element": 1, "hp": 10, "mp": 20, "atk": 30, "mag": 40, "def": 50, "spr": 60}';

  it('should define equipment stats', () => {
    // GIVEN
    const unitStats: UnitStats = new UnitStats(JSON.parse(VALID_UNIT_STATS));
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
    const unitStats: UnitStats = new UnitStats(JSON.parse(VALID_UNIT_STATS));
    // WHEN
    unitStats.defineConditionalPassives([JSON.parse(VALID_CONDITIONAL_PASSIVE), JSON.parse(VALID_CONDITIONAL_PASSIVE)]);
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
    const unitStats: UnitStats = new UnitStats(JSON.parse(VALID_UNIT_STATS));
    // WHEN
    unitStats.defineEquipmentPassives(10, 20, 30, 40, 50, 60,
      [JSON.parse(VALID_CONDITIONAL_PASSIVE), JSON.parse(VALID_CONDITIONAL_PASSIVE)]);
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
    const unitStats: UnitStats = new UnitStats(JSON.parse(VALID_UNIT_STATS));
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
    const unitStats: UnitStats = new UnitStats(JSON.parse(VALID_UNIT_STATS));
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
    const unitStats: UnitStats = new UnitStats(JSON.parse(VALID_UNIT_STATS));
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
    const unitStats: UnitStats = new UnitStats(JSON.parse(VALID_UNIT_STATS));
    unitStats.atk_dh = 100;
    unitStats.atk_tdh = 50;
    // WHEN
    unitStats.defineDhActivation(false, false);
    // THEN
    expect(unitStats.effective_atk_dh).toEqual(0);
    expect(unitStats.effective_atk_tdh).toEqual(0);
  });

});
