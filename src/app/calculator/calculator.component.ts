import {Component, OnInit} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';
import {Unit} from '../../core/model/unit.model';
import {MatDialog} from '@angular/material';
import {UnitSelectionComponent} from '../unit-selection/unit-selection.component';
import {DatabaseClientService} from '../../core/services/database-client.service';
import {isNullOrUndefined} from 'util';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public errors: Array<string> = [];

  constructor(public unitsService: UnitsService,
              private dialog: MatDialog,
              private databaseClient: DatabaseClientService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.unitsService.loadUnits();
  }

  public openUnitSelectionPane() {
    const dialogRef = this.dialog.open(UnitSelectionComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe((result: Unit) => {
      if (!isNullOrUndefined(result)) {
        this.databaseClient.getUnitById$(result.id)
          .subscribe((unit: Unit) => {
            this.unitsService.selectedUnit = new Unit(unit);
            this.unitsService.selectedUnit.selectDefaultBuild();
            this.unitsService.selectedUnit.computeAll();
          });
      }
    });
  }

  public computeAfterEquipmentChanged() {
    this.unitsService.selectedUnit.computeAll();
  }

  public switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
