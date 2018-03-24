import {Component, OnInit} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';
import {Unit} from '../../core/model/unit.model';
import {MatDialog} from '@angular/material';
import {UnitSelectionComponent} from '../unit-selection/unit-selection.component';
import {DatabaseClientService} from '../../core/services/database-client.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-damage-calculator',
  templateUrl: './damage-calculator.component.html',
  styleUrls: ['./damage-calculator.component.css']
})
export class DamageCalculatorComponent implements OnInit {

  public selectedUnit: Unit = null;
  public errors: Array<string> = [];

  constructor(private unitsService: UnitsService,
              private dialog: MatDialog,
              private databaseClient: DatabaseClientService) {
  }

  ngOnInit() {
    this.unitsService.loadUnits();
  }

  public openUnitSelectionPane() {
    const dialogRef = this.dialog.open(UnitSelectionComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: Unit) => {
      if (!isNullOrUndefined(result)) {
        this.databaseClient.getUnitById$(result.id)
          .subscribe((unit: Unit) => {
            this.selectedUnit = new Unit(unit);
            this.selectedUnit.selectDefaultBuild();
            this.selectedUnit.computeAll();
          });
      }
    });
  }

}
