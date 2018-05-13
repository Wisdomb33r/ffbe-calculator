import {Component, Inject} from '@angular/core';
import {UnitsService} from '../../../core/services/units.service';
import {AlgorithmHybridChaining} from '../../../core/model/algorithm-hybrid-chaining.model';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ResultChaining} from '../../../core/model/result-chaining.model';

@Component({
  selector: 'app-calculation-hybrid-magical-damages',
  templateUrl: './calculation-hybrid-magical-damages.component.html',
  styleUrls: ['./calculation-hybrid-magical-damages.component.css']
})
export class CalculationHybridMagicalDamagesComponent {

  public result: ResultChaining;
  public algorithm: AlgorithmHybridChaining;

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