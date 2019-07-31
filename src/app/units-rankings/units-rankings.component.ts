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
    if (!this.unitsService.isLoaded()) {
      this.unitsService.loadUnits$().subscribe();
    }
  }

  public changeAlgorithm() {
    this.unitsService.resetUnitsRankingResults();
    this.rankedUnits = this.unitsService.getUnitListByAlgorithm(this.selectedAlgorithmId);
    this.restoreFromLocalStorage();
    this.sortRankedUnits();
  }

  public switchKillers() {
    this.unitsService.resetUnitsRankingResults();
    this.restoreFromLocalStorage();
    this.sortRankedUnits();
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
            || (build.algorithmId === 7 && this.selectedAlgorithmId === 5) // esper call as magical finisher
            || (build.algorithmId === 10 && this.selectedAlgorithmId === 5) // evoker finisher as magical finisher
            || (build.algorithmId === 9 && this.selectedAlgorithmId === 2)) // evoker chaining as magical chaining
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
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        localStorage.setItem(this.constructLocalStorageKey(unit.id), JSON.stringify({
          rankingResult: rankedUnit.rankingResult,
          validity: tomorrow.getTime()
        }));
      }),

      tap((unit: Unit) => {
        this.sortRankedUnits();
      }),
    ).subscribe();
  }

  private constructLocalStorageKey(unitId: number): string {
    return '' + unitId + '-' + this.selectedAlgorithmId + '-' + (this.isWithKillers ? 'true' : 'false');
  }

  private sortRankedUnits() {
    this.rankedUnits.sort((rankedUnit1: Unit, rankedUnit2: Unit) => {
      if (rankedUnit1.rankingResult && rankedUnit2.rankingResult) {
        return rankedUnit2.rankingResult - rankedUnit1.rankingResult;
      } else if (rankedUnit1.rankingResult) {
        return -1;
      } else if (rankedUnit2.rankingResult) {
        return 1;
      } else {
        return rankedUnit1.name < rankedUnit2.name ? -1 : 1;
      }
    });
  }

  private restoreFromLocalStorage() {
    const now: Date = new Date();
    this.rankedUnits.forEach((unit: Unit) => {
      const fromStorage: string = localStorage.getItem(this.constructLocalStorageKey(unit.id));
      if (fromStorage) {
        const objectFromStorage = JSON.parse(fromStorage);
        if (objectFromStorage && objectFromStorage.rankingResult
          && objectFromStorage.validity && objectFromStorage.validity >= now.getTime()) {
          unit.rankingResult = objectFromStorage.rankingResult;
        }
      }
    });
  }

}
