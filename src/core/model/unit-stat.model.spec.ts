import {UnitStat} from './unit-stat.model';

describe('UnitStat', () => {

  it('#defineDhActivation should set 0 dh effective value and non null effective tdh value if only true double hand is active', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 0, 100, 50, 0);
    // WHEN
    unitStat.defineDhActivation(false, true, false);
    // THEN
    expect(unitStat.dh_effective).toEqual(0);
    expect(unitStat.tdh_effective).toEqual(50);
  });

  it('#defineDhActivation should set non null dh effective value and non null tdh effective value if both double hand are active', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 0, 100, 50, 0);
    // WHEN
    unitStat.defineDhActivation(true, true, false);
    // THEN
    expect(unitStat.dh_effective).toEqual(100);
    expect(unitStat.tdh_effective).toEqual(50);
  });

  it('#defineDhActivation should set 0 effective dh and tdh value if no double hand is active', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 0, 100, 50, 0);
    // WHEN
    unitStat.defineDhActivation(false, false, false);
    // THEN
    expect(unitStat.dh_effective).toEqual(0);
    expect(unitStat.tdh_effective).toEqual(0);
  });

  it('#computeTotal should compute total as base if no bonus', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 0, 0, 0, 0);
    // WHEN
    unitStat.computeTotal();
    // THEN
    expect(unitStat.total).toEqual(100);
  });

  it('#computeTotal should set values and totals considering equipment bonuses and conditional passives', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 50, 50, 50, 0);
    unitStat.base_equipment = 200;
    unitStat.passive_equipment = 50;
    unitStat.dh_equipment = 50;
    unitStat.tdh_equipment = 50;
    unitStat.conditional_passive = 50;
    unitStat.dh_effective = 50;
    unitStat.tdh_effective = 50;
    unitStat.value_from_esper = 50;
    // WHEN
    unitStat.computeTotal();
    // THEN
    expect(unitStat.base).toEqual(100);
    expect(unitStat.base_equipment).toEqual(200);
    expect(unitStat.value_from_passive).toEqual(100); // 50% + 50% conditional
    expect(unitStat.value_from_passive_equipment).toEqual(50);
    expect(unitStat.value_from_dh).toEqual(200); // 50% DH + 50% TDH
    expect(unitStat.value_from_dh_equipment).toEqual(200); // 50% DH + 50% TDH
    expect(unitStat.total).toEqual(900);
  });

  it('#computeTotal should limit the stat passive increase to 300%', () => {
    // GIVEN
    const unitStat: UnitStat = new UnitStat(100, 150, 0, 0, 0);
    unitStat.passive_equipment = 150;
    unitStat.conditional_passive = 150;
    // WHEN
    unitStat.computeTotal();
    // THEN
    expect(unitStat.base).toEqual(100);
    expect(unitStat.value_from_passive).toEqual(300); // 150% + 150% conditional
    expect(unitStat.value_from_passive_equipment).toEqual(0); // equipment passive exceed the limit
    expect(unitStat.total).toEqual(400);
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
    unitStat.computeTotal();
    // THEN
    expect(unitStat.base).toEqual(100);
    expect(unitStat.value_from_dh).toEqual(200); // 100% DH + 100% TDH
    expect(unitStat.value_from_dh_equipment).toEqual(100); // 100% DH + 100% TDH exceed the limit, only 100% taken
    expect(unitStat.total).toEqual(500);
  });
});
