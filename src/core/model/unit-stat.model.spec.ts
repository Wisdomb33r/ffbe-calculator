import {UnitStat} from './unit-stat.model';

describe('UnitStat', () => {

  it('#evaluateDhTdhDwActivation should set 0 dh/dw effective values and non null tdh effective value if tdh is active', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 0, 100, 50, 30);
    // WHEN
    unitStat.evaluateDhTdhDwActivation(false, true, false);
    // THEN
    expect(unitStat.dh_effective).toEqual(0);
    expect(unitStat.tdh_effective).toEqual(50);
    expect(unitStat.dw_effective).toEqual(0);
  });

  it('#evaluateDhTdhDwActivation should set 0 dw effective value and non null dh/tdh effective values if double hand active', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 0, 100, 50, 30);
    // WHEN
    unitStat.evaluateDhTdhDwActivation(true, true, false);
    // THEN
    expect(unitStat.dh_effective).toEqual(100);
    expect(unitStat.tdh_effective).toEqual(50);
    expect(unitStat.dw_effective).toEqual(0);
  });

  it('#evaluateDhTdhDwActivation should set 0 effective dh/tdh values and non null dw value if dual wielding', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 0, 100, 50, 30);
    // WHEN
    unitStat.evaluateDhTdhDwActivation(false, false, true);
    // THEN
    expect(unitStat.dh_effective).toEqual(0);
    expect(unitStat.tdh_effective).toEqual(0);
    expect(unitStat.dw_effective).toEqual(30);
  });

  it('#evaluateDhTdhDwActivation should set 0 effective dh/tdh/dw values if not dual wielding nor double handing', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 0, 100, 50, 30);
    // WHEN
    unitStat.evaluateDhTdhDwActivation(false, false, false);
    // THEN
    expect(unitStat.dh_effective).toEqual(0);
    expect(unitStat.tdh_effective).toEqual(0);
    expect(unitStat.dw_effective).toEqual(0);
  });

  it('#computeTotal should compute total as base if no bonus', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 0, 0, 0, 0);
    // WHEN
    unitStat.computeTotal(false, false, false);
    // THEN
    expect(unitStat.total).toEqual(100);
  });

  it('#computeTotal should set values and totals considering equipment bonuses and conditional passives', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 50, 50, 50, 20);
    unitStat.base_equipment = 200;
    unitStat.passive_equipment = 50;
    unitStat.dh_equipment = 50;
    unitStat.tdh_equipment = 50;
    unitStat.dw_equipment = 20;
    unitStat.conditional_passive = 50;
    unitStat.dh_effective = 50;
    unitStat.tdh_effective = 50;
    unitStat.dw_effective = 0;
    unitStat.value_from_esper = 50;
    // WHEN
    unitStat.computeTotal(true, true, false);
    // THEN
    expect(unitStat.base).toEqual(100);
    expect(unitStat.base_equipment).toEqual(200);
    expect(unitStat.value_from_passive).toEqual(100); // 50% + 50% conditional
    expect(unitStat.value_from_passive_equipment).toEqual(50);
    expect(unitStat.value_from_dh).toEqual(200); // 50% DH + 50% TDH
    expect(unitStat.value_from_dh_equipment).toEqual(200); // 50% DH + 50% TDH
    expect(unitStat.value_from_dw_equipment).toEqual(0);
    expect(unitStat.total).toEqual(900);
  });

  it('#computeTotal should limit the stat passive increase to 400%', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 150, 0, 0, 0);
    unitStat.passive_equipment = 150;
    unitStat.conditional_passive = 150;
    // WHEN
    unitStat.computeTotal(true, true, false);
    // THEN
    expect(unitStat.base).toEqual(100);
    expect(unitStat.value_from_passive).toEqual(300); // 150% + 150% conditional
    expect(unitStat.value_from_passive_equipment).toEqual(100); // only 50% out of the 150%
    expect(unitStat.total).toEqual(500);
  });

  it('#computeTotal should limit the stat dh increase to 300%', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 0, 100, 100, 0);
    unitStat.base_equipment = 100;
    unitStat.dh_equipment = 100;
    unitStat.tdh_equipment = 100;
    unitStat.dh_effective = 100;
    unitStat.tdh_effective = 100;
    // WHEN
    unitStat.computeTotal(true, true, false);
    // THEN
    expect(unitStat.base).toEqual(100);
    expect(unitStat.value_from_dh).toEqual(200); // 100% DH + 100% TDH
    expect(unitStat.value_from_dh_equipment).toEqual(100); // 100% DH + 100% TDH exceed the limit, only 100% taken
    expect(unitStat.total).toEqual(500);
  });

  it('#computeTotal should limit the stat dw increase to 100%', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 0, 0, 0, 80);
    unitStat.base_equipment = 100;
    unitStat.dw_equipment = 80;
    // WHEN
    unitStat.computeTotal(false, false, true);
    // THEN
    expect(unitStat.base).toEqual(100);
    expect(unitStat.base_equipment).toEqual(100);
    expect(unitStat.value_from_dw).toEqual(80); // 80% DW
    expect(unitStat.value_from_dw_equipment).toEqual(20); // only 20% taken
    expect(unitStat.total).toEqual(300);
  });
});
