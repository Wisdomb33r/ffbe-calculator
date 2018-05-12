import {SkillType} from './skill-type.model';
import {SkillTypeFactory} from './skill-type-factory.model';

export class Skill {
  // from backend
  public id: number;
  public category: number;
  public name: string;
  public icon: string;
  public power: number;
  public isLimitBreak: boolean;
  public nb: number;
  public hits: number;
  public frames: string;
  public damages: string;
  public damage_type: string;

  // transcient
  public skillType: SkillType;

  constructor(skill: Skill) {
    this.id = skill.id;
    this.category = skill.category;
    this.name = skill.name;
    this.icon = skill.icon;
    this.power = skill.power;
    this.isLimitBreak = skill.isLimitBreak;
    this.nb = skill.nb;
    this.hits = skill.hits;
    this.frames = skill.frames;
    this.damages = skill.damages;
    this.damage_type = skill.damage_type;
    this.skillType = SkillTypeFactory.getInstance(this.category);
  }
}
