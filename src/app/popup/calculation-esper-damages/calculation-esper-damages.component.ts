import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UnitsService} from '../../../core/services/units.service';
import {ResultChaining} from '../../../core/model/result-chaining.model';
import {ResultOffensive} from '../../../core/model/result-offensive.model';
import {AlgorithmOffensive} from '../../../core/model/algorithm-offensive.model';
import {AlgorithmChaining} from '../../../core/model/algorithm-chaining.model';

@Component({
  templateUrl: './calculation-esper-damages.component.html',
  styleUrls: ['./calculation-esper-damages.component.css']
})
export class CalculationEsperDamagesComponent {

  public result: ResultChaining;
  public algorithm: AlgorithmOffensive;
  private index: number;
  public opponentSprValueError = false;

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

  public isChaining() {
    return this.algorithm instanceof AlgorithmChaining;
  }

  public isPhysical() {
    return this.unitsService.selectedUnit.selectedBuild.esper.damageType === 'physical';
  }

  public opponentSprChanged() {
    if (this.algorithm.opponentSpr < 1 || this.algorithm.opponentSpr > 1000000) {
      this.opponentSprValueError = true;
      this.algorithm.opponentSpr = 1000000;
    } else {
      this.opponentSprValueError = false;
    }
    this.calculateBuild();
  }

  public convertSupportBreakAndCalculate() {
    this.algorithm.supportResistsBreak = this.algorithm.supportResistsBreak.map(res => +res);
    this.calculateBuild();
  }
}
