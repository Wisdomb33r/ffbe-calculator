import {Equipment} from './equipment.model';
import {ConditionalPassive} from './conditional-passive.model';
import {isNullOrUndefined} from 'util';

export class EquipmentSet {
  // from backend
  public right_hand: Equipment;
  public rh_trait1: Equipment;
  public rh_trait2: Equipment;
  public rh_trait3: Equipment;
  public left_hand: Equipment;
  public lh_trait1: Equipment;
  public lh_trait2: Equipment;
  public lh_trait3: Equipment;
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
    if (equipments.rh_trait1) {
      this.rh_trait1 = new Equipment(equipments.rh_trait1);
    }
    if (equipments.rh_trait2) {
      this.rh_trait2 = new Equipment(equipments.rh_trait2);
    }
    if (equipments.rh_trait3) {
      this.rh_trait3 = new Equipment(equipments.rh_trait3);
    }
    if (equipments.lh_trait1) {
      this.lh_trait1 = new Equipment(equipments.lh_trait1);
    }
    if (equipments.lh_trait2) {
      this.lh_trait2 = new Equipment(equipments.lh_trait2);
    }
    if (equipments.lh_trait3) {
      this.lh_trait3 = new Equipment(equipments.lh_trait3);
    }
  }

  public removeAllRemoveable() {
    this.rh_trait1 = null;
    this.rh_trait2 = null;
    this.rh_trait3 = null;
    this.left_hand = null;
    this.lh_trait1 = null;
    this.lh_trait2 = null;
    this.lh_trait3 = null;
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

  public sumEquipmentLbBoost(unitId: number) {
    let result = 1;
    result += this.right_hand && this.right_hand.lb_multiplier ? this.right_hand.lb_multiplier - 1 : 0;
    result += this.left_hand && this.left_hand.lb_multiplier ? this.left_hand.lb_multiplier - 1 : 0;
    result += this.head && this.head.lb_multiplier ? this.head.lb_multiplier - 1 : 0;
    result += this.body && this.body.lb_multiplier ? this.body.lb_multiplier - 1 : 0;
    result += this.accessory1 && this.accessory1.lb_multiplier ? this.accessory1.lb_multiplier - 1 : 0;
    result += this.accessory2 && this.accessory2.lb_multiplier ? this.accessory2.lb_multiplier - 1 : 0;
    result += this.materia1 && this.materia1.lb_multiplier ? this.materia1.lb_multiplier - 1 : 0;
    result += this.materia2 && this.materia2.lb_multiplier ? this.materia2.lb_multiplier - 1 : 0;
    result += this.materia3 && this.materia3.lb_multiplier ? this.materia3.lb_multiplier - 1 : 0;
    result += this.materia4 && this.materia4.lb_multiplier ? this.materia4.lb_multiplier - 1 : 0;
    this.getAllActiveConditionalPassives(unitId)
      .filter((cond: ConditionalPassive) => cond.lb_power > 1 && cond.lb_power < 10)
      .map(cond => cond.lb_power)
      .forEach(lbMultiplier => {
        result += lbMultiplier - 1;
      });

    return result;
  }

  public sumEquipmentLbMod(unitId: number) {
    return this.getAllActiveConditionalPassives(unitId)
      .filter((cond: ConditionalPassive) => cond.lb_power >= 10)
      .map(cond => cond.lb_power)
      .reduce((val1, val2) => val1 + val2, 0);
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
    result += this.rh_trait1 ? this.rh_trait1[statName + '_percent'] : 0;
    result += this.rh_trait2 ? this.rh_trait2[statName + '_percent'] : 0;
    result += this.rh_trait3 ? this.rh_trait3[statName + '_percent'] : 0;
    result += this.lh_trait1 ? this.lh_trait1[statName + '_percent'] : 0;
    result += this.lh_trait2 ? this.lh_trait2[statName + '_percent'] : 0;
    result += this.lh_trait3 ? this.lh_trait3[statName + '_percent'] : 0;
    return result;
  }

  public getPhysicalKillers(unitId: number): number {
    let result = 0;
    result += this.right_hand && this.right_hand.physical_killers ? this.right_hand.physical_killers.getKillerSum() : 0;
    result += this.left_hand && this.left_hand.physical_killers ? this.left_hand.physical_killers.getKillerSum() : 0;
    result += this.head && this.head.physical_killers ? this.head.physical_killers.getKillerSum() : 0;
    result += this.body && this.body.physical_killers ? this.body.physical_killers.getKillerSum() : 0;
    result += this.accessory1 && this.accessory1.physical_killers ? this.accessory1.physical_killers.getKillerSum() : 0;
    result += this.accessory2 && this.accessory2.physical_killers ? this.accessory2.physical_killers.getKillerSum() : 0;
    result += this.materia1 && this.materia1.physical_killers ? this.materia1.physical_killers.getKillerSum() : 0;
    result += this.materia2 && this.materia2.physical_killers ? this.materia2.physical_killers.getKillerSum() : 0;
    result += this.materia3 && this.materia3.physical_killers ? this.materia3.physical_killers.getKillerSum() : 0;
    result += this.materia4 && this.materia4.physical_killers ? this.materia4.physical_killers.getKillerSum() : 0;
    result += this.getAllActiveConditionalPassives(unitId)
      .map((passive: ConditionalPassive) => passive.physical_killers ? passive.physical_killers.getKillerSum() : 0)
      .reduce((val1, val2) => val1 + val2, 0);
    return result;
  }

  public getPhysicalKiller(opponentKillerType: string, unitId: number): number {
    let result = 0;
    result += this.right_hand ? this.right_hand.getPhysicalKiller(opponentKillerType) : 0;
    result += this.left_hand ? this.left_hand.getPhysicalKiller(opponentKillerType) : 0;
    result += this.head ? this.head.getPhysicalKiller(opponentKillerType) : 0;
    result += this.body ? this.body.getPhysicalKiller(opponentKillerType) : 0;
    result += this.accessory1 ? this.accessory1.getPhysicalKiller(opponentKillerType) : 0;
    result += this.accessory2 ? this.accessory2.getPhysicalKiller(opponentKillerType) : 0;
    result += this.materia1 ? this.materia1.getPhysicalKiller(opponentKillerType) : 0;
    result += this.materia2 ? this.materia2.getPhysicalKiller(opponentKillerType) : 0;
    result += this.materia3 ? this.materia3.getPhysicalKiller(opponentKillerType) : 0;
    result += this.materia4 ? this.materia4.getPhysicalKiller(opponentKillerType) : 0;
    result += this.getAllActiveConditionalPassives(unitId)
      .map((passive: ConditionalPassive) => passive.getPhysicalKiller(opponentKillerType))
      .reduce((val1, val2) => val1 + val2, 0);
    return result;
  }

  public getMagicalKillers(unitId: number): number {
    let result = 0;
    result += this.right_hand && this.right_hand.magical_killers ? this.right_hand.magical_killers.getKillerSum() : 0;
    result += this.left_hand && this.left_hand.magical_killers ? this.left_hand.magical_killers.getKillerSum() : 0;
    result += this.head && this.head.magical_killers ? this.head.magical_killers.getKillerSum() : 0;
    result += this.body && this.body.magical_killers ? this.body.magical_killers.getKillerSum() : 0;
    result += this.accessory1 && this.accessory1.magical_killers ? this.accessory1.magical_killers.getKillerSum() : 0;
    result += this.accessory2 && this.accessory2.magical_killers ? this.accessory2.magical_killers.getKillerSum() : 0;
    result += this.materia1 && this.materia1.magical_killers ? this.materia1.magical_killers.getKillerSum() : 0;
    result += this.materia2 && this.materia2.magical_killers ? this.materia2.magical_killers.getKillerSum() : 0;
    result += this.materia3 && this.materia3.magical_killers ? this.materia3.magical_killers.getKillerSum() : 0;
    result += this.materia4 && this.materia4.magical_killers ? this.materia4.magical_killers.getKillerSum() : 0;
    result += this.getAllActiveConditionalPassives(unitId)
      .map((passive: ConditionalPassive) => passive.magical_killers ? passive.magical_killers.getKillerSum() : 0)
      .reduce((val1, val2) => val1 + val2, 0);
    return result;
  }

  public getMagicalKiller(opponentKillerType: string, unitId: number): number {
    let result = 0;
    result += this.right_hand ? this.right_hand.getMagicalKiller(opponentKillerType) : 0;
    result += this.left_hand ? this.left_hand.getMagicalKiller(opponentKillerType) : 0;
    result += this.head ? this.head.getMagicalKiller(opponentKillerType) : 0;
    result += this.body ? this.body.getMagicalKiller(opponentKillerType) : 0;
    result += this.accessory1 ? this.accessory1.getMagicalKiller(opponentKillerType) : 0;
    result += this.accessory2 ? this.accessory2.getMagicalKiller(opponentKillerType) : 0;
    result += this.materia1 ? this.materia1.getMagicalKiller(opponentKillerType) : 0;
    result += this.materia2 ? this.materia2.getMagicalKiller(opponentKillerType) : 0;
    result += this.materia3 ? this.materia3.getMagicalKiller(opponentKillerType) : 0;
    result += this.materia4 ? this.materia4.getMagicalKiller(opponentKillerType) : 0;
    result += this.getAllActiveConditionalPassives(unitId)
      .map((passive: ConditionalPassive) => passive.getMagicalKiller(opponentKillerType))
      .reduce((val1, val2) => val1 + val2, 0);
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
    return this.right_hand.isWeaponWithDw()
      || this.accessory1.id === 935 || this.accessory2.id === 935 // genji gloves
      || this.materia1.id === 791 || this.materia2.id === 791 || this.materia3.id === 791 || this.materia4.id === 791 // dw
      || this.materia1.id === 1756 || this.materia2.id === 1756
      || this.materia3.id === 1756 || this.materia4.id === 1756 // awesome swordsman
      || this.materia1.id === 2308 || this.materia2.id === 2308 || this.materia3.id === 2308 || this.materia4.id === 2308 // quintessence
      ;
  }

  public isDualWielding(): boolean {
    return this.right_hand && this.right_hand.isWeapon() && !this.right_hand.isTwoHanded()
      && this.left_hand && this.left_hand.isWeapon() && !this.left_hand.isTwoHanded();
  }

  public isPartialDwEquippedForCategory(category: number): boolean {
    return !isNullOrUndefined(
      this.getAllConditionalPassives()
        .find(condPassive => condPassive.category === category && condPassive.partial_dw)
    );
  }

  public checkConditionalPassiveActive(condPassive: ConditionalPassive, unitId: number): boolean {
    // unit-specific bonus of an item
    if (!isNullOrUndefined(condPassive.unit) && condPassive.unit > 0 && unitId !== condPassive.unit) {
      return false;
    }

    // skill modifier increase
    if (!isNullOrUndefined(condPassive.skill)) {
      return true;
    }

    // unit or item bonus if a category of equipment is present
    if (!isNullOrUndefined(condPassive.category) && condPassive.category > 0 && !condPassive.partial_dw
      && !((this.right_hand && this.right_hand.category === condPassive.category)
        || (this.left_hand && this.left_hand.category === condPassive.category)
        || (this.head && this.head.category === condPassive.category)
        || (this.body && this.body.category === condPassive.category))) {
      return false;
    }
    // unit or item bonus if a weapon of the right element is present
    if (!isNullOrUndefined(condPassive.element) && condPassive.element > 0
      && !(
        (this.right_hand && this.right_hand.isWeapon()
          && this.right_hand.elements && !isNullOrUndefined(this.right_hand.elements.find(element => element === condPassive.element)))
        || (this.left_hand && this.left_hand.isWeapon()
          && this.left_hand.elements && !isNullOrUndefined(this.left_hand.elements.find(element => element === condPassive.element)))
      )) {
      return false;
    }

    return true;
  }

  public getAllActiveConditionalPassives(unitId: number): Array<ConditionalPassive> {
    const allPassives: Array<ConditionalPassive> = this.getAllConditionalPassives();
    allPassives.forEach((cp: ConditionalPassive) => cp.active = false);
    const uniquePassives = this.filterDuplicatedConditionalPassives(allPassives);
    const activePassives: Array<ConditionalPassive> =
      uniquePassives.filter(condPassive => this.checkConditionalPassiveActive(condPassive, unitId));
    activePassives.forEach((cp: ConditionalPassive) => cp.active = true);
    return activePassives;
  }

  private filterDuplicatedConditionalPassives(passives: Array<ConditionalPassive>): Array<ConditionalPassive> {
    const filtered: Array<ConditionalPassive> = [];
    passives.forEach((passive: ConditionalPassive) => {
      if (!filtered.find(p => p.id === passive.id && p.unique && passive.unique)) {
        filtered.push(passive);
      }
    });
    return filtered;
  }

  public activateEquipmentConditionalPassives(equipment: Equipment, unitId: number): Equipment {
    equipment.conditional_passives.forEach(cp => this.checkConditionalPassiveActive(cp, unitId) ? cp.active = true : cp.active = false);
    return equipment;
  }

  private getAllConditionalPassives(): Array<ConditionalPassive> {
    return [
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
  }

  public sumSkillModIncrease(skillId: number) {
    return this.getAllConditionalPassives()
      .filter((cond: ConditionalPassive) =>
        cond.active && !isNullOrUndefined(cond.skill) && !isNullOrUndefined(skillId) && cond.skill === skillId)
      .map((cond: ConditionalPassive) => cond.skill_mod)
      .reduce((val1, val2) => val1 + val2, 0);
  }
}
