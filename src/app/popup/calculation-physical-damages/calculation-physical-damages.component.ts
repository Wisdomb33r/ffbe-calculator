import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UnitsService} from '../../../core/services/units.service';
import {ResultTurnDamages} from '../../../core/model/result-turn-damages.model';
import {ResultOffensive} from '../../../core/model/result-offensive.model';
import {AlgorithmOffensive} from '../../../core/model/algorithm-offensive.model';
import {AlgorithmChaining} from '../../../core/model/algorithm-chaining.model';

@Component({
  templateUrl: './calculation-physical-damages.component.html',
  styleUrls: ['./calculation-physical-damages.component.css']
})
export class CalculationPhysicalDamagesComponent {

  public result: ResultTurnDamages;
  public algorithm: AlgorithmOffensive;
  private index: number;
  public opponentDefValueError = false;

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

  public opponentDefChanged() {
    if (this.algorithm.opponentDef < 1 || this.algorithm.opponentDef > 1000000) {
      this.opponentDefValueError = true;
      this.algorithm.opponentDef = 1000000;
    } else {
      this.opponentDefValueError = false;
    }
    this.calculateBuild();
  }

  public convertSupportBreakAndCalculate() {
    this.algorithm.supportResistsBreak = this.algorithm.supportResistsBreak.map(res => +res);
    this.calculateBuild();
  }

  public convertEnemyResistAndCalculate() {
    this.algorithm.opponentResistances = this.algorithm.opponentResistances.map(res => +res);
    this.calculateBuild();
  }
}
