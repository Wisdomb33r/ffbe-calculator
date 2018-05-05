import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {AlgorithmResultPhysicalChaining} from '../../../core/model/algorithm-result-physical-chaining.model';
import {AlgorithmPhysicalChaining} from '../../../core/model/algorithm-physical-chaining.model';
import {UnitsService} from '../../../core/services/units.service';

@Component({
  selector: 'app-chaining-skill-hits-damages',
  templateUrl: './calculation-skill-chaining-hits-damages.component.html',
  styleUrls: ['./calculation-skill-chaining-hits-damages.component.css']
})
export class CalculationSkillChainingHitsDamagesComponent implements OnInit {

  public result: AlgorithmResultPhysicalChaining;
  public algorithm: AlgorithmPhysicalChaining;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
  }

  ngOnInit() {
  }

  public calculateBuild() {
    this.unitsService.selectedUnit.calculateResults();
    this.result = this.unitsService.getResult() as AlgorithmResultPhysicalChaining;
  }
}
