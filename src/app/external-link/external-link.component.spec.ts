import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ExternalLinkComponent} from './external-link.component';
import {MatCardModule} from '@angular/material';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {Equipment} from '../../core/model/equipment.model';
import {DatabaseClientService} from '../../core/services/database-client.service';
import {UnitsService} from '../../core/services/units.service';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';

class UnitServiceMock {
  public getAllowedEquipmentsForSlot$(slot: string): Observable<Array<Equipment>> {
    if (slot === 'right_hand') {
      return of([new Equipment(JSON.parse('{"id":1}'))]);
    }
    if (slot === 'head') {
      return of([new Equipment(JSON.parse('{"id":2}'))]);
    }
  }

  public equipInSlot(slot: string, equipement: Equipment) {
  }
}

xdescribe('ExternalLinkComponent', () => {
  let component: ExternalLinkComponent;
  let unitService: UnitsService;
  let fixture: ComponentFixture<ExternalLinkComponent>;
  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };
  const routeMock = {
    paramMap: jasmine.createSpy('paramMap')
  };
  const databaseClientMock = {
    getUnitById$: jasmine.createSpy('getUnitById$')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExternalLinkComponent
      ],
      imports: [
        MatCardModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: DatabaseClientService, useValue: databaseClientMock},
        {provide: UnitsService, useClass: UnitServiceMock},
        {provide: Router, useValue: routerMock},
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({
              id: '999',
              right_hand: 1,
              head: 2,
            }))
          }
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ExternalLinkComponent);
    component = fixture.componentInstance;
  });

  beforeEach(inject([UnitsService], (service: UnitsService) => {
    unitService = service;
    spyOn(unitService, 'getAllowedEquipmentsForSlot$').and.callThrough();
    spyOn(unitService, 'equipInSlot').and.callThrough();
    console.log('spy added to unitService');
    console.log(unitService);
  }));

  it('should load a unit according to route parameters', () => {
    // GIVEN
    databaseClientMock.getUnitById$.and.returnValue(of(JSON.parse(`{
      "id":999,
      "stats": {"hp":3000,"mp":200,"atk":300,"mag":400,"def":500,"spr":600},
      "builds":[
        {
          "algorithmId":8,
          "equipments":{
            "right_hand":{"id":1},
            "head":{"id":2},
            "body":{"id":3},
            "accessory1":{"id":4},
            "accessory2":{"id":5},
            "materia1":{"id":6},
            "materia2":{"id":7}
          }
        }
      ]
    }`)));

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      expect(databaseClientMock.getUnitById$).toHaveBeenCalledTimes(1);
      expect(databaseClientMock.getUnitById$).toHaveBeenCalledWith(999);
      expect(unitService.getAllowedEquipmentsForSlot$).toHaveBeenCalledTimes(5);
      expect(unitService.equipInSlot).toHaveBeenCalledTimes(2);
      expect(component.currentStep).toEqual(6);
    });
  });
});
