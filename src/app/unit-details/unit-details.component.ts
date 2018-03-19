import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Unit} from '../../core/model/unit.model';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent implements OnInit, OnChanges {

  @Input() unit: Unit;
  public ranks = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.ranks = Array(this.unit.rank).fill(1); // filled with dummy 1 values
  }
}
