import {EquipmentSet} from './equipment-set.model';
import {Equipment} from './equipment.model';
import {ConditionalPassive} from './conditional-passive.model';
import {SPECIAL_WEAPON_ENHANCEMENTS} from '../calculator-constants';

const VALID_TWO_HANDED_EQUIPMENT_SET = '{"right_hand":{"id":1873,"category":27,"name":"Scie motorisée","icon":"/gestion/resources/brex_objet/img/000/001/native/873_c29f0a.png","hp":null,"hp_percent":null,"mp":null,"mp_percent":null,"atk":130,"atk_percent":null,"mag":null,"mag_percent":null,"def":null,"def_percent":null,"spr":null,"spr_percent":null,"atk_dh":null,"atk_tdh":null,"mag_dh":null,"mag_tdh":null,"variance_min":100,"variance_max":160,"unique":false,"conditional_passives":null},"left_hand":null,"head":{"id":1640,"category":12,"name":"Épingle de Prishe","icon":"/gestion/resources/brex_objet/img/000/001/native/640_27b187.png","hp":null,"hp_percent":10,"mp":null,"mp_percent":10,"atk":45,"atk_percent":null,"mag":null,"mag_percent":null,"def":null,"def_percent":null,"spr":null,"spr_percent":null,"atk_dh":null,"atk_tdh":null,"mag_dh":null,"mag_tdh":null,"variance_min":null,"variance_max":null,"unique":false,"conditional_passives":null},"body":{"id":1717,"category":35,"name":"Vêtements d\'entraînement","icon":"/gestion/resources/brex_objet/img/000/001/native/717_81c9ff.png","hp":null,"hp_percent":null,"mp":null,"mp_percent":20,"atk":20,"atk_percent":null,"mag":null,"mag_percent":null,"def":32,"def_percent":null,"spr":null,"spr_percent":null,"atk_dh":null,"atk_tdh":null,"mag_dh":null,"mag_tdh":null,"variance_min":null,"variance_max":null,"unique":false,"conditional_passives":null},"accessory1":{"id":1871,"category":25,"name":"Gant de maréchal","icon":"/gestion/resources/brex_objet/img/000/001/native/871_636760.png","hp":null,"hp_percent":null,"mp":null,"mp_percent":null,"atk":40,"atk_percent":null,"mag":null,"mag_percent":null,"def":null,"def_percent":null,"spr":null,"spr_percent":null,"atk_dh":null,"atk_tdh":50,"mag_dh":null,"mag_tdh":null,"variance_min":null,"variance_max":null,"unique":false,"conditional_passives":null},"accessory2":{"id":1871,"category":25,"name":"Gant de maréchal","icon":"/gestion/resources/brex_objet/img/000/001/native/871_636760.png","hp":null,"hp_percent":null,"mp":null,"mp_percent":null,"atk":40,"atk_percent":null,"mag":null,"mag_percent":null,"def":null,"def_percent":null,"spr":null,"spr_percent":null,"atk_dh":null,"atk_tdh":50,"mag_dh":null,"mag_tdh":null,"variance_min":null,"variance_max":null,"unique":false,"conditional_passives":null},"materia1":{"id":1870,"category":57,"name":"Forme de casseur","icon":"/gestion/resources/brex_objet/img/000/001/native/870_77d1d7.png","hp":null,"hp_percent":null,"mp":null,"mp_percent":null,"atk":null,"atk_percent":null,"mag":null,"mag_percent":null,"def":null,"def_percent":null,"spr":null,"spr_percent":null,"atk_dh":null,"atk_tdh":100,"mag_dh":null,"mag_tdh":null,"variance_min":null,"variance_max":null,"unique":true,"conditional_passives":null},"materia2":{"id":1205,"category":57,"name":"Maîtrise des épées longues","icon":"/gestion/resources/brex_objet/img/000/001/native/205_2bfefd.png","hp":null,"hp_percent":null,"mp":null,"mp_percent":null,"atk":null,"atk_percent":null,"mag":null,"mag_percent":null,"def":null,"def_percent":null,"spr":null,"spr_percent":null,"atk_dh":null,"atk_tdh":null,"mag_dh":null,"mag_tdh":null,"variance_min":null,"variance_max":null,"unique":true,"conditional_passives":[{"category":27,"element":null,"hp":null,"mp":null,"atk":50,"mag":null,"def":null,"spr":null}]},"materia3":{"id":1641,"category":57,"name":"Escrimeur fier","icon":"/gestion/resources/brex_objet/img/000/001/native/641_6f3083.png","hp":null,"hp_percent":20,"mp":null,"mp_percent":null,"atk":null,"atk_percent":null,"mag":null,"mag_percent":null,"def":null,"def_percent":null,"spr":null,"spr_percent":null,"atk_dh":null,"atk_tdh":null,"mag_dh":null,"mag_tdh":null,"variance_min":null,"variance_max":null,"unique":true,"conditional_passives":[{"category":27,"element":null,"hp":null,"mp":null,"atk":40,"mag":null,"def":null,"spr":null}]},"materia4":{"id":1425,"category":57,"name":"Aventurier++++","icon":"/gestion/resources/brex_objet/img/000/001/native/425_5b2514.png","hp":null,"hp_percent":null,"mp":null,"mp_percent":null,"atk":null,"atk_percent":40,"mag":null,"mag_percent":40,"def":null,"def_percent":40,"spr":null,"spr_percent":40,"atk_dh":null,"atk_tdh":null,"mag_dh":null,"mag_tdh":null,"variance_min":null,"variance_max":null,"unique":true,"conditional_passives":null}}';
const VALID_EQUIPMENT = '{"id":1873,"category":27,"name":"Scie motorisée","icon":"/gestion/resources/brex_objet/img/000/001/native/873_c29f0a.png","hp":null,"hp_percent":null,"mp":null,"mp_percent":null,"atk":130,"atk_percent":null,"mag":null,"mag_percent":null,"def":null,"def_percent":null,"spr":null,"spr_percent":null,"atk_dh":null,"atk_tdh":null,"mag_dh":null,"mag_tdh":null,"variance_min":100,"variance_max":160,"unique":false,"conditional_passives":null}';
const CONDITIONAL_PASSIVE_TEST_DATA = '{"category":15,"element":null,"hp":10,"mp":20,"atk":30,"mag":40,"def":50,"spr":60}';

describe('EquipmentSet', () => {

  it('#isTrueDoubleHandActive should be true if left hand empty', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    // WHEN
    const isTrueDoubleHandActive = equipments.isTrueDoubleHandActive();
    // THEN
    expect(isTrueDoubleHandActive).toBeTruthy();
  });

  it('#isTrueDoubleHandActive should be false if left hand not empty', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.left_hand = new Equipment(JSON.parse(VALID_EQUIPMENT));
    // WHEN
    const isTrueDoubleHandActive = equipments.isTrueDoubleHandActive();
    // THEN
    expect(isTrueDoubleHandActive).toBeFalsy();
  });

  it('#isDoubleHandActive should be true if left hand empty and weapon one handed', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.right_hand.variance_min = undefined;
    equipments.right_hand.variance_max = undefined;
    // WHEN
    const isDoubleHandActive = equipments.isDoubleHandActive();
    // THEN
    expect(isDoubleHandActive).toBeTruthy();
  });

  it('#isDoubleHandActive should be false if left hand not empty', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.right_hand.variance_min = undefined;
    equipments.right_hand.variance_max = undefined;
    equipments.left_hand = new Equipment(JSON.parse(VALID_EQUIPMENT));
    // WHEN
    const isDoubleHandActive = equipments.isDoubleHandActive();
    // THEN
    expect(isDoubleHandActive).toBeFalsy();
  });

  it('#isDoubleHandActive should be false if weapon two handed', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    // WHEN
    const isDoubleHandActive = equipments.isDoubleHandActive();
    // THEN
    expect(isDoubleHandActive).toBeFalsy();
  });

  it('#sumEquipmentStat should sum all equipment stat', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.left_hand = equipments.right_hand;
    // WHEN
    const sum = equipments.sumEquipmentStat('atk');
    // THEN
    expect(sum).toEqual(405);
  });

  it('#sumEquipmentStat should return 0 if no item equipped', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse('{}'));
    // WHEN
    const sum = equipments.sumEquipmentStat('atk');
    // THEN
    expect(sum).toEqual(0);
  });

  it('#sumEquipmentStatPercent should sum all equipment stat percent', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.left_hand = equipments.right_hand;
    // WHEN
    const sum = equipments.sumEquipmentStatPercent('atk');
    // THEN
    expect(sum).toEqual(40);
  });

  it('#sumEquipmentStatPercent should return 0 if no item equipped', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse('{}'));
    // WHEN
    const sum = equipments.sumEquipmentStatPercent('atk');
    // THEN
    expect(sum).toEqual(0);
  });

  it('#removeAllRemoveable should remove weapon enhancements', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.left_hand = equipments.right_hand;
    equipments.lh_trait1 = equipments.right_hand;
    equipments.lh_trait2 = equipments.right_hand;
    equipments.lh_trait3 = equipments.right_hand;
    equipments.rh_trait1 = equipments.right_hand;
    equipments.rh_trait2 = equipments.right_hand;
    equipments.rh_trait3 = equipments.right_hand;
    // WHEN
    equipments.removeAllRemoveable();
    // THEN
    expect(equipments.right_hand).toBeTruthy();
    expect(equipments.rh_trait1).toBeFalsy();
    expect(equipments.rh_trait2).toBeFalsy();
    expect(equipments.rh_trait3).toBeFalsy();
    expect(equipments.left_hand).toBeTruthy();
    expect(equipments.lh_trait1).toBeFalsy();
    expect(equipments.lh_trait2).toBeFalsy();
    expect(equipments.lh_trait3).toBeFalsy();
    expect(equipments.head).toBeTruthy();
    expect(equipments.body).toBeTruthy();
    expect(equipments.accessory1).toBeTruthy();
    expect(equipments.accessory2).toBeTruthy();
    expect(equipments.materia1).toBeTruthy();
    expect(equipments.materia2).toBeTruthy();
    expect(equipments.materia3).toBeTruthy();
    expect(equipments.materia4).toBeTruthy();
  });

  it('#getAllActiveConditionalPassives should return conditional passives activated by equipment', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.head.conditional_passives = [JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA), JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA)];
    equipments.head.conditional_passives[0].category = 10;
    equipments.body.conditional_passives = [JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA), JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA)];
    equipments.body.conditional_passives[0].category = 10;
    equipments.accessory1.conditional_passives = [JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA), JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA)];
    equipments.accessory1.conditional_passives[0].category = 10;
    equipments.materia3.conditional_passives = [JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA), JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA)];
    equipments.materia3.conditional_passives[0].category = 10;
    equipments.right_hand.category = 15; // to activate half the the defined conditional passives
    // WHEN
    const passives: Array<ConditionalPassive> = equipments.getAllActiveConditionalPassives(999);
    // THEN
    expect(passives.length).toEqual(4);
    expect(passives.every(passive => passive.category === 15)).toBeTruthy();
    expect(passives.every(passive => passive.active)).toBeTruthy();
  });

  it('#activateEquipmentConditionalPassives should activate the conditional passives if valid according to equipment', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    const equipment: Equipment = new Equipment(JSON.parse(VALID_EQUIPMENT));
    equipment.conditional_passives = [JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA), JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA)];
    equipment.conditional_passives[0].category = 10;
    equipments.right_hand.category = 15;
    // WHEN
    const equipmentActivated = equipments.activateEquipmentConditionalPassives(equipment, 999);
    // THEN
    expect(equipmentActivated.conditional_passives[0].active).toBeFalsy();
    expect(equipmentActivated.conditional_passives[1].active).toBeTruthy();
  });

  it('#checkConditionalPassiveActive should return true for unit + category specific passive if the unit is the right one', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    const conditionalPassive = new ConditionalPassive(JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA));
    conditionalPassive.unit = 777; // correct unit
    equipments.right_hand.category = 15; // correct category
    // WHEN
    const isActive = equipments.checkConditionalPassiveActive(conditionalPassive, 777);
    // THEN
    expect(isActive).toBeTruthy();
  });

  it('#checkConditionalPassiveActive should return false for unit + category specific passive if the unit is not the right one', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    const conditionalPassive = new ConditionalPassive(JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA));
    conditionalPassive.unit = 888; // wrong unit
    equipments.right_hand.category = 15; // correct category
    // WHEN
    const isActive = equipments.checkConditionalPassiveActive(conditionalPassive, 777);
    // THEN
    expect(isActive).toBeFalsy();
  });

  it('#checkConditionalPassiveActive should return false for unit + category specific passive if the category is not the right one', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    const conditionalPassive = new ConditionalPassive(JSON.parse(CONDITIONAL_PASSIVE_TEST_DATA));
    conditionalPassive.unit = 777; // correct unit
    equipments.right_hand.category = 111; // wrong category
    // WHEN
    const isActive = equipments.checkConditionalPassiveActive(conditionalPassive, 777);
    // THEN
    expect(isActive).toBeFalsy();
  });

  it('#getWeaponsElements should return an empty array if no elemental weapon is equipped', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    // WHEN
    const elements: Array<number> = equipments.getWeaponsElements();
    // THEN
    expect(elements.length).toEqual(0);
  });

  it('#getWeaponsElements should return an valid array without duplicates if elemental weapons are equipped', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.left_hand = new Equipment(JSON.parse(VALID_EQUIPMENT));
    equipments.right_hand.elements = [1, 4];
    equipments.left_hand.elements = [2, 6, 4];
    // WHEN
    const elements: Array<number> = equipments.getWeaponsElements();
    // THEN
    expect(elements.length).toEqual(4);
    expect(elements.find(x => x === 1)).toBeTruthy();
    expect(elements.find(x => x === 2)).toBeTruthy();
    expect(elements.find(x => x === 4)).toBeTruthy();
    expect(elements.find(x => x === 6)).toBeTruthy();
  });

  it('#emptySlot should remove enhancements it weapon is removed', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.rh_trait1 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    equipments.rh_trait2 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    equipments.rh_trait3 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    // WHEN
    equipments.emptySlot('right_hand');
    // THEN
    expect(equipments.right_hand).toBeFalsy();
    expect(equipments.rh_trait1).toBeFalsy();
    expect(equipments.rh_trait2).toBeFalsy();
    expect(equipments.rh_trait3).toBeFalsy();
  });

  it('#emptySlot should remove items of category if extra equipment item is removed', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.right_hand.category = 27;
    equipments.materia1.extra_equip = 27;
    // WHEN
    equipments.emptySlot('materia1');
    // THEN
    expect(equipments.right_hand).toBeFalsy();
    expect(equipments.materia1).toBeFalsy();
  });

  it('#emptySlot should not remove items of category if extra equipment still present', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.right_hand.category = 27;
    equipments.materia1.extra_equip = 27;
    equipments.materia2.extra_equip = 27;
    // WHEN
    equipments.emptySlot('materia1');
    // THEN
    expect(equipments.right_hand).toBeTruthy();
    expect(equipments.materia1).toBeFalsy();
  });

  it('#equipInSlot should remove weapon special enhancement at weapon type switch', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.right_hand.category = 27;
    equipments.rh_trait1 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    equipments.rh_trait1.id = SPECIAL_WEAPON_ENHANCEMENTS[0];
    equipments.rh_trait2 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    equipments.rh_trait3 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    const newWeapon: Equipment = new Equipment(JSON.parse(VALID_EQUIPMENT));
    newWeapon.category = 1;
    // WHEN
    equipments.equipInSlot('right_hand', newWeapon);
    // THEN
    expect(equipments.right_hand).toBeTruthy();
    expect(equipments.right_hand.category).toEqual(1);
    expect(equipments.rh_trait1).toBeFalsy();
    expect(equipments.rh_trait2).toBeTruthy();
    expect(equipments.rh_trait3).toBeTruthy();
  });

  it('#equipInSlot should not remove weapon special enhancement if equipping same weapon type', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.right_hand.category = 27;
    equipments.rh_trait1 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    equipments.rh_trait1.id = SPECIAL_WEAPON_ENHANCEMENTS[0];
    equipments.rh_trait2 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    equipments.rh_trait3 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    const newWeapon: Equipment = new Equipment(JSON.parse(VALID_EQUIPMENT));
    newWeapon.category = 27;
    // WHEN
    equipments.equipInSlot('right_hand', newWeapon);
    // THEN
    expect(equipments.right_hand).toBeTruthy();
    expect(equipments.rh_trait1).toBeTruthy();
    expect(equipments.rh_trait2).toBeTruthy();
    expect(equipments.rh_trait3).toBeTruthy();
  });

  it('#equipInSlot should remove weapon special enhancement while equipping non-enhanceable weapon', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.right_hand.category = 27;
    equipments.rh_trait1 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    equipments.rh_trait2 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    equipments.rh_trait3 = new Equipment(JSON.parse(VALID_EQUIPMENT));
    const newWeapon: Equipment = new Equipment(JSON.parse(VALID_EQUIPMENT));
    newWeapon.id = 100000;
    // WHEN
    equipments.equipInSlot('right_hand', newWeapon);
    // THEN
    expect(equipments.right_hand).toBeTruthy();
    expect(equipments.right_hand.id).toEqual(100000);
    expect(equipments.rh_trait1).toBeFalsy();
    expect(equipments.rh_trait2).toBeFalsy();
    expect(equipments.rh_trait3).toBeFalsy();
  });

  it('#equipInSlot should remove items of category if extra equipment item is removed', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.right_hand.category = 27;
    equipments.materia1.extra_equip = 27;
    const newMateria: Equipment = new Equipment(JSON.parse(VALID_EQUIPMENT));
    // WHEN
    equipments.equipInSlot('materia1', newMateria);
    // THEN
    expect(equipments.right_hand).toBeFalsy();
    expect(equipments.materia1).toEqual(newMateria);
  });

  it('#equipInSlot should not remove items of category if extra equipment still present', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    equipments.right_hand.category = 27;
    equipments.materia1.extra_equip = 27;
    equipments.materia2.extra_equip = 27;
    const newMateria: Equipment = new Equipment(JSON.parse(VALID_EQUIPMENT));
    // WHEN
    equipments.equipInSlot('materia1', newMateria);
    // THEN
    expect(equipments.right_hand).toBeTruthy();
    expect(equipments.materia1).toEqual(newMateria);
  });

  it('#isEquipped should return true if equipment contains the item', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    // WHEN
    const isEquipped = equipments.isEquipped(1873);
    // THEN
    expect(isEquipped).toBeTruthy();
  });

  it('#isEquipped should return false if equipment does not contains the item', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    // WHEN
    const isEquipped = equipments.isEquipped(18733);
    // THEN
    expect(isEquipped).toBeFalsy();
  });

  it('#transferLockedStatusToAlternative should lock the alternative item if equipped', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    // WHEN
    equipments.transferLockedStatusToAlternative(1873);
    // THEN
    expect(equipments.right_hand.locked).toBeTruthy();
  });

  it('#transferLockedStatusToAlternative should do nothing if the alternative item if not equipped', () => {
    // GIVEN
    const equipments: EquipmentSet = new EquipmentSet(JSON.parse(VALID_TWO_HANDED_EQUIPMENT_SET));
    // WHEN
    equipments.transferLockedStatusToAlternative(18733);
    // THEN
    expect(equipments.right_hand.locked).toBeFalsy();
  });
});
