import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CalculationPhysicalDamagesComponent} from '../popup/calculation-physical-damages/calculation-physical-damages.component';
import {AlgorithmChaining} from '../../core/model/algorithm-chaining.model';
import {ResultOffensive} from '../../core/model/result-offensive.model';
import {CalculationMagicalDamagesComponent} from '../popup/calculation-magical-damages/calculation-magical-damages.component';
import {ResultChaining} from '../../core/model/result-chaining.model';

@Component({
  selector: 'app-calculation-physical-chaining',
  templateUrl: './calculation-physical-chaining.component.html',
  styleUrls: ['./calculation-physical-chaining.component.css']
})
export class CalculationPhysicalChainingComponent {

  @Input() algorithm: AlgorithmChaining;
  @Input() result: ResultOffensive;

  constructor(private dialog: MatDialog) {
  }

  public displayPhysicalDamages(index: number) {
    this.dialog.open(CalculationPhysicalDamagesComponent, {
      width: '300px',
      data: {
        result: this.result.turnDamages[index],
        algorithm: this.algorithm,
        index: index,
      }
    });
  }

  public displayMagicalDamages(index: number) {
    this.dialog.open(CalculationMagicalDamagesComponent, {
      width: '300px',
      data: {
        result: this.result.turnDamages[index],
        algorithm: this.algorithm,
        index: index,
      }
    });
  }

  public isWithBothPhysicalAndMagicalDamages(): boolean {
    return this.result.turnDamages.some((result: ResultChaining) => result.physicalResult > 0)
      && this.result.turnDamages.some((result: ResultChaining) => result.magicalResult > 0);
  }
}
