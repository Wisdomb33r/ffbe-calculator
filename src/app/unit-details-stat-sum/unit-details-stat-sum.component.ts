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
    return this.unitStats[this.stat];
  }

  public getPassiveValue() {
    return Math.floor(this.unitStats[this.stat + '_from_passive']);
  }

  public getPassivePercent() {
    return this.unitStats[this.stat + '_passive'] + this.unitStats[this.stat + '_cond_passive'];
  }

  public getEquipmentValue() {
    return this.unitStats[this.stat + '_equipment'];
  }

  public getEquipmentPassiveValue() {
    return Math.floor(this.unitStats[this.stat + '_from_equipment_passive']);
  }

  public getEquipmentPassivePercent() {
    return this.unitStats[this.stat + '_equipment_passive'];
  }

  public getDhValue() {
    return Math.floor(this.unitStats[this.stat + '_from_dh']);
  }

  public getDhPercent() {
    return this.unitStats[this.stat + '_dh'] + this.unitStats[this.stat + '_tdh'];
  }

  public getEquipmentDhValue() {
    return Math.floor(this.unitStats[this.stat + '_from_dh_equipment']);
  }

  public getEquipmentDhPercent() {
    return this.unitStats[this.stat + '_dh_equipment'] + this.unitStats[this.stat + '_tdh_equipment'];
  }

  public getEsperValue() {
    return this.unitStats[this.stat + '_from_esper'];
  }

  public getTotalValue() {
    return this.unitStats[this.stat + '_total'];
  }
}
