import {Equipment} from './equipment.model';
import {ConditionalPassive} from './conditional-passive.model';
import {isNullOrUndefined} from 'util';

export class EquipmentSet {
  // from backend
  public right_hand: Equipment;
  public left_hand: Equipment;
  public head: Equipment;
  public body: Equipment;
  public accessory1: Equipment;
  public accessory2: Equipment;
  public materia1: Equipment;
  public materia2: Equipment;
  public materia3: Equipment;
  public materia4: Equipment;

  // transcient

  constructor(equipments: EquipmentSet) {
    if (equipments.right_hand) {
      this.right_hand = new Equipment(equipments.right_hand);
    }
    if (equipments.left_hand) {
      this.left_hand = new Equipment(equipments.left_hand);
    }
    if (equipments.head) {
      this.head = new Equipment(equipments.head);
    }
    if (equipments.body) {
      this.body = new Equipment(equipments.body);
    }
    if (equipments.accessory1) {
      this.accessory1 = new Equipment(equipments.accessory1);
    }
    if (equipments.accessory2) {
      this.accessory2 = new Equipment(equipments.accessory2);
    }
    if (equipments.materia1) {
      this.materia1 = new Equipment(equipments.materia1);
    }
    if (equipments.materia2) {
      this.materia2 = new Equipment(equipments.materia2);
    }
    if (equipments.materia3) {
      this.materia3 = new Equipment(equipments.materia3);
    }
    if (equipments.materia4) {
      this.materia4 = new Equipment(equipments.materia4);
    }
  }

  public sumEquipmentStat(statName: string): number {
    let result = 0;
    if (!statName.endsWith('dh')
      || (statName.endsWith('_dh') && this.isDoubleHandActive())
      || (statName.endsWith('_tdh') && this.isTrueDoubleHandActive())) {
      result += this.right_hand ? this.right_hand[statName] : 0;
      result += this.left_hand ? this.left_hand[statName] : 0;
      result += this.head ? this.head[statName] : 0;
      result += this.body ? this.body[statName] : 0;
      result += this.accessory1 ? this.accessory1[statName] : 0;
      result += this.accessory2 ? this.accessory2[statName] : 0;
      result += this.materia1 ? this.materia1[statName] : 0;
      result += this.materia2 ? this.materia2[statName] : 0;
      result += this.materia3 ? this.materia3[statName] : 0;
      result += this.materia4 ? this.materia4[statName] : 0;
    }
    return result;
  }

  public sumEquipmentStatPercent(statName: string): number {
    let result = 0;
    result += this.right_hand ? this.right_hand[statName + '_percent'] : 0;
    result += this.left_hand ? this.left_hand[statName + '_percent'] : 0;
    result += this.head ? this.head[statName + '_percent'] : 0;
    result += this.body ? this.body[statName + '_percent'] : 0;
    result += this.accessory1 ? this.accessory1[statName + '_percent'] : 0;
    result += this.accessory2 ? this.accessory2[statName + '_percent'] : 0;
    result += this.materia1 ? this.materia1[statName + '_percent'] : 0;
    result += this.materia2 ? this.materia2[statName + '_percent'] : 0;
    result += this.materia3 ? this.materia3[statName + '_percent'] : 0;
    result += this.materia4 ? this.materia4[statName + '_percent'] : 0;
    return result;
  }

  public getWeaponsElements(): Array<number> {
    const elements: Array<number> = [];
    if (this.right_hand) {
      elements.push(...this.right_hand.elements);
    }
    if (this.left_hand) {
      elements.push(...this.left_hand.elements.filter(element => elements.indexOf(element) === -1));
    }
    return elements;
  }

  public isDoubleHandActive(): boolean {
    return !this.left_hand && this.right_hand && !this.right_hand.isTwoHanded();
  }

  public isTrueDoubleHandActive(): boolean {
    return this.right_hand && !this.left_hand;
  }

  public isDwEquipped(): boolean {
    // TODO currently hard-coded, find a way to retrieve this value from database
    return this.right_hand.id === 1199
      || this.right_hand.id === 1352
      || this.accessory1.id === 935 || this.accessory2.id === 935
      || this.materia1.id === 791 || this.materia2.id === 791 || this.materia3.id === 791 || this.materia4.id === 791
      || this.materia1.id === 1756 || this.materia2.id === 1756 || this.materia3.id === 1756 || this.materia4.id === 1756
      ;
  }

  public isDualWielding(): boolean {
    return this.right_hand && this.right_hand.isWeapon() && !this.right_hand.isTwoHanded()
      && this.left_hand && this.left_hand.isWeapon() && !this.left_hand.isTwoHanded();
  }

  public checkConditionalPassiveActive(condPassive: ConditionalPassive, unitId: number): boolean {
    if (!isNullOrUndefined(condPassive.unit) && condPassive.unit > 0) {
      return unitId === condPassive.unit;
    }
    if (!isNullOrUndefined(condPassive.category) && condPassive.category > 0) {
      return (this.right_hand && this.right_hand.category === condPassive.category)
        || (this.left_hand && this.left_hand.category === condPassive.category)
        || (this.head && this.head.category === condPassive.category)
        || (this.body && this.body.category === condPassive.category)
        ;
    }
    if (!isNullOrUndefined(condPassive.element) && condPassive.element > 0) {
      // TODO implement algorithm to determine if there is an equipped weapon of the right element
      return false;
    }
  }

  public getAllActiveConditionalPassives(unitId: number): Array<ConditionalPassive> {
    const allPassives: Array<ConditionalPassive> = [
      ...this.right_hand ? this.right_hand.conditional_passives : [],
      ...this.left_hand ? this.left_hand.conditional_passives : [],
      ...this.head ? this.head.conditional_passives : [],
      ...this.body ? this.body.conditional_passives : [],
      ...this.accessory1 ? this.accessory1.conditional_passives : [],
      ...this.accessory2 ? this.accessory2.conditional_passives : [],
      ...this.materia1 ? this.materia1.conditional_passives : [],
      ...this.materia2 ? this.materia2.conditional_passives : [],
      ...this.materia3 ? this.materia3.conditional_passives : [],
      ...this.materia4 ? this.materia4.conditional_passives : [],
    ];
    allPassives.forEach((cp: ConditionalPassive) => cp.active = false);
    const activePassives: Array<ConditionalPassive> =
      allPassives.filter(condPassive => this.checkConditionalPassiveActive(condPassive, unitId));
    activePassives.forEach((cp: ConditionalPassive) => cp.active = true);
    return activePassives;
  }

  public activateEquipmentConditionalPassives(equipment: Equipment, unitId: number): Equipment {
    equipment.conditional_passives.forEach(cp => this.checkConditionalPassiveActive(cp, unitId) ? cp.active = true : cp.active = false);
    return equipment;
  }
}
