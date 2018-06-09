export class KillerPassives {

  constructor(public dragon: number,
              public insect: number,
              public fairy: number,
              public undead: number,
              public plant: number,
              public beast: number,
              public human: number,
              public machine: number,
              public stone: number,
              public demon: number,
              public aquatic: number,
              public bird: number) {
  }

  public getKillerSum() {
    let sum = 0;
    sum += this.dragon ? this.dragon : 0;
    sum += this.insect ? this.insect : 0;
    sum += this.fairy ? this.fairy : 0;
    sum += this.undead ? this.undead : 0;
    sum += this.plant ? this.plant : 0;
    sum += this.beast ? this.beast : 0;
    sum += this.human ? this.human : 0;
    sum += this.machine ? this.machine : 0;
    sum += this.stone ? this.stone : 0;
    sum += this.demon ? this.demon : 0;
    sum += this.aquatic ? this.aquatic : 0;
    sum += this.bird ? this.bird : 0;
    return sum;
  }
}
