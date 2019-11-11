import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ResultTurnDamages} from '../../../core/model/result-turn-damages.model';
import {AlgorithmOffensive} from '../../../core/model/algorithm-offensive.model';
import {AlgorithmChaining} from '../../../core/model/algorithm-chaining.model';

@Component({
  selector: 'app-skill-hits-power-display',
  templateUrl: './skill-hits-power-display.component.html',
  styleUrls: ['./skill-hits-power-display.component.css']
})
export class SkillHitsPowerDisplayComponent {

  @Input() result: ResultTurnDamages;
  @Input() algorithm: AlgorithmOffensive;
  @Output() hitsParameterChanged: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  public calculateBuild() {
    this.hitsParameterChanged.emit(true);
  }

  public isChaining() {
    return this.algorithm instanceof AlgorithmChaining;
  }
}
