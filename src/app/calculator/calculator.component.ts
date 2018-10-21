import {Component, OnInit} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public pushBuildDisplayed = false;

  constructor(public unitsService: UnitsService) {
  }

  ngOnInit() {
    this.pushBuildDisplayed = !isNullOrUndefined(window['PUSH_ACTIVE']) && window['PUSH_ACTIVE'];
  }

  public computeAfterEquipmentChanged() {
    this.unitsService.selectedUnit.computeAll();
  }
}
