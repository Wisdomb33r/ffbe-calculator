import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {forkJoin, Observable, throwError} from 'rxjs';
import {Unit} from '../model/unit.model';
import {Equipment} from '../model/equipment.model';
import {TranslateService} from '@ngx-translate/core';
import {ApplicationLoaderService} from './application-loader.service';
import {catchError, tap} from 'rxjs/operators';

const BASE_URL = '/ffbe/calculator/';
const EQUIPMENT_PATH = BASE_URL + 'equipments.php';
const UNIT_PATH = BASE_URL + 'units.php';
const BASE_PUSH_URL = '/ffbetest/calculator/';
const BUILD_PUSH_URL = BASE_PUSH_URL + 'build.php';
const ITEM_PUSH_URL = BASE_PUSH_URL + 'item.php';

@Injectable()
export class DatabaseClientService {

  constructor(private http: HttpClient,
              private loader: ApplicationLoaderService,
              private translatorService: TranslateService) {
  }

  public getUnitById$(id: number): Observable<Unit> {
    this.loader.startLoaderAnimation();
    return this.http.get<Unit>(UNIT_PATH + '?id=' + id + '&language=' + this.translatorService.currentLang + '&time=' + Date.now()).pipe(
      tap(() => this.loader.stopLoaderAnimation()),
      catchError((error: HttpErrorResponse) => {
        this.loader.stopLoaderAnimation();
        return throwError(error);
      }),
    );
  }

  public getUnits$(): Observable<Array<Unit>> {
    this.loader.startLoaderAnimation();
    return this.http.get<Array<Unit>>(UNIT_PATH + '?language=' + this.translatorService.currentLang + '&time=' + Date.now()).pipe(
      tap(() => this.loader.stopLoaderAnimation()),
      catchError((error: HttpErrorResponse) => {
        this.loader.stopLoaderAnimation();
        return throwError(error);
      }),
    );
  }

  public getItemById$(itemId: number): Observable<Equipment> {
    return this.http.get<Equipment>(EQUIPMENT_PATH + '?id=' + itemId + '&language=' + this.translatorService.currentLang);
  }

  public getEquipmentsForUnitAndSlot$(slot: string, unitId: number, extraEquipmentTypes: Array<number>): Observable<Array<Equipment>> {
    this.loader.startLoaderAnimation();
    return this.http.get<Array<Equipment>>(
      EQUIPMENT_PATH + '?category=' + slot + '&unit=' + unitId + '&language=' + this.translatorService.currentLang
      + (extraEquipmentTypes && extraEquipmentTypes.length ? '&addedTypes=' + extraEquipmentTypes.join('-') : '') + '&time=' + Date.now()
    ).pipe(
      tap(() => this.loader.stopLoaderAnimation()),
      catchError((error: HttpErrorResponse) => {
        this.loader.stopLoaderAnimation();
        return throwError(error);
      }),
    );
  }

  public getEquipmentsForWeaponCategory$(category: number): Observable<Array<Equipment>> {
    this.loader.startLoaderAnimation();
    return this.http.get<Array<Equipment>>(
      EQUIPMENT_PATH + '?weapon=' + category + '&language=' + this.translatorService.currentLang + '&time=' + Date.now()
    ).pipe(
      tap(() => this.loader.stopLoaderAnimation()),
      catchError((error: HttpErrorResponse) => {
        this.loader.stopLoaderAnimation();
        return throwError(error);
      }),
    );
  }

  private pushBuildResult$(buildId: number, result: number): Observable<any> {
    return this.http.post<any>(BUILD_PUSH_URL, {buildId: buildId, result: Math.round(result)});
  }

  private pushItem$(buildId: number, slotId: number, itemId: number) {
    return this.http.post<any>(ITEM_PUSH_URL, {buildId: buildId, slotId: slotId, itemId: itemId});
  }

  public pushBuild$(unit: Unit, isResultToBePushed: boolean): Observable<Array<any>> {
    const observables: Array<Observable<any>> = [];
    if (isResultToBePushed) {
      observables.push(this.pushBuildResult$(unit.selectedBuild.id, unit.selectedBuild.result.result));
    }
    if (unit.selectedEquipmentSet.right_hand) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 1, unit.selectedEquipmentSet.right_hand.id));
    }
    if (unit.selectedEquipmentSet.left_hand) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 2, unit.selectedEquipmentSet.left_hand.id));
    }
    if (unit.selectedEquipmentSet.head) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 3, unit.selectedEquipmentSet.head.id));
    }
    if (unit.selectedEquipmentSet.body) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 4, unit.selectedEquipmentSet.body.id));
    }
    if (unit.selectedEquipmentSet.accessory1) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 5, unit.selectedEquipmentSet.accessory1.id));
    }
    if (unit.selectedEquipmentSet.accessory2) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 6, unit.selectedEquipmentSet.accessory2.id));
    }
    if (unit.selectedEquipmentSet.materia1) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 7, unit.selectedEquipmentSet.materia1.id));
    }
    if (unit.selectedEquipmentSet.materia2) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 8, unit.selectedEquipmentSet.materia2.id));
    }
    if (unit.selectedEquipmentSet.materia3) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 9, unit.selectedEquipmentSet.materia3.id));
    }
    if (unit.selectedEquipmentSet.materia4) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 10, unit.selectedEquipmentSet.materia4.id));
    }
    if (unit.selectedEquipmentSet.rh_trait1) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 11, unit.selectedEquipmentSet.rh_trait1.id));
    }
    if (unit.selectedEquipmentSet.rh_trait2) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 12, unit.selectedEquipmentSet.rh_trait2.id));
    }
    if (unit.selectedEquipmentSet.rh_trait3) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 13, unit.selectedEquipmentSet.rh_trait3.id));
    }
    if (unit.selectedEquipmentSet.lh_trait1) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 14, unit.selectedEquipmentSet.lh_trait1.id));
    }
    if (unit.selectedEquipmentSet.lh_trait2) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 15, unit.selectedEquipmentSet.lh_trait2.id));
    }
    if (unit.selectedEquipmentSet.lh_trait3) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 16, unit.selectedEquipmentSet.lh_trait3.id));
    }
    return forkJoin(observables);
  }
}
