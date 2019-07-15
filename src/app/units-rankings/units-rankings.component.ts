import {Component, OnInit} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';
import {Unit} from '../../core/model/unit.model';
import {from} from 'rxjs';
import {ObjectUtils} from '../../core/object-utils';
import {concatMap, map, tap} from 'rxjs/operators';
import {DatabaseClientService} from '../../core/services/database-client.service';
import {Build} from '../../core/model/build.model';

@Component({
  templateUrl: './units-rankings.component.html',
  styleUrls: ['./units-rankings.component.css']
})
export class UnitsRankingsComponent implements OnInit {

  public selectedAlgorithmId: number;
  public isWithKillers = true;
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

  public switchKillers() {
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
      concatMap((unit: Unit) => {
        return this.databaseClient.getUnitById$(unit.id);
      }),

      map((unit: Unit) => {
        return new Unit(unit);
      }),

      tap((unit: Unit) => {
        const rankedUnit = this.rankedUnits.find((u: Unit) => u.id === unit.id);
        rankedUnit.rankingResult = unit.builds
          .filter((build: Build) => build.algorithmId === this.selectedAlgorithmId
            || (build.algorithmId === 7 && this.selectedAlgorithmId === 5))
          .map((build: Build) => {
            unit.selectBuild(build.id);
            if (!this.isWithKillers) {
              unit.selectedBuild.algorithm['isKillerActive'] = false;
            }
            unit.computeAll();
            return build;
          })
          .sort((build1: Build, build2: Build) => build1.result.result - build2.result.result)
          .pop().result.result;
      }),

      tap((unit: Unit) => {
        this.rankedUnits.sort((rankedUnit1: Unit, rankedUnit2: Unit) => rankedUnit2.rankingResult - rankedUnit1.rankingResult);
      }),
    ).subscribe();
  }

  private restoreFromLocalStorage() {
    // TODO implement mechanics to read the calculated values from local storage
  }

}
