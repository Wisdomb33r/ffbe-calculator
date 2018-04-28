import {Component, OnInit} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';

@Component({
  selector: 'app-calculation-display',
  templateUrl: './calculation-display.component.html',
  styleUrls: ['./calculation-display.component.css']
})
export class CalculationDisplayComponent implements OnInit {

  constructor(public unitsService: UnitsService) {
  }

  ngOnInit() {
  }

}
