import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UnitsService} from '../../../core/services/units.service';
import {AlgorithmPhysicalChaining} from '../../../core/model/algorithm-physical-chaining.model';
import {ResultChaining} from '../../../core/model/result-chaining.model';

@Component({
  selector: 'app-physical-skill-damages',
  templateUrl: './calculation-physical-damages.component.html',
  styleUrls: ['./calculation-physical-damages.component.css']
})
export class CalculationPhysicalDamagesComponent {

  public result: ResultChaining;
  public algorithm: AlgorithmPhysicalChaining;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
  }

  public calculateBuild() {
    this.unitsService.selectedUnit.calculateResults();
    this.result = this.unitsService.getResult() as ResultChaining;
  }
}
