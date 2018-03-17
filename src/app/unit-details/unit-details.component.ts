import {Component, Input, OnInit} from '@angular/core';
import {Unit} from '../../core/model/unit.model';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent implements OnInit {

  @Input() unit: Unit;

  constructor() {
  }

  ngOnInit() {
  }

}
