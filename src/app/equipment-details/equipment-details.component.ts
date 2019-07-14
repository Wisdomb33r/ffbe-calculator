import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Equipment} from '../../core/model/equipment.model';
import {ConditionalPassive} from '../../core/model/conditional-passive.model';
import {UnitsService} from '../../core/services/units.service';
import {isNullOrUndefined} from 'util';
import {ESPER_BUILDS, MONSTER_TYPES} from '../../core/calculator-constants';
import {TranslateService} from '@ngx-translate/core';
import {Esper} from '../../core/model/esper.model';

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

  constructor(public unitsService: UnitsService,
              private translateService: TranslateService) {
  }

  public getConditionalPassivesToDisplay(): Array<ConditionalPassive> {
    return this.equipment.conditional_passives
      .filter((condPassive: ConditionalPassive) => isNullOrUndefined(condPassive.skill)
        || this.unitsService.selectedUnit.selectedBuild.getSkillIdentifiers().find((id: number) => id === condPassive.skill))
      .filter(condPassive => condPassive.active || isNullOrUndefined(condPassive.unit)
        || this.unitsService.selectedUnit.id === condPassive.unit);
  }

  public isDhActive(): boolean {
    return this.unitsService.selectedUnit.selectedEquipmentSet.isDoubleHandActive();
  }

  public isTdhActive(): boolean {
    return this.unitsService.selectedUnit.selectedEquipmentSet.isTrueDoubleHandActive();
  }

  public isDualWielding(): boolean {
    return this.unitsService.selectedUnit.selectedEquipmentSet.isDualWielding();
  }

  public isItemCategoryDisplayed(): boolean {
    return this.equipment.isWeapon() || this.equipment.isShield() || this.equipment.isHead() || this.equipment.isBody();
  }

  public weaponTraitClicked(index: number) {
    this.weaponTraitEmitter.emit(index);
  }

  public getMonsterTypes() {
    return MONSTER_TYPES;
  }

  public getEsperImage(esperId: number): string {
    const esper: Esper = ESPER_BUILDS.find((e: Esper) => e.id === esperId);
    return esper.icon;
  }

  public getEsperName(esperId: number): string {
    const esper: Esper = ESPER_BUILDS.find((e: Esper) => e.id === esperId);
    return esper['name_' + this.translateService.currentLang];
  }
}
