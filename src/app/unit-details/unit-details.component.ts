import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Unit} from '../../core/model/unit.model';
import {DatabaseClientService} from '../../core/services/database-client.service';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent implements OnInit, OnChanges {

  @Input() unit: Unit;
  public detailedUnit: Unit;

  constructor(private databaseClient: DatabaseClientService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {console.log('loading detailed char');
    this.databaseClient.getUnitById$(this.unit.id)
      .subscribe((unit: Unit) => this.detailedUnit = unit);
  }
}
