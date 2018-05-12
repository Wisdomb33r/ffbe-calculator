import {Component, Inject} from '@angular/core';
import {ResultHybridChaining} from '../../../core/model/result-hybrid-chaining.model';
import {UnitsService} from '../../../core/services/units.service';
import {AlgorithmHybridChaining} from '../../../core/model/algorithm-hybrid-chaining.model';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-calculation-hybrid-physical-damages',
  templateUrl: './calculation-hybrid-physical-damages.component.html',
  styleUrls: ['./calculation-hybrid-physical-damages.component.css']
})
export class CalculationHybridPhysicalDamagesComponent {

  public result: ResultHybridChaining;
  public algorithm: AlgorithmHybridChaining;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
  }

  public calculateBuild() {
    this.unitsService.selectedUnit.calculateResults();
    this.result = this.unitsService.getResult() as ResultHybridChaining;
  }
}
