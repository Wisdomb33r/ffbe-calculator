import {inject, TestBed} from '@angular/core/testing';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DatabaseClientService} from './database-client.service';
import {TranslateService} from '@ngx-translate/core';
import {Unit} from '../model/unit.model';
import {createMinimalUnit} from './units.service.spec';
import {Equipment} from '../model/equipment.model';

class HttpClientMock {
  public get(url: string): Observable<any> {
    return of(null);
  }

  public post(url: string, body: any): Observable<any> {
    return of(null);
  }
}

class TranslateServiceMock {
  public currentLang = 'fr';
}

describe('DatabaseClientService', () => {
  let httpClient: HttpClient = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatabaseClientService,
        {provide: HttpClient, useClass: HttpClientMock},
        {provide: TranslateService, useClass: TranslateServiceMock},
      ]
    });
  });

  beforeEach(inject([HttpClient], (client: HttpClient) => {
    httpClient = client;
    spyOn(httpClient, 'get').and.callThrough();
    spyOn(httpClient, 'post').and.callThrough();
  }));

  it('should delegate to HttpClient for accessing units by id', inject([DatabaseClientService], (service: DatabaseClientService) => {
    // WHEN
    service.getUnitById$(1234);
    // THEN
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get).toHaveBeenCalledWith('/ffbe/calculator/units.php?id=1234&language=fr');
  }));

  it('should delegate to HttpClient for accessing units list', inject([DatabaseClientService], (service: DatabaseClientService) => {
    // WHEN
    service.getUnits$();
    // THEN
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get).toHaveBeenCalledWith('/ffbe/calculator/units.php?language=fr');
  }));

  it('should delegate to HttpClient for accessing equipments by unit id and slot',
    inject([DatabaseClientService], (service: DatabaseClientService) => {
      // WHEN
      service.getEquipmentsForUnitAndSlot$('head', 555, [4, 13]);
      // THEN
      expect(httpClient.get).toHaveBeenCalled();
      expect(httpClient.get).toHaveBeenCalledWith('/ffbe/calculator/equipments.php?category=head&unit=555&language=fr&addedTypes=4-13');
    }));

  it('should delegate to HttpClient for pushing equipment to backend',
    inject([DatabaseClientService], (service: DatabaseClientService) => {
      // GIVEN
      const unit: Unit = createMinimalUnit();
      unit.selectDefaultBuild();
      unit.selectedBuild.id = 888;
      unit.selectedBuild.equipments.left_hand = {id: 10} as Equipment;
      unit.selectedBuild.equipments.rh_trait1 = {id: 11} as Equipment;
      unit.selectedBuild.equipments.rh_trait2 = {id: 12} as Equipment;
      unit.selectedBuild.equipments.rh_trait3 = {id: 13} as Equipment;
      unit.selectedBuild.equipments.lh_trait1 = {id: 14} as Equipment;
      unit.selectedBuild.equipments.lh_trait2 = {id: 15} as Equipment;
      unit.selectedBuild.equipments.lh_trait3 = {id: 16} as Equipment;
      // WHEN
      service.pushBuild$(unit, false);
      // THEN
      expect(httpClient.post).toHaveBeenCalledTimes(16);
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 1, itemId: 1});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 2, itemId: 10});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 3, itemId: 2});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 4, itemId: 3});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 5, itemId: 4});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 6, itemId: 5});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 7, itemId: 6});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 8, itemId: 7});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 9, itemId: 8});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 10, itemId: 9});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 11, itemId: 11});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 12, itemId: 12});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 13, itemId: 13});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 14, itemId: 14});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 15, itemId: 15});
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/item.php', {buildId: 888, slotId: 16, itemId: 16});
    }));

  it('should delegate to HttpClient for pushing build result to backend',
    inject([DatabaseClientService], (service: DatabaseClientService) => {
      // GIVEN
      const unit: Unit = new Unit(JSON.parse(`{
        "id": 9999,
        "stats": {},
        "builds":[{
          "id": 888,
          "equipments": {}
        }]
      }`));
      unit.selectDefaultBuild();
      unit.selectedBuild.result = {result: 123.15};
      // WHEN
      service.pushBuild$(unit, true);
      // THEN
      expect(httpClient.post).toHaveBeenCalledTimes(1);
      expect(httpClient.post).toHaveBeenCalledWith('/ffbetest/calculator/build.php', {buildId: 888, result: 123});
    }));
});
