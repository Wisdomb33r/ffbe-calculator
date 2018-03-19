export class Equipment {
  public id: number;
  public name: string;
  public icon: string;

  constructor(equipement: Equipment) {
    this.id = equipement.id;
    this.name = equipement.name;
    this.icon = equipement.icon;
  }
}
