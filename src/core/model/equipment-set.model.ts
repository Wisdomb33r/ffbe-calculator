import {Equipment} from './equipment.model';

export class EquipmentSet {
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
}
