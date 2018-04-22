import {Injectable} from '@angular/core';
import {DatabaseClientService} from './database-client.service';
import {Unit} from '../model/unit.model';

@Injectable()
export class UnitsService {

  public units: Array<Unit>;
  public selectedUnit: Unit;

  constructor(private databaseClient: DatabaseClientService) {
  }

  public loadUnits() {
    this.databaseClient.getUnits()
      .subscribe(units => this.units = units);
  }
}
