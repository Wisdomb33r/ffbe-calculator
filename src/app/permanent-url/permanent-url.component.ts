import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {Unit} from '../../core/model/unit.model';
import {Equipment} from '../../core/model/equipment.model';
import {Esper} from '../../core/model/esper.model';
import {AlgorithmOffensive} from '../../core/model/algorithm-offensive.model';
import {AlgorithmFinish} from '../../core/model/algorithm-finish.model';

@Component({
  selector: 'app-permanent-url',
  templateUrl: './permanent-url.component.html',
  styleUrls: ['./permanent-url.component.css']
})
export class PermanentUrlComponent implements OnInit, DoCheck {

  public url: string;
  @Input() unit: Unit;
  @Input() right_hand: Equipment;
  @Input() rh_trait1: Equipment;
  @Input() rh_trait2: Equipment;
  @Input() rh_trait3: Equipment;
  @Input() left_hand: Equipment;
  @Input() lh_trait1: Equipment;
  @Input() lh_trait2: Equipment;
  @Input() lh_trait3: Equipment;
  @Input() head: Equipment;
  @Input() body: Equipment;
  @Input() accessory1: Equipment;
  @Input() accessory2: Equipment;
  @Input() materia1: Equipment;
  @Input() materia2: Equipment;
  @Input() materia3: Equipment;
  @Input() materia4: Equipment;
  @Input() esper: Esper;

  constructor() {
  }

  ngOnInit() {
    this.url = this.getPermanentUrl();
  }

  ngDoCheck() {
    this.url = this.getPermanentUrl();
  }

  public getPermanentUrl(): string {
    let url = 'https://www.final-fantasy.ch/ffbe/calculator/link/unit/' + this.unit.id + ';build=' + this.unit.selectedBuild.id;
    if (this.right_hand) {
      url += ';right_hand=' + this.right_hand.id;
    }
    if (this.left_hand) {
      url += ';left_hand=' + this.left_hand.id;
    }
    if (this.head) {
      url += ';head=' + this.head.id;
    }
    if (this.body) {
      url += ';body=' + this.body.id;
    }
    if (this.accessory1) {
      url += ';accessory1=' + this.accessory1.id;
    }
    if (this.accessory2) {
      url += ';accessory2=' + this.accessory2.id;
    }
    if (this.materia1) {
      url += ';materia1=' + this.materia1.id;
    }
    if (this.materia2) {
      url += ';materia2=' + this.materia2.id;
    }
    if (this.materia3) {
      url += ';materia3=' + this.materia3.id;
    }
    if (this.materia4) {
      url += ';materia4=' + this.materia4.id;
    }
    if (this.esper) {
      url += ';esper=' + this.esper.buildId;
    }
    if (this.rh_trait1) {
      url += ';rh_t1=' + this.rh_trait1.id;
    }
    if (this.rh_trait2) {
      url += ';rh_t2=' + this.rh_trait2.id;
    }
    if (this.rh_trait3) {
      url += ';rh_t3=' + this.rh_trait3.id;
    }
    if (this.lh_trait1) {
      url += ';lh_t1=' + this.lh_trait1.id;
    }
    if (this.lh_trait2) {
      url += ';lh_t2=' + this.lh_trait2.id;
    }
    if (this.lh_trait3) {
      url += ';lh_t3=' + this.lh_trait3.id;
    }
    url += this.getPermanentUrlForAlgorithmConfiguration();
    return url;
  }

  private getPermanentUrlForAlgorithmConfiguration(): string {
    let url = '';
    if (this.unit.selectedBuild.algorithm instanceof AlgorithmOffensive) {
      const algorithm: AlgorithmOffensive = this.unit.selectedBuild.algorithm;
      if (!algorithm.isKillerActive) {
        url += ';killers=false';
      }
      if (algorithm.opponentKillerType !== 'unknown') {
        url += ';type1=' + algorithm.opponentKillerType;
      }
      if (algorithm.opponentKillerType2 !== 'none') {
        url += ';type2=' + algorithm.opponentKillerType2;
      }
      if (algorithm.isSparkChain) {
        url += ';spark=true';
      }
      if (!algorithm.isSupportBuffing) {
        url += ';buffing=false';
      }
      if (!algorithm.isSupportBreakingResistances) {
        url += ';breaks=false';
      }
      if (algorithm.supportBuff !== 150) {
        url += ';buffs=' + algorithm.supportBuff;
      }
      if (algorithm.opponentDef !== 1000000) {
        url += ';enemyDef=' + algorithm.opponentDef;
      }
      if (algorithm.opponentSpr !== 1000000) {
        url += ';enemySpr=' + algorithm.opponentSpr;
      }
      for (let i = 0; i < 8; i++) {
        if (algorithm.opponentResistances[i] !== 0) {
          url += ';enemyResist' + i + '=' + algorithm.opponentResistances[i];
        }
      }
      for (let i = 0; i < 8; i++) {
        if (algorithm.supportResistsBreak[i] !== -50) {
          url += ';breakResist' + i + '=' + algorithm.supportResistsBreak[i];
        }
      }
    }
    if (this.unit.selectedBuild.algorithm instanceof AlgorithmFinish) {
      for (let i = 0; i < this.unit.selectedBuild.skills.length; i++) {
        if (+this.unit.selectedBuild.skills[i].chainCombo < 3.6) {
          url += ';skillcombo' + i + '=' + this.unit.selectedBuild.skills[i].chainCombo;
        }
      }
    }
    return url;
  }
}
