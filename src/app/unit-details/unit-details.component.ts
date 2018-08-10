import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Unit} from '../../core/model/unit.model';
import {MatDialog} from '@angular/material';
import {UnitDetailsStatSumComponent} from '../unit-details-stat-sum/unit-details-stat-sum.component';
import {TranslateService} from '@ngx-translate/core';
import {EsperSelectionComponent} from '../popup/esper-selection/esper-selection.component';
import {Esper} from '../../core/model/esper.model';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent implements OnChanges {

  @Input() unit: Unit;
  @Output() esperChanged: EventEmitter<Esper> = new EventEmitter<Esper>();
  public ranks = [];
  public selectedBuildId;

  constructor(private dialog: MatDialog,
              private translateService: TranslateService) {
  }

  ngOnChanges() {
    this.ranks = Array(this.unit.rank).fill(1); // filled with dummy 1 values
    this.selectedBuildId = this.unit.selectedBuild.id;
  }

  displayStatDetails(stat: string) {
    this.dialog.open(UnitDetailsStatSumComponent, {
      data: {
        unitStats: this.unit.stats,
        stat: stat,
        esper: this.unit.selectedBuild.esper,
        doublehanding: this.unit.selectedBuild.equipments.isDoubleHandActive()
        || this.unit.selectedBuild.equipments.isTrueDoubleHandActive(),
        dualwielding: this.unit.selectedBuild.equipments.isDualWielding(),
      }
    });
  }

  public getEsperName() {
    return this.unit.selectedBuild.esper['name_' + this.translateService.currentLang];
  }

  public getEsperBuildName(esper: Esper) {
    return esper['build_' + this.translateService.currentLang];
  }

  public openEsperSelectionPane() {
    this.dialog.open(EsperSelectionComponent)
      .afterClosed().subscribe((esper: Esper) => {
      if (esper) {
        this.unit.selectedBuild.esper = esper;
        this.esperChanged.emit(esper);
      }
    });
  }

  public changeBuild(build) {
    if (build.id !== this.unit.selectedBuild.id) {
      this.unit.selectedBuild = build;
      this.unit.computeAll();
    }
  }
}
