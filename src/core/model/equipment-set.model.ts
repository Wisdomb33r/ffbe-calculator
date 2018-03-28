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
    this.right_hand = new Equipment(equipments.right_hand);
    if (equipments.left_hand) {
      this.left_hand = new Equipment(equipments.left_hand);
    }
    this.head = new Equipment(equipments.head);
    this.body = new Equipment(equipments.body);
    this.accessory1 = new Equipment(equipments.accessory1);
    this.accessory2 = new Equipment(equipments.accessory2);
    this.materia1 = new Equipment(equipments.materia1);
    this.materia2 = new Equipment(equipments.materia2);
    this.materia3 = new Equipment(equipments.materia3);
    this.materia4 = new Equipment(equipments.materia4);
  }

  public sumEquipmentStat(statName: string): number {
    let result = 0;
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

  public getNumberOfWeapons(): number {
    let result = 0;
    if (this.right_hand) {
      result++;
    }
    if (this.left_hand) {
      result++;
    }
    return result;
  }

  public isOneHanded(): boolean {
    // TODO add to the test if the weapon is single handed or not when backend is ready to deliver this information
    return this.getNumberOfWeapons() === 1;
  }

  public checkConditionalPassiveActive(condPassive: ConditionalPassive): boolean {
    if (!isNullOrUndefined(condPassive.category) && condPassive.category > 0) {
      return this.right_hand.category === condPassive.category
        || (this.left_hand && this.left_hand.category === condPassive.category)
        || this.head.category === condPassive.category
        || this.body.category === condPassive.category
        ;
    }
    if (!isNullOrUndefined(condPassive.element) && condPassive.element > 0) {
      // TODO implement algorithm to determine if there is an equipped weapon of the right element
      return false;
    }
  }

  public getAllActiveConditionalPassives(): Array<ConditionalPassive> {
    const condPassives: Array<ConditionalPassive> = [];
    // TODO is there conditional passives on other equipments than materias ?
    this.materia1.conditional_passives
      .filter(condPassive => this.checkConditionalPassiveActive(condPassive))
      .forEach(condPassive => condPassives.push(condPassive));
    this.materia2.conditional_passives
      .filter(condPassive => this.checkConditionalPassiveActive(condPassive))
      .forEach(condPassive => condPassives.push(condPassive));
    this.materia3.conditional_passives
      .filter(condPassive => this.checkConditionalPassiveActive(condPassive))
      .forEach(condPassive => condPassives.push(condPassive));
    this.materia4.conditional_passives
      .filter(condPassive => this.checkConditionalPassiveActive(condPassive))
      .forEach(condPassive => condPassives.push(condPassive));
    return condPassives;
  }

}
