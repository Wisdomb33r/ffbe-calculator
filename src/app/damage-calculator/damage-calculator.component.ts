import {Component, OnInit} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';
import {Unit} from '../../core/model/unit.model';
import {MatDialog} from '@angular/material';
import {UnitSelectionComponent} from '../unit-selection/unit-selection.component';

@Component({
  selector: 'app-damage-calculator',
  templateUrl: './damage-calculator.component.html',
  styleUrls: ['./damage-calculator.component.css']
})
export class DamageCalculatorComponent implements OnInit {

  public selectedUnit: Unit = null;
  public errors: Array<string> = [];

  constructor(private unitsService: UnitsService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.unitsService.loadUnits();
  }

  public openUnitSelectionPane() {
    const dialogRef = this.dialog.open(UnitSelectionComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: Unit) => {
      this.selectedUnit = result;
    });
  }

}
