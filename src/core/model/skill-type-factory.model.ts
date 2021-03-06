import {SkillTypePhysical} from './skill-type-physical.model';
import {SkillTypeMagical} from './skill-type-magical.model';
import {SkillType} from './skill-type.model';
import {SkillTypeNone} from './skill-type-none.model';
import {SkillTypeFixed} from './skill-type-fixed.model';

export class SkillTypeFactory {
  public static getInstance(category: number): SkillType {
    switch (category) {
      case 6:
      case 8:
        return new SkillTypePhysical();
      case 1:
      case 2:
      case 7:
        return new SkillTypeMagical();
      case 9:
        return new SkillTypeFixed();
      default:
        return new SkillTypeNone();
    }
  }
}
