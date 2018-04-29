import {Component, Input, OnInit} from '@angular/core';
import {AlgorithmPhysicalChaining} from '../../core/model/algorithm-physical-chaining.model';
import {AlgorithmResultPhysicalChaining} from '../../core/model/algorithm-result-physical-chaining.model';

@Component({
  selector: 'app-calculation-physical-chaining',
  templateUrl: './calculation-physical-chaining.component.html',
  styleUrls: ['./calculation-physical-chaining.component.css']
})
export class CalculationPhysicalChainingComponent implements OnInit {

  @Input() algorithm: AlgorithmPhysicalChaining;
  @Input() result: AlgorithmResultPhysicalChaining;

  constructor() {
  }

  ngOnInit() {
  }

}
