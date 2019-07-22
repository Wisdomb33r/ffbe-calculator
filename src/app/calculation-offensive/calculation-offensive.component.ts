import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
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
  @Input() isStartPhase: boolean;

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
        result: this.isStartPhase ? this.result.startPhaseTurnDamages[index] : this.result.turnDamages[index],
        algorithm: this.algorithm,
        isStartPhase: this.isStartPhase,
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
        result: this.isStartPhase ? this.result.startPhaseTurnDamages[index] : this.result.turnDamages[index],
        algorithm: this.algorithm,
        isStartPhase: this.isStartPhase,
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
        result: this.isStartPhase ? this.result.startPhaseTurnDamages[index] : this.result.turnDamages[index],
        algorithm: this.algorithm,
        isStartPhase: this.isStartPhase,
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
        result: this.isStartPhase ? this.result.startPhaseTurnDamages[index] : this.result.turnDamages[index],
        algorithm: this.algorithm,
        isStartPhase: this.isStartPhase,
        index: index,
      }
    });
  }

  public getTurnCount(index: number): number {
    return this.isStartPhase ? this.result.getStartPhaseTurnCount(index) : this.result.getTurnCount(index);
  }

  public getTurnDamagesToDisplay(): Array<ResultTurnDamages> {
    return this.isStartPhase ? this.result.startPhaseTurnDamages : this.result.turnDamages;
  }
}
