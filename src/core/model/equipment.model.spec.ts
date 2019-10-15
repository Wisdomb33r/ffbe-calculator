import {Equipment} from './equipment.model';

describe('Equipment', () => {

  it('should be two handed if damage variance and two handed status set', () => {
    // GIVEN
    const equipment: Equipment = new Equipment(JSON.parse('{"twoHanded": true, "minVariance": 100, "maxVariance": 150}'));
    // WHEN
    const isTwoHanded = equipment.isTwoHanded();
    // THEN
    expect(isTwoHanded).toBeTruthy();
    expect(equipment.minVariance).toEqual(100);
    expect(equipment.maxVariance).toEqual(150);
  });

  it('should be one handed if damage variance set but not two handed status', () => {
    // GIVEN
    const equipment: Equipment = new Equipment(JSON.parse('{"twoHanded": false, "minVariance": 100, "maxVariance": 150}'));
    // WHEN
    const isTwoHanded = equipment.isTwoHanded();
    // THEN
    expect(isTwoHanded).toBeFalsy();
    expect(equipment.minVariance).toEqual(100);
    expect(equipment.maxVariance).toEqual(150);
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
