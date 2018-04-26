export class Skill {
  public id: number;
  public name: string;
  public icon: string;
  public power: number;
  public isLimitBreak: boolean;
  public nb: number;
  public hits: number;
  public frames: string;
  public damages: string;

  constructor(skill: Skill) {
    this.id = skill.id;
    this.name = skill.name;
    this.icon = skill.icon;
    this.power = skill.power;
    this.isLimitBreak = skill.isLimitBreak;
    this.nb = skill.nb;
    this.hits = skill.hits;
    this.frames = skill.frames;
    this.damages = skill.damages;
  }
}
