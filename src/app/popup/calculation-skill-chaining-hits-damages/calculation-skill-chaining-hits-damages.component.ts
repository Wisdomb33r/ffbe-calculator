import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UnitsService} from '../../../core/services/units.service';
import {ResultChaining} from '../../../core/model/result-chaining.model';
import {AlgorithmChaining} from '../../../core/model/algorithm-chaining.model';

@Component({
  selector: 'app-chaining-skill-hits-damages',
  templateUrl: './calculation-skill-chaining-hits-damages.component.html',
  styleUrls: ['./calculation-skill-chaining-hits-damages.component.css']
})
export class CalculationSkillChainingHitsDamagesComponent implements OnInit {

  public result: ResultChaining;
  public algorithm: AlgorithmChaining;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private unitsService: UnitsService) {
    this.result = data.result;
    this.algorithm = data.algorithm;
  }

  ngOnInit() {
  }

  public calculateBuild() {
    this.unitsService.selectedUnit.calculateResults();
    this.result = this.unitsService.getResult() as ResultChaining;
  }
}
