import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CalculationPhysicalDamagesComponent} from '../popup/calculation-physical-damages/calculation-physical-damages.component';
import {ResultOffensive} from '../../core/model/result-offensive.model';
import {CalculationMagicalDamagesComponent} from '../popup/calculation-magical-damages/calculation-magical-damages.component';
import {ResultTurnDamages} from '../../core/model/result-turn-damages.model';
import {AlgorithmOffensive} from '../../core/model/algorithm-offensive.model';
import {CalculationEsperDamagesComponent} from '../popup/calculation-esper-damages/calculation-esper-damages.component';
import {CalculationEvokerDamagesComponent} from '../popup/calculation-evoker-damages/calculation-evoker-damages.component';

@Component({
  selector: 'app-calculation-offensive',
  templateUrl: './calculation-offensive.component.html',
  styleUrls: ['./calculation-offensive.component.css']
})
export class CalculationOffensiveComponent {

  @Input() algorithm: AlgorithmOffensive;
  @Input() result: ResultOffensive;

  constructor(private dialog: MatDialog) {
  }

  public displayPhysicalDamages(index: number) {
    if ((<any>window).ga) {
      (<any>window).ga('send', 'event', {
        eventCategory: 'calculatorCalculation',
        eventLabel: 'Display physical calculation',
        eventAction: 'displayPhysicalCalculation',
        eventValue: 1
      });
    }
    this.dialog.open(CalculationPhysicalDamagesComponent, {
      data: {
        result: this.result.turnDamages[index],
        algorithm: this.algorithm,
        index: index,
      }
    });
  }

  public displayEvokerDamages(index: number) {
    if ((<any>window).ga) {
      (<any>window).ga('send', 'event', {
        eventCategory: 'calculatorCalculation',
        eventLabel: 'Display evoker calculation',
        eventAction: 'displayEvokerCalculation',
        eventValue: 1
      });
    }
    this.dialog.open(CalculationEvokerDamagesComponent, {
      data: {
        result: this.result.turnDamages[index],
        algorithm: this.algorithm,
        index: index,
      }
    });
  }

  public displayMagicalDamages(index: number) {
    if ((<any>window).ga) {
      (<any>window).ga('send', 'event', {
        eventCategory: 'calculatorCalculation',
        eventLabel: 'Display magical calculation',
        eventAction: 'displayMagicalCalculation',
        eventValue: 1
      });
    }
    this.dialog.open(CalculationMagicalDamagesComponent, {
      data: {
        result: this.result.turnDamages[index],
        algorithm: this.algorithm,
        index: index,
      }
    });
  }

  public displayEsperDamages(index: number) {
    if ((<any>window).ga) {
      (<any>window).ga('send', 'event', {
        eventCategory: 'calculatorCalculation',
        eventLabel: 'Display esper calculation',
        eventAction: 'displayEsperCalculation',
        eventValue: 1
      });
    }
    this.dialog.open(CalculationEsperDamagesComponent, {
      data: {
        result: this.result.turnDamages[index],
        algorithm: this.algorithm,
        index: index,
      }
    });
  }

  public isWithBothPhysicalAndMagicalDamages(): boolean {
    return this.result.turnDamages.some((result: ResultTurnDamages) => result.physicalResult > 0)
      && this.result.turnDamages.some((result: ResultTurnDamages) => result.magicalResult > 0);
  }

  public getTurnCount(index: number): number {
    return this.result.getTurnCount(index);
  }
}
