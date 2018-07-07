import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Unit} from '../model/unit.model';
import {Equipment} from '../model/equipment.model';
import {TranslateService} from '@ngx-translate/core';

const BASE_URL = '/ffbe/calculator/';
const EQUIPMENT_PATH = BASE_URL + 'equipments.php';
const UNIT_PATH = BASE_URL + 'units.php';

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

  public getEquipmentsForUnitAndSlot$(slot: string, unitId: number): Observable<Array<Equipment>> {
    return this.http.get<Array<Equipment>>(
      EQUIPMENT_PATH + '?category=' + slot + '&unit=' + unitId + '&language=' + this.translatorService.currentLang
    );
  }

  private analyseError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      const message = 'An unexpected error occured : ' + error.error.message;
      return throwError(message);
    } else {
      if (error.status === 404) {
        return of(undefined);
      } else {
        const message = 'Code d\'erreur en provenance du backend ' + error.status;
        return throwError(message);
      }
    }
  }
}
