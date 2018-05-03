import {Component, Input, OnInit} from '@angular/core';
import {AlgorithmDefensive} from '../../core/model/algorithm-defensive.model';
import {AlgorithmResultDefensive} from '../../core/model/algorithm-result-defensive.model';

@Component({
  selector: 'app-calculation-defensive',
  templateUrl: './calculation-defensive.component.html',
  styleUrls: ['./calculation-defensive.component.css']
})
export class CalculationDefensiveComponent implements OnInit {

  @Input() algorithm: AlgorithmDefensive;
  @Input() result: AlgorithmResultDefensive;

  constructor() {
  }

  ngOnInit() {
  }

}
