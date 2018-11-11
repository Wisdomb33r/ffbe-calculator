import {Component, Input} from '@angular/core';
import {ConditionalPassive} from '../../core/model/conditional-passive.model';
import {MONSTER_TYPES} from '../../core/calculator-constants';
import {UnitStats} from '../../core/model/unit-stats.model';

@Component({
  selector: 'app-unit-traits',
  templateUrl: './unit-traits.component.html',
  styleUrls: ['./unit-traits.component.css']
})
export class UnitTraitsComponent {

  @Input() passives: Array<ConditionalPassive>;

  constructor() {
  }

  public getMonsterTypes() {
    return MONSTER_TYPES;
  }
}
