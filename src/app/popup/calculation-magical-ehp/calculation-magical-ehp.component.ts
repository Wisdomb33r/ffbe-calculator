import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UnitsService} from '../../../core/services/units.service';
import {AlgorithmResultDefensive} from '../../../core/model/algorithm-result-defensive.model';
import {AlgorithmDefensive} from '../../../core/model/algorithm-defensive.model';

@Component({
  selector: 'app-calculation-magical-ehp',
  templateUrl: './calculation-magical-ehp.component.html',
  styleUrls: ['./calculation-magical-ehp.component.css']
})
export class CalculationMagicalEhpComponent {

  public result: AlgorithmResultDefensive;
  public algorithm: AlgorithmDefensive;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
  }

}
