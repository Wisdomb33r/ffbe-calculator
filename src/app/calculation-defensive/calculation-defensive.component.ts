import {Component, Input, OnInit} from '@angular/core';
import {AlgorithmDefensive} from '../../core/model/algorithm-defensive.model';
import {ResultDefensive} from '../../core/model/result-defensive.model';
import {CalculationPhysicalEhpComponent} from '../popup/calculation-physical-ehp/calculation-physical-ehp.component';
import {CalculationMagicalEhpComponent} from '../popup/calculation-magical-ehp/calculation-magical-ehp.component';
import {CalculationEhpComponent} from '../popup/calculation-ehp/calculation-ehp.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-calculation-defensive',
  templateUrl: './calculation-defensive.component.html',
  styleUrls: ['./calculation-defensive.component.css']
})
export class CalculationDefensiveComponent implements OnInit {

  @Input() algorithm: AlgorithmDefensive;
  @Input() result: ResultDefensive;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  public displayPhysicalEhpCalculation() {
    this.dialog.open(CalculationPhysicalEhpComponent, {
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }

  public displayMagicalEhpCalculation() {
    this.dialog.open(CalculationMagicalEhpComponent, {
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }

  public displayEhpCalculation() {
    this.dialog.open(CalculationEhpComponent, {
      data: {
        result: this.result,
        algorithm: this.algorithm,
      }
    });
  }
}
