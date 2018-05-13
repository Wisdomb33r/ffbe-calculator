import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UnitsService} from '../../../core/services/units.service';
import {ResultChaining} from '../../../core/model/result-chaining.model';
import {AlgorithmChaining} from '../../../core/model/algorithm-chaining.model';
import {ResultOffensive} from '../../../core/model/result-offensive.model';

@Component({
  selector: 'app-physical-skill-damages',
  templateUrl: './calculation-physical-damages.component.html',
  styleUrls: ['./calculation-physical-damages.component.css']
})
export class CalculationPhysicalDamagesComponent {

  public result: ResultChaining;
  public algorithm: AlgorithmChaining;
  private index: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
    this.index = data.index;
  }

  public calculateBuild() {
    this.unitsService.selectedUnit.calculateResults();
    const result: ResultOffensive = this.unitsService.getResult() as ResultOffensive;
    this.result = result.turnDamages[this.index];
  }
}
