import {Component, Inject, OnInit} from '@angular/core';
import {UnitStats} from '../../core/model/unit-stats.model';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-unit-details-mag',
  templateUrl: './unit-details-mag.component.html',
  styleUrls: ['./unit-details-mag.component.css']
})
export class UnitDetailsMagComponent implements OnInit {

  public unitStats: UnitStats;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.unitStats = data.unitStats;
  }

  ngOnInit() {
  }

}
