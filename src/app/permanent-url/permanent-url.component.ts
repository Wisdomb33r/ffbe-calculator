import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Unit} from '../../core/model/unit.model';
import {Equipment} from '../../core/model/equipment.model';

@Component({
  selector: 'app-permanent-url',
  templateUrl: './permanent-url.component.html',
  styleUrls: ['./permanent-url.component.css']
})
export class PermanentUrlComponent implements OnInit, OnChanges {

  public url: string;
  @Input() unit: Unit;
  @Input() right_hand: Equipment;
  @Input() left_hand: Equipment;
  @Input() head: Equipment;
  @Input() body: Equipment;
  @Input() accessory1: Equipment;
  @Input() accessory2: Equipment;
  @Input() materia1: Equipment;
  @Input() materia2: Equipment;
  @Input() materia3: Equipment;
  @Input() materia4: Equipment;

  constructor() {
  }

  ngOnInit() {
    this.url = this.getPermanentUrl();
  }

  ngOnChanges() {
    this.url = this.getPermanentUrl();
  }

  public getPermanentUrl(): string {
    let url = 'https://www.final-fantasy.ch/ffbe/calculator/link/unit/' + this.unit.id;
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
    return url;
  }

}
