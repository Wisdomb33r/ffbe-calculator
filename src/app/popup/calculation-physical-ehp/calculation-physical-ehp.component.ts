import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UnitsService} from '../../../core/services/units.service';
import {AlgorithmResultDefensive} from '../../../core/model/algorithm-result-defensive.model';
import {AlgorithmDefensive} from '../../../core/model/algorithm-defensive.model';

@Component({
  selector: 'app-calculation-physical-ehp',
  templateUrl: './calculation-physical-ehp.component.html',
  styleUrls: ['./calculation-physical-ehp.component.css']
})
export class CalculationPhysicalEhpComponent {

  public result: AlgorithmResultDefensive;
  public algorithm: AlgorithmDefensive;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
  }

  public calculateBuild() {
    this.unitsService.selectedUnit.calculateResults();
    this.result = this.unitsService.getResult() as AlgorithmResultDefensive;
  }

  public switchCover() {
    if (this.algorithm.isPhysicalCovering && this.algorithm.isMagicalCovering) {
      this.algorithm.isMagicalCovering = false;
    }
    this.calculateBuild();
  }
}
