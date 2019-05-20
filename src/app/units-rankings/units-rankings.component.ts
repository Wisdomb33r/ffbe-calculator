import {Component, OnInit} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';
import {Unit} from '../../core/model/unit.model';
import {from} from 'rxjs';
import {ObjectUtils} from '../../core/object-utils';
import {map, switchMap} from 'rxjs/operators';
import {DatabaseClientService} from '../../core/services/database-client.service';

@Component({
  templateUrl: './units-rankings.component.html',
  styleUrls: ['./units-rankings.component.css']
})
export class UnitsRankingsComponent implements OnInit {

  public selectedAlgorithmId: number;
  public rankedUnits: Array<Unit> = [];

  constructor(private unitsService: UnitsService,
              private databaseClient: DatabaseClientService) {
  }

  ngOnInit() {
  }

  public changeAlgorithm() {
    this.rankedUnits = this.unitsService.getUnitListByAlgorithm(this.selectedAlgorithmId);
    this.restoreFromLocalStorage();
  }

  public calculateMissingBuilds() {
    if ((<any>window).ga) {
      (<any>window).ga('send', 'event', {
        eventCategory: 'calculatorRankings',
        eventLabel: 'Calculate ranking for algorithm ' + this.selectedAlgorithmId,
        eventAction: 'calculateRanking',
        eventValue: 1
      });
    }

    from(this.rankedUnits.filter((unit: Unit) => ObjectUtils.isNullOrUndefined(unit.rankingResult))).pipe(
      switchMap((unit: Unit) => {
        return this.databaseClient.getUnitById$(unit.id);
      }),

      map((unit: Unit) => {
        return new Unit(unit);
      })
    ).subscribe();
  }

  private restoreFromLocalStorage() {
    // TODO implement mechanics to read the calculated values from local storage
  }

}
