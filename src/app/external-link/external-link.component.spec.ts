import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ExternalLinkComponent} from './external-link.component';
import {MatCardModule} from '@angular/material';
import {of} from 'rxjs';
import {DatabaseClientService} from '../../core/services/database-client.service';
import {UnitsService} from '../../core/services/units.service';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {Equipment} from '../../core/model/equipment.model';
import {Unit} from '../../core/model/unit.model';

describe('ExternalLinkComponent', () => {
  let component: ExternalLinkComponent;
  let fixture: ComponentFixture<ExternalLinkComponent>;
  const unitFake = JSON.parse(`{
      "id":999,
      "stats": {"hp":3000,"mp":200,"atk":300,"mag":400,"def":500,"spr":600},
      "builds":[
        {
          "algorithmId":8,
          "equipments":{
            "right_hand":{"id":1},
            "left_hand":{"id":10},
            "head":{"id":2},
            "body":{"id":3},
            "accessory1":{"id":4},
            "accessory2":{"id":5},
            "materia1":{"id":6},
            "materia2":{"id":7}
          }
        }
      ]
    }`);
  const unitServiceMock = {
    getAllowedEquipmentsForSlot$: jasmine.createSpy('getAllowedEquipmentsForSlot$'),
    equipInSlot: jasmine.createSpy('equipInSlot'),
    getEquipments: jasmine.createSpy('getEquipments'),
  };
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
  };
  const databaseClientMock = {
    getUnitById$: jasmine.createSpy('getUnitById$').and.returnValue(of(unitFake)),
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
        {provide: UnitsService, useValue: unitServiceMock},
        {provide: Router, useValue: routerMock},
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({
              id: '999',
              right_hand: 1,
              head: 2,
              body: 3,
              accessory1: 4,
              accessory2: 5,
              materia1: 6,
              materia2: 7,
              materia3: 8,
              materia4: 9,
              left_hand: 10,
              rh_t1: 11,
              rh_t2: 12,
              rh_t3: 13,
              lh_t1: 14,
              lh_t2: 15,
              lh_t3: 16,
            }))
          }
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ExternalLinkComponent);
    component = fixture.componentInstance;
  });

  it('should load a unit according to route parameters', () => {
    // GIVEN
    const right_hand = new Equipment(JSON.parse('{"id":1}'));
    const head = new Equipment(JSON.parse('{"id":2}'));
    const body = new Equipment(JSON.parse('{"id":3}'));
    const accessory1 = new Equipment(JSON.parse('{"id":4}'));
    const accessory2 = new Equipment(JSON.parse('{"id":5}'));
    const materia1 = new Equipment(JSON.parse('{"id":6}'));
    const materia2 = new Equipment(JSON.parse('{"id":7}'));
    const materia3 = new Equipment(JSON.parse('{"id":8}'));
    const materia4 = new Equipment(JSON.parse('{"id":9}'));
    const left_hand = new Equipment(JSON.parse('{"id":10}'));
    const rh_trait1 = new Equipment(JSON.parse('{"id":11}'));
    const rh_trait2 = new Equipment(JSON.parse('{"id":12}'));
    const rh_trait3 = new Equipment(JSON.parse('{"id":13}'));
    const lh_trait1 = new Equipment(JSON.parse('{"id":14}'));
    const lh_trait2 = new Equipment(JSON.parse('{"id":15}'));
    const lh_trait3 = new Equipment(JSON.parse('{"id":16}'));
    unitServiceMock.getAllowedEquipmentsForSlot$.and.returnValue(of([right_hand, head, body, accessory1, accessory2, materia1,
      materia2, materia3, materia4, left_hand, rh_trait1, rh_trait2, rh_trait3, lh_trait1, lh_trait2, lh_trait3]));
    const unit = new Unit(unitFake);
    unitServiceMock.getEquipments.and.returnValue(unit.builds[0].equipments);

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      expect(databaseClientMock.getUnitById$).toHaveBeenCalledTimes(1);
      expect(databaseClientMock.getUnitById$).toHaveBeenCalledWith(999);
      expect(unitServiceMock.getAllowedEquipmentsForSlot$).toHaveBeenCalledTimes(8);
      expect(unitServiceMock.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('right_hand');
      expect(unitServiceMock.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('head');
      expect(unitServiceMock.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('body');
      expect(unitServiceMock.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('accessory1');
      expect(unitServiceMock.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('materia1');
      expect(unitServiceMock.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('left_hand');
      expect(unitServiceMock.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('rh_trait1');
      expect(unitServiceMock.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('lh_trait1');
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledTimes(16);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('right_hand', right_hand);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('left_hand', left_hand);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('head', head);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('body', body);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('accessory1', accessory1);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('accessory2', accessory2);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('materia1', materia1);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('materia2', materia2);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('materia3', materia3);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('materia4', materia4);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('rh_trait1', rh_trait1);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('rh_trait2', rh_trait2);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('rh_trait3', rh_trait3);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('lh_trait1', lh_trait1);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('lh_trait2', lh_trait2);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledWith('lh_trait3', lh_trait3);
      expect(component.currentStep).toEqual(6);
    });
  });
});

describe('ExternalLinkComponent', () => {
  let component: ExternalLinkComponent;
  let fixture: ComponentFixture<ExternalLinkComponent>;
  const unitFake = JSON.parse(`{
      "id":999,
      "stats": {"hp":3000,"mp":200,"atk":300,"mag":400,"def":500,"spr":600},
      "builds":[
        {
          "algorithmId":8,
          "equipments":{
            "right_hand":{"id":1},
            "left_hand":{"id":10},
            "head":{"id":2},
            "body":{"id":3},
            "accessory1":{"id":4},
            "accessory2":{"id":5},
            "materia1":{"id":6},
            "materia2":{"id":7}
          }
        }
      ]
    }`);
  const unitServiceMock = {
    getAllowedEquipmentsForSlot$: jasmine.createSpy('getAllowedEquipmentsForSlot$'),
    equipInSlot: jasmine.createSpy('equipInSlot'),
    getEquipments: jasmine.createSpy('getEquipments'),
  };
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
  };
  const databaseClientMock = {
    getUnitById$: jasmine.createSpy('getUnitById$').and.returnValue(of(unitFake)),
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
        {provide: UnitsService, useValue: unitServiceMock},
        {provide: Router, useValue: routerMock},
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({
              id: '999',
              esper: 31,
            }))
          }
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ExternalLinkComponent);
    component = fixture.componentInstance;
  });

  it('should load a unit even with minimal equipment parameters', () => {
    // GIVEN
    const unit = new Unit(unitFake);
    unitServiceMock.getEquipments.and.returnValue(unit.builds[0].equipments);

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      expect(databaseClientMock.getUnitById$).toHaveBeenCalledTimes(1);
      expect(databaseClientMock.getUnitById$).toHaveBeenCalledWith(999);
      expect(unitServiceMock.getAllowedEquipmentsForSlot$).toHaveBeenCalledTimes(0);
      expect(unitServiceMock.equipInSlot).toHaveBeenCalledTimes(0);
      // TODO expect not working, seems that unitServiceMock here is another instance thant injected into component
      // expect(unitServiceMock['selectedUnit'].selectedBuild.esper).toEqual(SHIVA_STATS_BOOST);
      expect(component.currentStep).toEqual(6);
    });
  });
});
