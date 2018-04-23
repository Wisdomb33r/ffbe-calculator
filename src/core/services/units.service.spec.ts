import {inject, TestBed} from '@angular/core/testing';

import {UnitsService} from './units.service';
import {Observable} from 'rxjs/Observable';
import {DatabaseClientService} from './database-client.service';
import {Unit} from '../model/unit.model';
import {Equipment} from '../model/equipment.model';

class DatabaseClientMock {
  public getEquipmentsForUnitAndSlot$(slot: string, unitId: number): Observable<Object> {
    return Observable.of(null);
  }
}

function createMinimalUnit(): Unit {
  return new Unit(JSON.parse(`{
    "id": 9999,
    "stats": {},
    "builds":[{
      "equipments": {
        "right_hand": {"id": 1},
        "head": {"id": 2},
        "body": {"id": 3},
        "accessory1": {"id": 4},
        "accessory2": {"id": 5},
        "materia1": {"id": 6},
        "materia2": {"id": 7},
        "materia3": {"id": 8},
        "materia4": {"id": 9}
      }
    }]
  }`));
}

describe('UnitsService', () => {
  let databaseClient: DatabaseClientService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnitsService,
        {provide: DatabaseClientService, useClass: DatabaseClientMock},
      ]
    });
  });

  beforeEach(inject([DatabaseClientService], (client: DatabaseClientService) => {
    databaseClient = client;
  }));

  it('should be created', inject([UnitsService], (service: UnitsService) => {
    expect(service).toBeTruthy();
  }));

  it('#getAllowedEquipmentsForSlot$ should not filter equipments and return an observable',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(Observable.of([new Equipment(JSON.parse('{"id": 111}'))]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('head');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('head', 9999);
      equipments.subscribe(result => expect(result.length).toEqual(1));
    }));

  it('#getAllowedEquipmentsForSlot$ should filter unique materias which are already equipped',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(Observable.of([
        new Equipment(JSON.parse('{"id": 9, "unique": true}')), // unique and equipped
        new Equipment(JSON.parse('{"id": 8, "unique": true}')), // unique and equipped
        new Equipment(JSON.parse('{"id": 7, "unique": false}')),
        new Equipment(JSON.parse('{"id": 6, "unique": false}')),
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('materia1');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('materia1', 9999);
      equipments.subscribe(result => {
        expect(result.length).toEqual(2);
        expect(result[0].id).toEqual(7);
        expect(result[1].id).toEqual(6);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should filter unique accessories which are already equipped',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(Observable.of([
        new Equipment(JSON.parse('{"id": 4, "unique": true}')), // unique and equipped
        new Equipment(JSON.parse('{"id": 5, "unique": false}')),
        new Equipment(JSON.parse('{"id": 11, "unique": true}')),
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('accessory2');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('accessory2', 9999);
      equipments.subscribe(result => {
        expect(result.length).toEqual(2);
        expect(result[0].id).toEqual(5);
        expect(result[1].id).toEqual(11);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should filter unique weapons which are already equipped',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.selectedBuild.equipments.left_hand = new Equipment(JSON.parse('{"id": 77, "unique": true}'));
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(Observable.of([
        new Equipment(JSON.parse('{"id": 77, "unique": true}')), // unique and equipped
        new Equipment(JSON.parse('{"id": 10, "unique": false}')),
        new Equipment(JSON.parse('{"id": 11, "unique": true}')),
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('right_hand');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('right_hand', 9999);
      equipments.subscribe(result => {
        expect(result.length).toEqual(2);
        expect(result[0].id).toEqual(10);
        expect(result[1].id).toEqual(11);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should filter all left hand if right hand two handed',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.id = 590; // has native DW
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.selectedBuild.equipments.right_hand.variance_min = 100;
      service.selectedUnit.selectedBuild.equipments.right_hand.variance_max = 150;
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(Observable.of([
        new Equipment(JSON.parse('{"id": 10, "variance_min": 100, "variance_max": 150}')), // two handed
        new Equipment(JSON.parse('{"id": 11}')), // one handed
        new Equipment(JSON.parse('{"id": 11, "category": 9}')), // shield
        new Equipment(JSON.parse('{"id": 1352}')), // weapon with dw
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('left_hand');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('left_hand', 590);
      equipments.subscribe(result => {
        expect(result.length).toEqual(0);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should filter two handed weapons for left hand if unit has native DW',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.id = 590; // has native DW
      service.selectedUnit.selectDefaultBuild();
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(Observable.of([
        new Equipment(JSON.parse('{"id": 10, "variance_min": 100, "variance_max": 150}')), // two handed
        new Equipment(JSON.parse('{"id": 11}')), // one handed
        new Equipment(JSON.parse('{"id": 12, "category": 9}')), // shield
        new Equipment(JSON.parse('{"id": 1352}')), // weapon with dw
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('left_hand');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('left_hand', 590);
      equipments.subscribe(result => {
        expect(result.length).toEqual(3);
        expect(result[0].id).toEqual(11);
        expect(result[1].id).toEqual(12);
        expect(result[2].id).toEqual(1352);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should filter two handed weapons for left hand if unit has equipped DW',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.selectedBuild.equipments.accessory1.id = 935; // has DW
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(Observable.of([
        new Equipment(JSON.parse('{"id": 10, "variance_min": 100, "variance_max": 150}')), // two handed
        new Equipment(JSON.parse('{"id": 11}')), // one handed
        new Equipment(JSON.parse('{"id": 12, "category": 9}')), // shield
        new Equipment(JSON.parse('{"id": 1352}')), // weapon with dw
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('left_hand');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('left_hand', 9999);
      equipments.subscribe(result => {
        expect(result.length).toEqual(3);
        expect(result[0].id).toEqual(11);
        expect(result[1].id).toEqual(12);
        expect(result[2].id).toEqual(1352);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should filter all weapons except ones procuring DW for left hand',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(Observable.of([
        new Equipment(JSON.parse('{"id": 10, "variance_min": 100, "variance_max": 150}')), // two handed
        new Equipment(JSON.parse('{"id": 11}')), // one handed
        new Equipment(JSON.parse('{"id": 12, "category": 9}')), // shield
        new Equipment(JSON.parse('{"id": 1352}')), // weapon with dw
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('left_hand');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('left_hand', 9999);
      equipments.subscribe(result => {
        expect(result.length).toEqual(2);
        expect(result[0].id).toEqual(12);
        expect(result[1].id).toEqual(1352);
      });
    }));
});
