import {SkillType} from './skill-type.model';
import {SkillTypeFactory} from './skill-type-factory.model';
import {DamageType} from './damage-type.model';
import {DamageTypeFactory} from './damage-type-factory.model';
import {isNullOrUndefined} from 'util';
import {KillerPassives} from './killer-passives.model';

export class Skill {
  // from backend
  public id: number;
  public category: number;
  public name: string;
  public icon: string;
  public power: number;
  public isLimitBreak: boolean;
  public isEsper: boolean;
  public isJump: boolean;
  public nb: number;
  public hits: number;
  public frames: string;
  public damages: string;
  public damages_type: string;
  public calculation_stat: string;
  public isBreakingChain: boolean;
  public isTurnCounting: boolean;
  public turnCount: number;
  public chainCombo: string;
  public atk_buff: number;
  public mag_buff: number;
  public def_buff: number;
  public spr_buff: number;
  public physical_killers: KillerPassives;
  public magical_killers: KillerPassives;
  public resists_break: Array<number>;
  public elements: Array<number>;
  public isStartPhase: boolean;

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
    this.isJump = skill.isJump;
    this.nb = skill.nb;
    this.hits = skill.hits;
    this.frames = skill.frames;
    this.damages = skill.damages;
    this.damages_type = skill.damages_type;
    this.calculation_stat = skill.calculation_stat;
    this.isBreakingChain = skill.isBreakingChain;
    this.isTurnCounting = skill.isTurnCounting;
    this.turnCount = skill.turnCount;
    this.chainCombo = this.formatChainCombo(skill.chainCombo);
    this.atk_buff = skill.atk_buff;
    this.mag_buff = skill.mag_buff;
    this.def_buff = skill.def_buff;
    this.spr_buff = skill.spr_buff;
    this.resists_break = skill.resists_break;
    this.elements = skill.elements;
    this.skillType = SkillTypeFactory.getInstance(this.category);
    this.damageType = DamageTypeFactory.getInstance(this.damages_type, this.calculation_stat);
    if (skill.physical_killers) {
      this.physical_killers = KillerPassives.construct(skill.physical_killers);
    }
    if (skill.magical_killers) {
      this.magical_killers = KillerPassives.construct(skill.magical_killers);
    }
    this.isStartPhase = skill.isStartPhase;
  }

  private formatChainCombo(chainCombo: string) {
    if (!isNullOrUndefined(chainCombo)) {
      const chainComboString = '' + chainCombo;
      if (chainComboString.search('.') === -1) {
        return chainCombo + '.0';
      }
    }
    return chainCombo;
  }
}
