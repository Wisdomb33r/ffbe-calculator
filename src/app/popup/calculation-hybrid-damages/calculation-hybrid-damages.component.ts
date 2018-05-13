import {Component, Inject} from '@angular/core';
import {AlgorithmHybridChaining} from '../../../core/model/algorithm-hybrid-chaining.model';
import {UnitsService} from '../../../core/services/units.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ResultChaining} from '../../../core/model/result-chaining.model';

@Component({
  selector: 'app-calculation-hybrid-damages',
  templateUrl: './calculation-hybrid-damages.component.html',
  styleUrls: ['./calculation-hybrid-damages.component.css']
})
export class CalculationHybridDamagesComponent {

  public result: ResultChaining;
  public algorithm: AlgorithmHybridChaining;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
  }

}
