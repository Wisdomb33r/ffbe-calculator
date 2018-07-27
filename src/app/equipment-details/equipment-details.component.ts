import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Equipment} from '../../core/model/equipment.model';
import {ConditionalPassive} from '../../core/model/conditional-passive.model';
import {UnitsService} from '../../core/services/units.service';

@Component({
  selector: 'app-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.css']
})
export class EquipmentDetailsComponent {

  @Input() equipment: Equipment;
  @Input() weaponTrait1: Equipment;
  @Input() weaponTrait2: Equipment;
  @Input() weaponTrait3: Equipment;
  @Input() displayWeaponTraits: boolean;
  @Output() weaponTraitEmitter = new EventEmitter();

  constructor(public unitsService: UnitsService) {
  }

  public getConditionalPassivesToDisplay(): Array<ConditionalPassive> {
    return this.equipment.conditional_passives
      .filter(condPassive => condPassive.active || condPassive.category > 0);
  }

  public isDhActive(): boolean {
    return this.unitsService.getEquipments().isDoubleHandActive();
  }

  public isTdhActive(): boolean {
    return this.unitsService.getEquipments().isTrueDoubleHandActive();
  }

  public isItemCategoryDisplayed(): boolean {
    return this.equipment.isWeapon() || this.equipment.isShield() || this.equipment.isHead() || this.equipment.isBody();
  }

  public weaponTraitClicked(index: number) {
    this.weaponTraitEmitter.emit(index);
  }
}
