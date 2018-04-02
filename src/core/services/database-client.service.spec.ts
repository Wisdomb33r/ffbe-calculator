import {inject, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {HttpClient} from '@angular/common/http';
import {DatabaseClientService} from './database-client.service';

class HttpClientMock {
  public get(url: string): Observable<Object> {
    return Observable.of(null);
  }
}

describe('DatabaseClientService', () => {
  let httpClient: HttpClient = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatabaseClientService,
        {provide: HttpClient, useClass: HttpClientMock},
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
    expect(httpClient.get).toHaveBeenCalledWith('/ffbe/calculator/units.php?id=' + 1234);
  }));

  it('should delegate to HttpClient for accessing units list', inject([DatabaseClientService], (service: DatabaseClientService) => {
    // WHEN
    service.getUnits();
    // THEN
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get).toHaveBeenCalledWith('/ffbe/calculator/units.php');
  }));
});
