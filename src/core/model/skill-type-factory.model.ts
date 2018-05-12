import {SkillTypePhysical} from './skill-type-physical.model';
import {SkillTypeMagical} from './skill-type-magical.model';
import {SkillType} from './skill-type.model';

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
      /*case 8:
        return new SkillTypeHybrid();
      case 9:
        return new SillTypeFixed();*/
      default:
        return null;
    }
  }
}
