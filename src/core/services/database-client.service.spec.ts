import {inject, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {HttpClient} from '@angular/common/http';
import {DatabaseClientService} from './database-client.service';
import {TranslateService} from '@ngx-translate/core';

class HttpClientMock {
  public get(url: string): Observable<Object> {
    return Observable.of(null);
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
  }));

  it('should be created', inject([DatabaseClientService], (service: DatabaseClientService) => {
    expect(service).toBeTruthy();
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
      service.getEquipmentsForUnitAndSlot$('head', 555);
      // THEN
      expect(httpClient.get).toHaveBeenCalled();
      expect(httpClient.get).toHaveBeenCalledWith('/ffbe/calculator/equipments.php?category=head&unit=555&language=fr');
    }));
});
