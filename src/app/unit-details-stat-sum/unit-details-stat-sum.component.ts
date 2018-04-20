import {Component, Inject, OnInit} from '@angular/core';
import {UnitStats} from '../../core/model/unit-stats.model';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  templateUrl: './unit-details-stat-sum.component.html',
  styleUrls: ['./unit-details-stat-sum.component.css']
})
export class UnitDetailsStatSumComponent implements OnInit {

  public unitStats: UnitStats;
  public stat: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.unitStats = data.unitStats;
    this.stat = data.stat;
  }

  ngOnInit() {
  }

  public getBaseValue() {
    return this.unitStats[this.stat].base;
  }

  public getPassiveValue() {
    return Math.floor(this.unitStats[this.stat].value_from_passive);
  }

  public getPassivePercent() {
    return this.unitStats[this.stat].passive + this.unitStats[this.stat].conditional_passive;
  }

  public getEquipmentValue() {
    return this.unitStats[this.stat].base_equipment;
  }

  public getEquipmentPassiveValue() {
    return Math.floor(this.unitStats[this.stat].value_from_passive_equipment);
  }

  public getEquipmentPassivePercent() {
    return this.unitStats[this.stat].passive_equipment;
  }

  public getDhValue() {
    return Math.floor(this.unitStats[this.stat].value_from_dh);
  }

  public getDhPercent() {
    return this.unitStats[this.stat].dh_effective + this.unitStats[this.stat].tdh_effective;
  }

  public getEquipmentDhValue() {
    return Math.floor(this.unitStats[this.stat].value_from_dh_equipment);
  }

  public getEquipmentDhPercent() {
    return this.unitStats[this.stat].dh_equipment + this.unitStats[this.stat].tdh_equipment;
  }

  public getEsperValue() {
    return this.unitStats[this.stat].value_from_esper;
  }

  public getTotalValue() {
    return this.unitStats[this.stat].total;
  }

  public isEquipmentPassiveLimitExceeded(): boolean {
    return this.getPassivePercent() + this.getEquipmentPassivePercent() > 300;
  }

  public isEquipmentDhLimitExceeded(): boolean {
    return this.getDhPercent() + this.getEquipmentDhPercent() > 300;
  }
}
