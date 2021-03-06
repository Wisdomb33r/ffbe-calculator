import {Component, Inject} from '@angular/core';
import {Unit} from '../core/model/unit.model';
import {UnitsService} from '../core/services/units.service';
import {DatabaseClientService} from '../core/services/database-client.service';
import {UnitSelectionComponent} from './popup/unit-selection/unit-selection.component';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-menus',
  templateUrl: './app-menus.component.html',
  styleUrls: ['./app-menus.component.css']
})
export class AppMenusComponent {
  constructor(public unitsService: UnitsService,
              private dialog: MatDialog,
              private databaseClient: DatabaseClientService,
              private translate: TranslateService,
              private router: Router,
              private meta: Meta,
              private title: Title,
              @Inject(DOCUMENT) private document) {
  }

  public openUnitSelectionPane() {
    if (this.router.url === '/' || !this.unitsService.selectedUnit) {
      const dialogRef = this.dialog.open(UnitSelectionComponent);

      dialogRef.afterClosed().subscribe((result: Unit) => {
        if (!isNullOrUndefined(result)) {
          this.databaseClient.getUnitById$(result.id)
            .subscribe((unit: Unit) => {
              this.unitsService.selectedUnit = new Unit(unit);
              this.unitsService.selectedUnit.selectDefaultBuild();
              this.unitsService.selectedUnit.computeAll();
              if ((<any>window).ga) {
                (<any>window).ga('send', 'event', {
                  eventCategory: 'calculatorUnit',
                  eventLabel: 'Select unit ' + unit.id,
                  eventAction: 'selectUnit',
                  eventValue: 1
                });
              }
              this.router.navigate(['/']);
            });
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  public goToUnitSelection() {
    if (this.unitsService.isLoaded()) {
      this.openUnitSelectionPane();
    } else {
      this.unitsService.loadUnits$().subscribe(units => this.openUnitSelectionPane());
    }
  }

  public navigateToRankings() {
    this.router.navigate(['/rankings']);
  }

  public switchLanguage(lang: string) {
    this.translate.use(lang);

    this.document.documentElement.lang = lang;
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="keywords"');
    this.translate.get('calculator.app.title').subscribe(translated => this.title.setTitle(translated));
    this.translate.get('calculator.app.description').subscribe(translated => this.meta.addTag({name: 'description', content: translated}));
    this.translate.get('calculator.app.keywords').subscribe(translated => this.meta.addTag({name: 'keywords', content: translated}));
    this.unitsService.loadUnits$().subscribe();
  }
}
