import {Component, Input} from '@angular/core';
import {ResultOffensive} from '../../core/model/result-offensive.model';
import {AlgorithmOffensive} from '../../core/model/algorithm-offensive.model';
import {UnitsService} from '../../core/services/units.service';

@Component({
  selector: 'app-calculation-offensive-totals',
  templateUrl: './calculation-offensive-totals.component.html',
  styleUrls: ['./calculation-offensive-totals.component.css']
})
export class CalculationOffensiveTotalsComponent {

  @Input() algorithm: AlgorithmOffensive;
  @Input() result: ResultOffensive;

  constructor(public unitsService: UnitsService) {
  }
}
