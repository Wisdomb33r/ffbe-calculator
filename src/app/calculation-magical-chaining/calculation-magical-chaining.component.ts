import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CalculationSkillChainingHitsDamagesComponent} from '../popup/calculation-skill-chaining-hits-damages/calculation-skill-chaining-hits-damages.component';
import {CalculationMagicalDamagesComponent} from '../popup/calculation-magical-damages/calculation-magical-damages.component';
import {ResultChaining} from '../../core/model/result-chaining.model';
import {AlgorithmChaining} from '../../core/model/algorithm-chaining.model';

@Component({
  selector: 'app-calculation-magical-chaining',
  templateUrl: './calculation-magical-chaining.component.html',
  styleUrls: ['./calculation-magical-chaining.component.css']
})
export class CalculationMagicalChainingComponent {

  @Input() algorithm: AlgorithmChaining;
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

  public displayMagicalSkillDamages() {
    this.dialog.open(CalculationMagicalDamagesComponent, {
      width: '300px',
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }
}
