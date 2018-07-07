import {Equipment} from './equipment.model';

describe('Equipment', () => {

  it('should be two handed if damage variance set', () => {
    // GIVEN
    const equipment: Equipment = new Equipment(JSON.parse('{"variance_min": 100, "variance_max": 150}'));
    // WHEN
    const isTwoHanded = equipment.isTwoHanded();
    // THEN
    expect(isTwoHanded).toBeTruthy();
  });

  it('should be one handed if damage variance min is not set', () => {
    // GIVEN
    const equipment: Equipment = new Equipment(JSON.parse('{"variance_min": null, "variance_max": 150}'));
    // WHEN
    const isTwoHanded = equipment.isTwoHanded();
    // THEN
    expect(isTwoHanded).toBeFalsy();
  });

  it('should be two handed if damage variance max is not set', () => {
    // GIVEN
    const equipment: Equipment = new Equipment(JSON.parse('{"variance_min": 100, "variance_max": null}'));
    // WHEN
    const isTwoHanded = equipment.isTwoHanded();
    // THEN
    expect(isTwoHanded).toBeFalsy();
  });

  it('should be a weapon if in the weapon categories', () => {
    // GIVEN
    const equipment: Equipment = new Equipment(JSON.parse('{"category": 17}'));
    // WHEN
    const isWeapon = equipment.isWeapon();
    // THEN
    expect(isWeapon).toBeTruthy();
  });

  it('should not be a weapon if not in the weapon categories', () => {
    // GIVEN
    const equipment: Equipment = new Equipment(JSON.parse('{"category": 9}'));
    // WHEN
    const isWeapon = equipment.isWeapon();
    // THEN
    expect(isWeapon).toBeFalsy();
  });

  it('should be a shield if in the shield categories', () => {
    // GIVEN
    const equipment: Equipment = new Equipment(JSON.parse('{"category": 9}'));
    // WHEN
    const isShield = equipment.isShield();
    // THEN
    expect(isShield).toBeTruthy();
  });

  it('should not be a shield if not in the shield categories', () => {
    // GIVEN
    const equipment: Equipment = new Equipment(JSON.parse('{"category": 57}'));
    // WHEN
    const isShield = equipment.isShield();
    // THEN
    expect(isShield).toBeFalsy();
  });
});
