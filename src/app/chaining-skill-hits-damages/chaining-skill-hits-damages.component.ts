import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {AlgorithmResultPhysicalChaining} from '../../core/model/algorithm-result-physical-chaining.model';

@Component({
  selector: 'app-chaining-skill-hits-damages',
  templateUrl: './chaining-skill-hits-damages.component.html',
  styleUrls: ['./chaining-skill-hits-damages.component.css']
})
export class ChainingSkillHitsDamagesComponent implements OnInit {

  public result: AlgorithmResultPhysicalChaining;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.result = data.result;
  }

  ngOnInit() {
  }

}
