import {Component, Input} from '@angular/core';
import {AlgorithmMagicalChaining} from '../../core/model/algorithm-magical-chaining.model';
import {AlgorithmResultMagicalChaining} from '../../core/model/algorithm-result-magical-chaining.model';
import {MatDialog} from '@angular/material';
import {ChainingSkillHitsDamagesComponent} from '../chaining-skill-hits-damages/chaining-skill-hits-damages.component';
import {MagicalSkillDamagesComponent} from '../popup/magical-skill-damages/magical-skill-damages.component';

@Component({
  selector: 'app-calculation-magical-chaining',
  templateUrl: './calculation-magical-chaining.component.html',
  styleUrls: ['./calculation-magical-chaining.component.css']
})
export class CalculationMagicalChainingComponent {

  @Input() algorithm: AlgorithmMagicalChaining;
  @Input() result: AlgorithmResultMagicalChaining;

  constructor(private dialog: MatDialog) {
  }

  public displayChainingSkillHitsDamages() {
    this.dialog.open(ChainingSkillHitsDamagesComponent, {
      width: '300px',
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }

  public displayMagicalSkillDamages() {
    this.dialog.open(MagicalSkillDamagesComponent, {
      width: '300px',
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }
}
