import {DamageTypePhysical} from './damage-type-physical.model';
import {DamageTypeMagical} from './damage-type-magical.model';
import {DamageType} from './damage-type.model';
import {DamageTypeHybrid} from './damage-type-hybrid.model';

export class DamageTypeFactory {
  public static getInstance(damages_type: string, calculation_stat: string): DamageType {
    switch (damages_type) {
      case 'physical':
        return new DamageTypePhysical(calculation_stat);
      case 'magical':
        return new DamageTypeMagical(calculation_stat);
      case 'hybrid':
        return new DamageTypeHybrid();
      /*case 'fixed':
        return new DamageTypeFixed();*/
      default:
        return null;
    }
  }
}
