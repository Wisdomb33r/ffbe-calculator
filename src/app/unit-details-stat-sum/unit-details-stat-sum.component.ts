import {Component, Inject} from '@angular/core';
import {UnitStats} from '../../core/model/unit-stats.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Esper} from '../../core/model/esper.model';
import {TranslateService} from '@ngx-translate/core';
import {DH_LIMIT_CAP, PASSIVE_LIMIT_CAP, TDW_LIMIT_CAP} from '../../core/calculator-constants';

@Component({
  templateUrl: './unit-details-stat-sum.component.html',
  styleUrls: ['./unit-details-stat-sum.component.css']
})
export class UnitDetailsStatSumComponent {

  public unitStats: UnitStats;
  public stat: string;
  public esper: Esper;
  public doublehanding: boolean;
  public dualwielding: boolean;

  constructor(private translateService: TranslateService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.unitStats = data.unitStats;
    this.stat = data.stat;
    this.esper = data.esper;
    this.doublehanding = data.doublehanding;
    this.dualwielding = data.dualwielding;
  }

  public getBaseValue() {
    return this.unitStats[this.stat].base;
  }

  public getPassiveValue() {
    return this.unitStats[this.stat].value_from_passive;
  }

  public getPassivePercent() {
    return this.unitStats[this.stat].passive + this.unitStats[this.stat].conditional_passive;
  }

  public getEquipmentValue() {
    return this.unitStats[this.stat].base_equipment;
  }

  public getEquipmentPassiveValue() {
    return this.unitStats[this.stat].value_from_passive_equipment;
  }

  public getEquipmentPassivePercent() {
    return this.unitStats[this.stat].passive_equipment;
  }

  public getDhValue() {
    return this.unitStats[this.stat].value_from_dh;
  }

  public getDhPercent() {
    return this.unitStats[this.stat].dh_effective + this.unitStats[this.stat].tdh_effective;
  }

  public getEquipmentDhValue() {
    return this.unitStats[this.stat].value_from_dh_equipment;
  }

  public getEquipmentDhPercent() {
    return this.unitStats[this.stat].dh_equipment + this.unitStats[this.stat].tdh_equipment;
  }

  public getDwValue() {
    return this.unitStats[this.stat].value_from_dw;
  }

  public getDwPercent() {
    return this.unitStats[this.stat].dw_effective;
  }

  public getEquipmentDwValue() {
    return this.unitStats[this.stat].value_from_dw_equipment;
  }

  public getEquipmentDwPercent() {
    return this.unitStats[this.stat].dw_equipment;
  }

  public getEsperValue() {
    return this.unitStats[this.stat].value_from_esper;
  }

  public getEsperPercentValue() {
    return this.unitStats[this.stat].value_from_esper_percent;
  }

  public getEsperPercent() {
    return this.unitStats.esper_percent;
  }

  public getEquipmentEsperPercentValue() {
    return this.unitStats[this.stat].value_from_equipment_esper_percent;
  }

  public getEquipmentEsperPercent() {
    return this.unitStats.equipment_esper_percent;
  }

  public getEsperEsperPercentValue() {
    return this.unitStats[this.stat].value_from_esper_esper_percent;
  }

  public getEsperEsperPercent() {
    return this.esper.stats_percent;
  }

  public getEsperPassiveValue() {
    return this.unitStats[this.stat].value_from_passive_esper;
  }

  public getEsperPassivePercent() {
    return this.unitStats[this.stat].passive_esper;
  }

  public getTotalValue() {
    return this.unitStats[this.stat].total;
  }

  public isEquipmentPassiveLimitExceeded(): boolean {
    return this.getPassivePercent() + this.getEquipmentPassivePercent() + this.getEsperPassivePercent() > PASSIVE_LIMIT_CAP;
  }

  public isEquipmentDhLimitExceeded(): boolean {
    return this.getDhPercent() + this.getEquipmentDhPercent() > DH_LIMIT_CAP;
  }

  public isEquipmentDwLimitExceeded(): boolean {
    return this.getDwPercent() + this.getEquipmentDwPercent() > TDW_LIMIT_CAP;
  }

  public getEsperName() {
    return this.esper['name_' + (this.translateService.currentLang && this.translateService.currentLang.startsWith('fr') ? 'fr' : 'en')];
  }
}
