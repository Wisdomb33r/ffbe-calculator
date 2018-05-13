import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CalculationSkillChainingHitsDamagesComponent} from '../popup/calculation-skill-chaining-hits-damages/calculation-skill-chaining-hits-damages.component';
import {CalculationHybridDamagesComponent} from '../popup/calculation-hybrid-damages/calculation-hybrid-damages.component';
import {CalculationHybridPhysicalDamagesComponent} from '../popup/calculation-hybrid-physical-damages/calculation-hybrid-physical-damages.component';
import {CalculationHybridMagicalDamagesComponent} from '../popup/calculation-hybrid-magical-damages/calculation-hybrid-magical-damages.component';
import {ResultChaining} from '../../core/model/result-chaining.model';
import {AlgorithmChaining} from '../../core/model/algorithm-chaining.model';

@Component({
  selector: 'app-calculation-hybrid-chaining',
  templateUrl: './calculation-hybrid-chaining.component.html',
  styleUrls: ['./calculation-hybrid-chaining.component.css']
})
export class CalculationHybridChainingComponent {

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

  public displayHybridSkillDamages() {
    this.dialog.open(CalculationHybridDamagesComponent, {
      width: '300px',
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }

  public displayHybridSkillPhysicalDamages() {
    this.dialog.open(CalculationHybridPhysicalDamagesComponent, {
      width: '300px',
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }

  public displayHybridSkillMagicalDamages() {
    this.dialog.open(CalculationHybridMagicalDamagesComponent, {
      width: '300px',
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }
}
