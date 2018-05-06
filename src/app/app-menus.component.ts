import {Component, OnInit} from '@angular/core';
import {Unit} from '../core/model/unit.model';
import {UnitsService} from '../core/services/units.service';
import {DatabaseClientService} from '../core/services/database-client.service';
import {UnitSelectionComponent} from './unit-selection/unit-selection.component';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './app-menus.component.html',
  styleUrls: ['./app-menus.component.css']
})
export class AppMenusComponent implements OnInit {
  constructor(public unitsService: UnitsService,
              private dialog: MatDialog,
              private databaseClient: DatabaseClientService,
              private translate: TranslateService,
              private router: Router) {
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
            this.router.navigate(['/']);
          });
      }
    });
  }

  public switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
