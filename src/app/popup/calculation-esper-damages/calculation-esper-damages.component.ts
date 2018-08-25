import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UnitsService} from '../../../core/services/units.service';
import {ResultTurnDamages} from '../../../core/model/result-turn-damages.model';
import {ResultOffensive} from '../../../core/model/result-offensive.model';
import {AlgorithmOffensive} from '../../../core/model/algorithm-offensive.model';
import {AlgorithmChaining} from '../../../core/model/algorithm-chaining.model';

@Component({
  templateUrl: './calculation-esper-damages.component.html',
  styleUrls: ['./calculation-esper-damages.component.css']
})
export class CalculationEsperDamagesComponent {

  public result: ResultTurnDamages;
  public algorithm: AlgorithmOffensive;
  private index: number;
  public opponentSprValueError = false;
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

  public isChaining(): boolean {
    return this.algorithm instanceof AlgorithmChaining;
  }

  public isPhysical(): boolean {
    return this.unitsService.selectedUnit.selectedBuild.esper.damageType === 'physical';
  }

  public getResult(): number {
    return this.isPhysical() ? this.result.physicalResult : this.result.magicalResult;
  }

  public getElementalDamages(): number {
    return this.isPhysical() ? this.result.physicalElementalDamages : this.result.magicalElementalDamages;
  }

  public getKillerDamages(): number {
    return this.isPhysical() ? this.result.physicalKillerDamages : this.result.magicalKillerDamages;
  }

  public getBaseDamages(): number {
    return this.isPhysical() ? this.result.physicalDamages : this.result.magicalDamages;
  }

  public getOpponentStat(): number {
    return this.isPhysical() ? this.algorithm.opponentDef : this.algorithm.opponentSpr;
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
