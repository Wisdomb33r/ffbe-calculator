import {Component} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  constructor(public unitsService: UnitsService) {
  }

  public computeAfterEquipmentChanged() {
    this.unitsService.selectedUnit.computeAll();
  }
}
