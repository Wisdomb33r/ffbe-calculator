import {inject, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FfchClientService} from './database-client.service';
import {HttpClient} from '@angular/common/http';

class HttpClientMock {
  public get(url: string): Observable<Object> {
    return Observable.of(null);
  }
}

describe('FfchClientService', () => {
  let httpClient: HttpClient = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FfchClientService,
        {provide: HttpClient, useClass: HttpClientMock},
      ]
    });
  });

  beforeEach(inject([HttpClient], (client: HttpClient) => {
    httpClient = client;
    spyOn(httpClient, 'get').and.callThrough();
  }));

  it('should be created', inject([FfchClientService], (service: FfchClientService) => {
    expect(service).toBeTruthy();
  }));

  it('should delegate to HttpClient for accessing competences', inject([FfchClientService], (service: FfchClientService) => {
    // WHEN
    service.getCompetenceByGumiId$(1234);
    // THEN
    expect(httpClient.get).toHaveBeenCalled();
    expect(httpClient.get).toHaveBeenCalledWith('/admin/skills.php?id=' + 1234);
  }));
});
