import {inject, TestBed} from '@angular/core/testing';
import {UnitsService} from './units.service';
import {Observable, of} from 'rxjs';
import {DatabaseClientService} from './database-client.service';
import {Unit} from '../model/unit.model';
import {Equipment} from '../model/equipment.model';

class DatabaseClientMock {
  public getEquipmentsForUnitAndSlot$(slot: string, unitId: number): Observable<Object> {
    return of(null);
  }
}

export function createMinimalUnit(): Unit {
  return new Unit(JSON.parse(`{
    "id": 9999,
    "stats": {},
    "builds":[{
      "equipments": {
        "right_hand": {"id": 1, "category": 1},
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

  it('should filter out archived units', inject([UnitsService], (service: UnitsService) => {
    // GIVEN
    const physicalChainer1 = createMinimalUnit();
    physicalChainer1.id = 1;
    physicalChainer1.isArchived = false;
    physicalChainer1.builds[0].algorithmId = 1;
    const physicalChainer2 = createMinimalUnit();
    physicalChainer2.id = 2;
    physicalChainer2.isArchived = true;
    physicalChainer2.builds[0].algorithmId = 1;
    const magicalChainer1 = createMinimalUnit();
    magicalChainer1.id = 3;
    magicalChainer1.isArchived = true;
    magicalChainer1.builds[0].algorithmId = 2;
    const magicalChainer2 = createMinimalUnit();
    magicalChainer2.id = 4;
    magicalChainer2.isArchived = false;
    magicalChainer2.builds[0].algorithmId = 2;
    const hybridChainer1 = createMinimalUnit();
    hybridChainer1.id = 5;
    hybridChainer1.isArchived = false;
    hybridChainer1.builds[0].algorithmId = 3;
    const hybridChainer2 = createMinimalUnit();
    hybridChainer2.id = 6;
    hybridChainer2.isArchived = true;
    hybridChainer2.builds[0].algorithmId = 3;
    const physicalFinisher1 = createMinimalUnit();
    physicalFinisher1.id = 11;
    physicalFinisher1.isArchived = false;
    physicalFinisher1.builds[0].algorithmId = 4;
    const physicalFinisher2 = createMinimalUnit();
    physicalFinisher2.id = 12;
    physicalFinisher2.isArchived = true;
    physicalFinisher2.builds[0].algorithmId = 4;
    const magicalFinisher1 = createMinimalUnit();
    magicalFinisher1.id = 13;
    magicalFinisher1.isArchived = true;
    magicalFinisher1.builds[0].algorithmId = 5;
    const magicalFinisher2 = createMinimalUnit();
    magicalFinisher2.id = 14;
    magicalFinisher2.isArchived = false;
    magicalFinisher2.builds[0].algorithmId = 7;
    const hybridFinisher1 = createMinimalUnit();
    hybridFinisher1.id = 15;
    hybridFinisher1.isArchived = false;
    hybridFinisher1.builds[0].algorithmId = 6;
    const hybridFinisher2 = createMinimalUnit();
    hybridFinisher2.id = 16;
    hybridFinisher2.isArchived = true;
    hybridFinisher2.builds[0].algorithmId = 6;
    service.units = [
      physicalChainer1, physicalChainer2, physicalFinisher1, physicalFinisher2,
      magicalChainer1, magicalChainer2, magicalFinisher1, magicalFinisher2,
      hybridChainer1, hybridChainer2, hybridFinisher1, hybridFinisher2,
    ];

    // WHEN
    service.filterUnits();

    // THEN
    expect(service.physicalChainers.length).toEqual(1);
    expect(service.physicalChainers[0].id).toEqual(1);
    expect(service.magicalChainers.length).toEqual(1);
    expect(service.magicalChainers[0].id).toEqual(4);
    expect(service.hybridChainers.length).toEqual(1);
    expect(service.hybridChainers[0].id).toEqual(5);
    expect(service.physicalFinishers.length).toEqual(1);
    expect(service.physicalFinishers[0].id).toEqual(11);
    expect(service.magicalFinishers.length).toEqual(1);
    expect(service.magicalFinishers[0].id).toEqual(14);
    expect(service.hybridFinishers.length).toEqual(1);
    expect(service.hybridFinishers[0].id).toEqual(15);
  }));

  it('should filter out non-archived units', inject([UnitsService], (service: UnitsService) => {
    // GIVEN
    const physicalChainer1 = createMinimalUnit();
    physicalChainer1.id = 1;
    physicalChainer1.isArchived = false;
    physicalChainer1.builds[0].algorithmId = 1;
    const physicalChainer2 = createMinimalUnit();
    physicalChainer2.id = 2;
    physicalChainer2.isArchived = true;
    physicalChainer2.builds[0].algorithmId = 1;
    const magicalChainer1 = createMinimalUnit();
    magicalChainer1.id = 3;
    magicalChainer1.isArchived = true;
    magicalChainer1.builds[0].algorithmId = 2;
    const magicalChainer2 = createMinimalUnit();
    magicalChainer2.id = 4;
    magicalChainer2.isArchived = false;
    magicalChainer2.builds[0].algorithmId = 2;
    const hybridChainer1 = createMinimalUnit();
    hybridChainer1.id = 5;
    hybridChainer1.isArchived = false;
    hybridChainer1.builds[0].algorithmId = 3;
    const hybridChainer2 = createMinimalUnit();
    hybridChainer2.id = 6;
    hybridChainer2.isArchived = true;
    hybridChainer2.builds[0].algorithmId = 3;
    const physicalFinisher1 = createMinimalUnit();
    physicalFinisher1.id = 11;
    physicalFinisher1.isArchived = false;
    physicalFinisher1.builds[0].algorithmId = 4;
    const physicalFinisher2 = createMinimalUnit();
    physicalFinisher2.id = 12;
    physicalFinisher2.isArchived = true;
    physicalFinisher2.builds[0].algorithmId = 4;
    const magicalFinisher1 = createMinimalUnit();
    magicalFinisher1.id = 13;
    magicalFinisher1.isArchived = true;
    magicalFinisher1.builds[0].algorithmId = 5;
    const magicalFinisher2 = createMinimalUnit();
    magicalFinisher2.id = 14;
    magicalFinisher2.isArchived = false;
    magicalFinisher2.builds[0].algorithmId = 7;
    const hybridFinisher1 = createMinimalUnit();
    hybridFinisher1.id = 15;
    hybridFinisher1.isArchived = false;
    hybridFinisher1.builds[0].algorithmId = 6;
    const hybridFinisher2 = createMinimalUnit();
    hybridFinisher2.id = 16;
    hybridFinisher2.isArchived = true;
    hybridFinisher2.builds[0].algorithmId = 6;
    service.units = [
      physicalChainer1, physicalChainer2, physicalFinisher1, physicalFinisher2,
      magicalChainer1, magicalChainer2, magicalFinisher1, magicalFinisher2,
      hybridChainer1, hybridChainer2, hybridFinisher1, hybridFinisher2,
    ];
    service.displayArchivedUnits = true;

    // WHEN
    service.filterUnits();

    // THEN
    expect(service.physicalChainers.length).toEqual(1);
    expect(service.physicalChainers[0].id).toEqual(2);
    expect(service.magicalChainers.length).toEqual(1);
    expect(service.magicalChainers[0].id).toEqual(3);
    expect(service.hybridChainers.length).toEqual(1);
    expect(service.hybridChainers[0].id).toEqual(6);
    expect(service.physicalFinishers.length).toEqual(1);
    expect(service.physicalFinishers[0].id).toEqual(12);
    expect(service.magicalFinishers.length).toEqual(1);
    expect(service.magicalFinishers[0].id).toEqual(13);
    expect(service.hybridFinishers.length).toEqual(1);
    expect(service.hybridFinishers[0].id).toEqual(16);
  }));

  it('#equipInSlot should remove equipment from slot',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      // WHEN
      service.equipInSlot('body', new Equipment(JSON.parse('{"id":-1}')));
      // THEN
      expect(service.selectedUnit.selectedEquipmentSet.body).toBeNull();
    }));

  it('#equipInSlot should remove left hand if two-handed right hand is equipped',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.selectedEquipmentSet.left_hand = new Equipment(JSON.parse('{"id": 1199, "dual_wield": true}'));
      // WHEN
      service.equipInSlot('right_hand', new Equipment(JSON.parse('{"id":66,"twoHanded": true,"minVariance":100,"maxVariance":150}')));
      // THEN
      expect(service.selectedUnit.selectedEquipmentSet.left_hand).toBeNull();
    }));

  it('#equipInSlot should remove left hand weapon if no DW item left',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.selectedEquipmentSet.left_hand = new Equipment(JSON.parse('{"id":10,"category":1}'));
      // WHEN
      service.equipInSlot('body', new Equipment(JSON.parse('{"id":999}')));
      // THEN
      expect(service.selectedUnit.selectedEquipmentSet.left_hand).toBeNull();
    }));

  it('#equipInSlot should not remove left hand shield if no DW item left',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.selectedEquipmentSet.left_hand = new Equipment(JSON.parse('{"id":10,"category":9}')); // shield
      // WHEN
      service.equipInSlot('body', new Equipment(JSON.parse('{"id":999}')));
      // THEN
      expect(service.selectedUnit.selectedEquipmentSet.left_hand).toBeTruthy();
      expect(service.selectedUnit.selectedEquipmentSet.left_hand.id).toEqual(10);
    }));

  it('#equipInSlot should not remove left hand weapon if DW item left',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.selectedEquipmentSet.left_hand = new Equipment(JSON.parse('{"id":10,"category":1}'));
      // WHEN
      service.equipInSlot('accessory1', new Equipment(JSON.parse('{"id":935, "dual_wield": true}')));
      // THEN
      expect(service.selectedUnit.selectedEquipmentSet.left_hand).toBeTruthy();
      expect(service.selectedUnit.selectedEquipmentSet.left_hand.id).toEqual(10);
    }));

  it('#getAllowedEquipmentsForSlot$ should not filter equipments and return an observable',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(of([new Equipment(JSON.parse('{"id": 111}'))]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('head');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('head', 9999, []);
      equipments.subscribe(result => expect(result.length).toEqual(1));
    }));

  it('#getAllowedEquipmentsForSlot$ should filter unique materias which are already equipped',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id": 9, "unique": true}')), // unique and equipped
        new Equipment(JSON.parse('{"id": 8, "unique": true}')), // unique and equipped
        new Equipment(JSON.parse('{"id": 7, "unique": false}')),
        new Equipment(JSON.parse('{"id": 6, "unique": false}')),
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('materia1');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('materia1', 9999, []);
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
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id": 4, "unique": true}')), // unique and equipped
        new Equipment(JSON.parse('{"id": 5, "unique": false}')),
        new Equipment(JSON.parse('{"id": 11, "unique": true}')),
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('accessory2');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('accessory2', 9999, []);
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
      service.selectedUnit.selectedEquipmentSet.left_hand = new Equipment(JSON.parse('{"id": 77, "unique": true}'));
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id": 77, "unique": true}')), // unique and equipped
        new Equipment(JSON.parse('{"id": 10, "unique": false}')),
        new Equipment(JSON.parse('{"id": 11, "unique": true}')),
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('right_hand');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('right_hand', 9999, []);
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
      service.selectedUnit.stats.dual_wield = true;
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.selectedEquipmentSet.right_hand['twoHanded'] = true;
      service.selectedUnit.selectedEquipmentSet.right_hand.minVariance = 100;
      service.selectedUnit.selectedEquipmentSet.right_hand.maxVariance = 150;
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id": 10, "twoHanded": true, "minVariance": 100, "maxVariance": 150}')), // two handed
        new Equipment(JSON.parse('{"id": 11}')), // one handed
        new Equipment(JSON.parse('{"id": 11, "category": 9}')), // shield
        new Equipment(JSON.parse('{"id": 1352, "dual_wield": true}')), // weapon with dw
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('left_hand');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('left_hand', 590, []);
      equipments.subscribe(result => {
        expect(result.length).toEqual(0);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should filter two handed weapons for left hand if unit has native DW',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.id = 590; // has native DW
      service.selectedUnit.stats.dual_wield = true;
      service.selectedUnit.selectDefaultBuild();
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id": 10, "twoHanded": true, "minVariance": 100, "maxVariance": 150}')), // two handed
        new Equipment(JSON.parse('{"id": 11}')), // one handed
        new Equipment(JSON.parse('{"id": 12, "category": 9}')), // shield
        new Equipment(JSON.parse('{"id": 1352, "dual_wield": true}')), // weapon with dw
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('left_hand');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('left_hand', 590, []);
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
      service.selectedUnit.selectedEquipmentSet.accessory1.id = 935;
      service.selectedUnit.selectedEquipmentSet.accessory1.dual_wield = true;
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id": 10, "twoHanded": true, "minVariance": 100, "maxVariance": 150}')), // two handed
        new Equipment(JSON.parse('{"id": 11}')), // one handed
        new Equipment(JSON.parse('{"id": 12, "category": 9}')), // shield
        new Equipment(JSON.parse('{"id": 1352, "dual_wield": true}')),
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('left_hand');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('left_hand', 9999, []);
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
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id": 10, "twoHanded": true, "minVariance": 100, "maxVariance": 150}')), // two handed
        new Equipment(JSON.parse('{"id": 11}')), // one handed
        new Equipment(JSON.parse('{"id": 12, "category": 9}')), // shield
        new Equipment(JSON.parse('{"id": 1352, "dual_wield": true}')), // weapon with dw
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('left_hand');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('left_hand', 9999, []);
      equipments.subscribe(result => {
        expect(result.length).toEqual(2);
        expect(result[0].id).toEqual(12);
        expect(result[1].id).toEqual(1352);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should filter items having sex restrictions',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.sex = 2;
      service.selectedUnit.selectDefaultBuild();
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id":1,"sex_restriction":1}')), // male
        new Equipment(JSON.parse('{"id":2,"sex_restriction":2}')), // female
        new Equipment(JSON.parse('{"id":3}')), // no restriction
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('head');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('head', 9999, []);
      equipments.subscribe(result => {
        expect(result.length).toEqual(2);
        expect(result[0].id).toEqual(2);
        expect(result[1].id).toEqual(3);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should sort all equipments based on ATK stat for physical damage algorithms',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.stats.atk.base = 200;
      service.selectedUnit.stats.atk.base_equipment = 300;
      service.selectedUnit.selectedBuild.algorithmId = 1; // physical damage
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id": 10, "atk": 0, "atk_percent": 0, "atk_dh": 10, "atk_tdh": 0}')), // 30
        new Equipment(JSON.parse('{"id": 11, "atk": 0, "atk_percent": 0, "atk_dh": 0, "atk_tdh": 20}')), // 60
        new Equipment(JSON.parse('{"id": 12, "atk": 10, "atk_percent": 0, "atk_dh": 0, "atk_tdh": 0}')), // 10
        new Equipment(JSON.parse('{"id": 13, "atk": 0, "atk_percent": 10, "atk_dh": 0, "atk_tdh": 20}')), // 80
        new Equipment(JSON.parse('{"id": 14, "atk": 100, "atk_percent": 0, "atk_dh": 10, "atk_tdh": 0}')), // 130
        new Equipment(JSON.parse('{"id": 15, "atk": 0, "atk_percent": 0, "atk_dh": 0, "atk_tdh": 0, "conditional_passives": [{"category": 1, "atk": 20}]}')), // 40
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('head');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('head', 9999, []);
      equipments.subscribe(result => {
        expect(result.length).toEqual(6);
        expect(result[0].id).toEqual(14);
        expect(result[1].id).toEqual(13);
        expect(result[2].id).toEqual(11);
        expect(result[3].id).toEqual(15);
        expect(result[4].id).toEqual(10);
        expect(result[5].id).toEqual(12);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should sort all equipments based on MAG stat for magical damage algorithms',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.stats.mag.base = 200;
      service.selectedUnit.stats.mag.base_equipment = 300;
      service.selectedUnit.selectedBuild.algorithmId = 5; // magical damage
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id": 10, "mag": 0, "mag_percent": 0, "mag_dh": 10, "mag_tdh": 0}')), // 30
        new Equipment(JSON.parse('{"id": 11, "mag": 0, "mag_percent": 0, "mag_dh": 0, "mag_tdh": 20}')), // 60
        new Equipment(JSON.parse('{"id": 12, "mag": 10, "mag_percent": 0, "mag_dh": 0, "mag_tdh": 0}')), // 10
        new Equipment(JSON.parse('{"id": 13, "mag": 0, "mag_percent": 10, "mag_dh": 0, "mag_tdh": 20}')), // 80
        new Equipment(JSON.parse('{"id": 14, "mag": 100, "mag_percent": 0, "mag_dh": 10, "mag_tdh": 0}')), // 130
        new Equipment(JSON.parse('{"id": 15, "mag": 0, "mag_percent": 0, "mag_dh": 0, "mag_tdh": 0, "conditional_passives": [{"category": 1, "mag": 20}]}')), // 40
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('head');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('head', 9999, []);
      equipments.subscribe(result => {
        expect(result.length).toEqual(6);
        expect(result[0].id).toEqual(14);
        expect(result[1].id).toEqual(13);
        expect(result[2].id).toEqual(11);
        expect(result[3].id).toEqual(15);
        expect(result[4].id).toEqual(10);
        expect(result[5].id).toEqual(12);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should sort all equipments based on HP, DEF and SPR stats for defensive algorithms',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.stats.hp.base = 3000;
      service.selectedUnit.stats.hp.base_equipment = 300;
      service.selectedUnit.stats.hp.total = 10000;
      service.selectedUnit.stats.def.base = 200;
      service.selectedUnit.stats.def.base_equipment = 100;
      service.selectedUnit.stats.def.total = 500;
      service.selectedUnit.stats.spr.base = 100;
      service.selectedUnit.stats.spr.base_equipment = 50;
      service.selectedUnit.stats.spr.total = 400;
      service.selectedUnit.selectedBuild.algorithmId = 8; // def
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id": 10, "hp": 1000, "hp_percent": 10, "hp_dh": 10, "hp_tdh": 10, "def": 0, "def_percent": 0, "def_dh": 0, "def_tdh": 0, "spr": 0, "spr_percent": 0, "spr_dh": 0, "spr_tdh": 0}')),
        new Equipment(JSON.parse('{"id": 11, "hp": 0, "hp_percent": 20, "hp_dh": 0, "hp_tdh": 0, "def": 100, "def_percent": 50, "def_dh": 0, "def_tdh": 0, "spr": 0, "spr_percent": 0, "spr_dh": 0, "spr_tdh": 0}')),
        new Equipment(JSON.parse('{"id": 12, "hp": 0, "hp_percent": 0, "hp_dh": 0, "hp_tdh": 0, "def": 0, "def_percent": 0, "def_dh": 0, "def_tdh": 0, "spr": 0, "spr_percent": 100, "spr_dh": 100, "spr_tdh": 100}')),
        new Equipment(JSON.parse('{"id": 13, "hp": 0, "hp_percent": 0, "hp_dh": 0, "hp_tdh": 0, "def": 0, "def_percent": 0, "def_dh": 0, "def_tdh": 0, "spr": 0, "spr_percent": 0, "spr_dh": 0, "spr_tdh": 0, "conditional_passives": [{"category": 1, "hp": 20, "def": 20}]}')),
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('head');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('head', 9999, []);
      equipments.subscribe(result => {
        expect(result.length).toEqual(4);
        expect(result[0].id).toEqual(11);
        expect(result[1].id).toEqual(12);
        expect(result[2].id).toEqual(10);
        expect(result[3].id).toEqual(13);
      });
    }));

  it('#getAllowedEquipmentsForSlot$ should sort all equipments based on EVO stats for evokers algorithms',
    inject([UnitsService], (service: UnitsService) => {
      // GIVEN
      service.selectedUnit = createMinimalUnit();
      service.selectedUnit.selectDefaultBuild();
      service.selectedUnit.stats.mag.base = 100;
      service.selectedUnit.stats.mag.base_equipment = 200;
      service.selectedUnit.stats.mag.total = 2000;
      service.selectedUnit.stats.spr.base = 200;
      service.selectedUnit.stats.spr.base_equipment = 100;
      service.selectedUnit.stats.spr.total = 2000;
      service.selectedUnit.selectedBuild.algorithmId = 9; // evoker
      spyOn(databaseClient, 'getEquipmentsForUnitAndSlot$')
        .and.returnValue(of([
        new Equipment(JSON.parse('{"id": 10, "mag": 0, "mag_percent": 0, "spr": 0, "spr_percent": 0, "evo": 20}')),
        new Equipment(JSON.parse('{"id": 11, "mag": 100, "mag_percent": 50, "spr": 0, "spr_percent": 0, "evo": 0}')),
        new Equipment(JSON.parse('{"id": 12, "mag": 0, "mag_percent": 0, "spr": 0, "spr_percent": 100, "evo": 0}')),
        new Equipment(JSON.parse('{"id": 13, "mag": 0, "mag_percent": 0, "spr": 0, "spr_percent": 0, "evo": 0, "conditional_passives": [{"category": 1, "evo": 50}]}')),
      ]));
      // WHEN
      const equipments: Observable<Array<Equipment>> = service.getAllowedEquipmentsForSlot$('head');
      // THEN
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalled();
      expect(databaseClient.getEquipmentsForUnitAndSlot$).toHaveBeenCalledWith('head', 9999, []);
      equipments.subscribe(result => {
        expect(result.length).toEqual(4);
        expect(result[0].id).toEqual(13);
        expect(result[1].id).toEqual(10);
        expect(result[2].id).toEqual(11);
        expect(result[3].id).toEqual(12);
      });
    }));
});
