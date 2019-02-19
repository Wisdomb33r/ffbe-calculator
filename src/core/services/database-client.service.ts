import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Unit} from '../model/unit.model';
import {Equipment} from '../model/equipment.model';
import {TranslateService} from '@ngx-translate/core';

const BASE_URL = '/ffbe/calculator/';
const EQUIPMENT_PATH = BASE_URL + 'equipments.php';
const UNIT_PATH = BASE_URL + 'units.php';
const BASE_PUSH_URL = '/ffbetest/calculator/';
const BUILD_PUSH_URL = BASE_PUSH_URL + 'build.php';
const ITEM_PUSH_URL = BASE_PUSH_URL + 'item.php';

@Injectable()
export class DatabaseClientService {

  constructor(private http: HttpClient,
              private translatorService: TranslateService) {
  }

  public getUnitById$(id: number): Observable<Unit> {
    return this.http.get<Unit>(UNIT_PATH + '?id=' + id + '&language=' + this.translatorService.currentLang);
  }

  public getUnits$(): Observable<Array<Unit>> {
    return this.http.get<Array<Unit>>(UNIT_PATH + '?language=' + this.translatorService.currentLang);
  }

  public getEquipmentsForUnitAndSlot$(slot: string, unitId: number, extraEquipmentTypes: Array<number>): Observable<Array<Equipment>> {
    return this.http.get<Array<Equipment>>(
      EQUIPMENT_PATH + '?category=' + slot + '&unit=' + unitId + '&language=' + this.translatorService.currentLang
      + (extraEquipmentTypes && extraEquipmentTypes.length ? '&addedTypes=' + extraEquipmentTypes.join('-') : '')
    );
  }

  public getEquipmentsForWeaponCategory$(category: number): Observable<Array<Equipment>> {
    return this.http.get<Array<Equipment>>(
      EQUIPMENT_PATH + '?weapon=' + category + '&language=' + this.translatorService.currentLang
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
    if (unit.selectedBuild.equipments.right_hand) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 1, unit.selectedBuild.equipments.right_hand.id));
    }
    if (unit.selectedBuild.equipments.left_hand) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 2, unit.selectedBuild.equipments.left_hand.id));
    }
    if (unit.selectedBuild.equipments.head) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 3, unit.selectedBuild.equipments.head.id));
    }
    if (unit.selectedBuild.equipments.body) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 4, unit.selectedBuild.equipments.body.id));
    }
    if (unit.selectedBuild.equipments.accessory1) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 5, unit.selectedBuild.equipments.accessory1.id));
    }
    if (unit.selectedBuild.equipments.accessory2) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 6, unit.selectedBuild.equipments.accessory2.id));
    }
    if (unit.selectedBuild.equipments.materia1) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 7, unit.selectedBuild.equipments.materia1.id));
    }
    if (unit.selectedBuild.equipments.materia2) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 8, unit.selectedBuild.equipments.materia2.id));
    }
    if (unit.selectedBuild.equipments.materia3) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 9, unit.selectedBuild.equipments.materia3.id));
    }
    if (unit.selectedBuild.equipments.materia4) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 10, unit.selectedBuild.equipments.materia4.id));
    }
    if (unit.selectedBuild.equipments.rh_trait1) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 11, unit.selectedBuild.equipments.rh_trait1.id));
    }
    if (unit.selectedBuild.equipments.rh_trait2) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 12, unit.selectedBuild.equipments.rh_trait2.id));
    }
    if (unit.selectedBuild.equipments.rh_trait3) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 13, unit.selectedBuild.equipments.rh_trait3.id));
    }
    if (unit.selectedBuild.equipments.lh_trait1) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 14, unit.selectedBuild.equipments.lh_trait1.id));
    }
    if (unit.selectedBuild.equipments.lh_trait2) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 15, unit.selectedBuild.equipments.lh_trait2.id));
    }
    if (unit.selectedBuild.equipments.lh_trait3) {
      observables.push(this.pushItem$(unit.selectedBuild.id, 16, unit.selectedBuild.equipments.lh_trait3.id));
    }
    return forkJoin(observables);
  }
}
