import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Unit} from '../../core/model/unit.model';
import {MatDialog} from '@angular/material';
import {UnitDetailsMagComponent} from '../unit-details-mag/unit-details-mag.component';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent implements OnInit, OnChanges {

  @Input() unit: Unit;
  public ranks = [];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.ranks = Array(this.unit.rank).fill(1); // filled with dummy 1 values
  }

  displayMagDetails() {
    const dialogRef = this.dialog.open(UnitDetailsMagComponent, {
      width: '300px',
      data: {unitStats: this.unit.stats}
    });
  }
}
