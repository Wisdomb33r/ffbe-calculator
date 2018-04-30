import {Component, Input, OnInit} from '@angular/core';
import {AlgorithmPhysicalChaining} from '../../core/model/algorithm-physical-chaining.model';
import {AlgorithmResultPhysicalChaining} from '../../core/model/algorithm-result-physical-chaining.model';
import {MatDialog} from '@angular/material';
import {ChainingSkillHitsDamagesComponent} from '../chaining-skill-hits-damages/chaining-skill-hits-damages.component';

@Component({
  selector: 'app-calculation-physical-chaining',
  templateUrl: './calculation-physical-chaining.component.html',
  styleUrls: ['./calculation-physical-chaining.component.css']
})
export class CalculationPhysicalChainingComponent implements OnInit {

  @Input() algorithm: AlgorithmPhysicalChaining;
  @Input() result: AlgorithmResultPhysicalChaining;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  public displayChainingSkillHitsDamages() {
    const dialogRef = this.dialog.open(ChainingSkillHitsDamagesComponent, {
      width: '300px',
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }
}
