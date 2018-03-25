export class ConditionalPassive {
  public category: number;
  public element: number;
  public hp: number;
  public mp: number;
  public atk: number;
  public mag: number;
  public def: number;
  public spr: number;

  constructor(conditionalPassive: ConditionalPassive) {
    this.category = conditionalPassive.category;
    this.element = conditionalPassive.element;
    this.hp = conditionalPassive.hp ? conditionalPassive.hp : 0;
    this.mp = conditionalPassive.mp ? conditionalPassive.mp : 0;
    this.atk = conditionalPassive.atk ? conditionalPassive.atk : 0;
    this.mag = conditionalPassive.mag ? conditionalPassive.mag : 0;
    this.def = conditionalPassive.def ? conditionalPassive.def : 0;
    this.spr = conditionalPassive.spr ? conditionalPassive.spr : 0;
  }
}
