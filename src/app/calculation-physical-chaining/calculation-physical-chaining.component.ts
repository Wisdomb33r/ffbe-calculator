import {Component, Input} from '@angular/core';
import {AlgorithmPhysicalChaining} from '../../core/model/algorithm-physical-chaining.model';
import {MatDialog} from '@angular/material';
import {CalculationSkillChainingHitsDamagesComponent} from '../popup/calculation-skill-chaining-hits-damages/calculation-skill-chaining-hits-damages.component';
import {CalculationPhysicalDamagesComponent} from '../popup/calculation-physical-damages/calculation-physical-damages.component';
import {ResultChaining} from '../../core/model/result-chaining.model';

@Component({
  selector: 'app-calculation-physical-chaining',
  templateUrl: './calculation-physical-chaining.component.html',
  styleUrls: ['./calculation-physical-chaining.component.css']
})
export class CalculationPhysicalChainingComponent {

  @Input() algorithm: AlgorithmPhysicalChaining;
  @Input() result: ResultChaining;

  constructor(private dialog: MatDialog) {
  }

  public displayChainingSkillHitsDamages() {
    this.dialog.open(CalculationSkillChainingHitsDamagesComponent, {
      width: '300px',
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }

  public displayPhysicalSkillDamages() {
    this.dialog.open(CalculationPhysicalDamagesComponent, {
      width: '300px',
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }
}
