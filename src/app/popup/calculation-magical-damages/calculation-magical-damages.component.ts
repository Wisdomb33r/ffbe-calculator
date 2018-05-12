import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UnitsService} from '../../../core/services/units.service';
import {ResultMagicalChaining} from '../../../core/model/result-magical-chaining.model';
import {AlgorithmMagicalChaining} from '../../../core/model/algorithm-magical-chaining.model';

@Component({
  selector: 'app-magical-skill-damages',
  templateUrl: './calculation-magical-damages.component.html',
  styleUrls: ['./calculation-magical-damages.component.css']
})
export class CalculationMagicalDamagesComponent {

  public result: ResultMagicalChaining;
  public algorithm: AlgorithmMagicalChaining;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
  }

  public calculateBuild() {
    this.unitsService.selectedUnit.calculateResults();
    this.result = this.unitsService.getResult() as ResultMagicalChaining;
  }
}
