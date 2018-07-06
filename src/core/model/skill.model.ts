import {SkillType} from './skill-type.model';
import {SkillTypeFactory} from './skill-type-factory.model';
import {DamageType} from './damage-type.model';
import {DamageTypeFactory} from './damage-type-factory.model';

export class Skill {
  // from backend
  public id: number;
  public category: number;
  public name: string;
  public icon: string;
  public power: number;
  public isLimitBreak: boolean;
  public isEsper: boolean;
  public nb: number;
  public hits: number;
  public frames: string;
  public damages: string;
  public damages_type: string;
  public calculation_stat: string;
  public isBreakingChain: boolean;
  public atk_buff: number;
  public mag_buff: number;
  public def_buff: number;
  public spr_buff: number;
  public resists_break: Array<number>;
  public elements: Array<number>;

  // transcient
  public skillType: SkillType;
  public damageType: DamageType;

  constructor(skill: Skill) {
    this.id = skill.id;
    this.category = skill.category;
    this.name = skill.name;
    this.icon = skill.icon;
    this.power = skill.power;
    this.isLimitBreak = skill.isLimitBreak;
    this.isEsper = skill.isEsper;
    this.nb = skill.nb;
    this.hits = skill.hits;
    this.frames = skill.frames;
    this.damages = skill.damages;
    this.damages_type = skill.damages_type;
    this.calculation_stat = skill.calculation_stat;
    this.isBreakingChain = skill.isBreakingChain;
    this.atk_buff = skill.atk_buff;
    this.mag_buff = skill.mag_buff;
    this.def_buff = skill.def_buff;
    this.spr_buff = skill.spr_buff;
    this.resists_break = skill.resists_break;
    this.elements = skill.elements;
    this.skillType = SkillTypeFactory.getInstance(this.category);
    this.damageType = DamageTypeFactory.getInstance(this.damages_type, this.calculation_stat);
  }
}
