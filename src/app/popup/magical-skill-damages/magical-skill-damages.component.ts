import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UnitsService} from '../../../core/services/units.service';
import {AlgorithmResultMagicalChaining} from '../../../core/model/algorithm-result-magical-chaining.model';
import {AlgorithmMagicalChaining} from '../../../core/model/algorithm-magical-chaining.model';

@Component({
  selector: 'app-magical-skill-damages',
  templateUrl: './magical-skill-damages.component.html',
  styleUrls: ['./magical-skill-damages.component.css']
})
export class MagicalSkillDamagesComponent {

  public result: AlgorithmResultMagicalChaining;
  public algorithm: AlgorithmMagicalChaining;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
  }

  public calculateBuild() {
    this.unitsService.selectedUnit.calculateResults();
    this.result = this.unitsService.getResult() as AlgorithmResultMagicalChaining;
  }
}
