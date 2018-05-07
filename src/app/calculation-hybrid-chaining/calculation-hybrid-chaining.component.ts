import {Component, Input} from '@angular/core';
import {AlgorithmHybridChaining} from '../../core/model/algorithm-hybrid-chaining.model';
import {AlgorithmResultHybridChaining} from '../../core/model/algorithm-result-hybrid-chaining.model';
import {MatDialog} from '@angular/material';
import {CalculationSkillChainingHitsDamagesComponent} from '../popup/calculation-skill-chaining-hits-damages/calculation-skill-chaining-hits-damages.component';
import {CalculationHybridDamagesComponent} from '../popup/calculation-hybrid-damages/calculation-hybrid-damages.component';
import {CalculationHybridPhysicalDamagesComponent} from '../popup/calculation-hybrid-physical-damages/calculation-hybrid-physical-damages.component';
import {CalculationHybridMagicalDamagesComponent} from '../popup/calculation-hybrid-magical-damages/calculation-hybrid-magical-damages.component';

@Component({
  selector: 'app-calculation-hybrid-chaining',
  templateUrl: './calculation-hybrid-chaining.component.html',
  styleUrls: ['./calculation-hybrid-chaining.component.css']
})
export class CalculationHybridChainingComponent {

  @Input() algorithm: AlgorithmHybridChaining;
  @Input() result: AlgorithmResultHybridChaining;

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
