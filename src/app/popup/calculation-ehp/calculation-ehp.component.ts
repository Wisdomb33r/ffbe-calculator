import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UnitsService} from '../../../core/services/units.service';
import {ResultDefensive} from '../../../core/model/result-defensive.model';
import {AlgorithmDefensive} from '../../../core/model/algorithm-defensive.model';

@Component({
  templateUrl: './calculation-ehp.component.html',
  styleUrls: ['./calculation-ehp.component.css']
})
export class CalculationEhpComponent {

  public result: ResultDefensive;
  public algorithm: AlgorithmDefensive;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
  }

}
