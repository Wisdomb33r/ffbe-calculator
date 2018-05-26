import {Component, Input} from '@angular/core';
import {Equipment} from '../../core/model/equipment.model';
import {ConditionalPassive} from '../../core/model/conditional-passive.model';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent {

  @Input() equipment: Equipment;

  public getConditionalPassivesToDisplay(): Array<ConditionalPassive> {
    return this.equipment.conditional_passives
      .filter(condPassive => condPassive.active || condPassive.category > 0);
  }
}
