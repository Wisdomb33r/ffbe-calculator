import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UnitsService} from '../../../core/services/units.service';
import {ResultDefensive} from '../../../core/model/result-defensive.model';
import {AlgorithmDefensive} from '../../../core/model/algorithm-defensive.model';

@Component({
  templateUrl: './calculation-magical-ehp.component.html',
  styleUrls: ['./calculation-magical-ehp.component.css']
})
export class CalculationMagicalEhpComponent {

  public result: ResultDefensive;
  public algorithm: AlgorithmDefensive;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
  }

  public calculateBuild() {
    this.unitsService.selectedUnit.calculateResults();
    this.result = this.unitsService.getResult() as ResultDefensive;
  }

  public switchCover() {
    if (this.algorithm.isPhysicalCovering && this.algorithm.isMagicalCovering) {
      this.algorithm.isPhysicalCovering = false;
    }
    this.calculateBuild();
  }
}
