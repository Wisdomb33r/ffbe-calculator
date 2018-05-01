import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {AlgorithmResultPhysicalChaining} from '../../core/model/algorithm-result-physical-chaining.model';
import {UnitsService} from '../../core/services/units.service';
import {AlgorithmPhysicalChaining} from '../../core/model/algorithm-physical-chaining.model';

@Component({
  selector: 'app-physical-skill-damages',
  templateUrl: './physical-skill-damages.component.html',
  styleUrls: ['./physical-skill-damages.component.css']
})
export class PhysicalSkillDamagesComponent implements OnInit {

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
