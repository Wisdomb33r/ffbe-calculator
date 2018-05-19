import {Component} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';

@Component({
  selector: 'app-calculation-display',
  templateUrl: './calculation-display.component.html',
  styleUrls: ['./calculation-display.component.css']
})
export class CalculationDisplayComponent {

  constructor(public unitsService: UnitsService) {
  }

}
