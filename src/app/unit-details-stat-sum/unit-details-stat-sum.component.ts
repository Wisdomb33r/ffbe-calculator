import {Component, Inject, OnInit} from '@angular/core';
import {UnitStats} from '../../core/model/unit-stats.model';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-unit-details-mag',
  templateUrl: './unit-details-stat-sum.component.html',
  styleUrls: ['./unit-details-stat-sum.component.css']
})
export class UnitDetailsMagComponent implements OnInit {

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
    return this.unitStats[this.stat + '_passive'];
  }

  public getEquipmentValue() {
    return this.unitStats[this.stat + '_equipment'];
  }

  public getDhValue() {
    return Math.floor(this.unitStats[this.stat + '_from_dh']);
  }

  public getDhPercent() {
    return this.unitStats[this.stat + '_dh'];
  }

  public getTotalValue() {
    return this.unitStats[this.stat + '_total'];
  }
}
