import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ExternalLinkComponent} from './external-link.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {of} from 'rxjs';
import {DatabaseClientService} from '../../core/services/database-client.service';
import {UnitsService} from '../../core/services/units.service';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {Equipment} from '../../core/model/equipment.model';
import {Unit} from '../../core/model/unit.model';
import {SHIVA_STATS_BOOST} from '../../core/calculator-constants';
import {By} from '@angular/platform-browser';

const unitFake = JSON.parse(`{
      "id":999,
      "stats": {"hp":3000,"mp":200,"atk":300,"mag":400,"def":500,"spr":600},
      "builds":[
        {
          "algorithmId":4,
          "equipments":{
            "right_hand":{"id":1},
            "left_hand":{"id":10},
            "head":{"id":2},
            "body":{"id":3},
            "accessory1":{"id":4},
            "accessory2":{"id":5},
            "materia1":{"id":6},
            "materia2":{"id":7}
          },
          "skills": [
            {
              "category":6,
              "power":500,
              "hits":2,"frames":"20 200","damages":"50 50","damages_type":"physical",
              "isTurnCounting":true
            },
            {
              "category":6,
              "power":1000,
              "hits":1,"frames":"50","damages":"100","damages_type":"physical",
              "isTurnCounting":true
            }
          ]
        }
      ]
    }`);

describe('ExternalLinkComponent', () => {
  let component: ExternalLinkComponent;
  let fixture: ComponentFixture<ExternalLinkComponent>;

  beforeEach(() => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };
    const databaseClientMock = {
      getUnitById$: jasmine.createSpy('getUnitById$').and.returnValue(of(unitFake)),
    };

    TestBed.configureTestingModule({
      declarations: [
        ExternalLinkComponent
      ],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: DatabaseClientService, useValue: databaseClientMock},
        UnitsService,
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
              killers: 'false',
              type1: 'dragon',
              type2: 'human',
              spark: 'true',
              buffing: 'false',
              breaks: 'false',
              buffs: 80,
              enemyDef: 555,
              enemySpr: 777,
              enemyResist0: 11,
              enemyResist1: 22,
              enemyResist2: 33,
              enemyResist3: 44,
              enemyResist4: 55,
              enemyResist5: 66,
              enemyResist6: 77,
              enemyResist7: 88,
              breakResist0: -10,
              breakResist1: -20,
              breakResist2: -30,
              breakResist3: -40,
              breakResist4: -50,
              breakResist5: -60,
              breakResist6: -70,
              breakResist7: -80,
              skillcombo1: '3.0',
            }))
          }
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ExternalLinkComponent);
    component = fixture.componentInstance;
  });

  it('should load a unit according to route parameters', async(() => {
    // GIVEN
    const databaseClientMock = TestBed.get(DatabaseClientService);
    const unitService = TestBed.get(UnitsService);
    const routerMock = TestBed.get(Router);
    const right_hand = new Equipment(JSON.parse('{"id":1}'));
    const head = new Equipment(JSON.parse('{"id":2}'));
    const body = new Equipment(JSON.parse('{"id":3}'));
    const accessory1 = new Equipment(JSON.parse('{"id":4}'));
    const accessory2 = new Equipment(JSON.parse('{"id":5}'));
    const materia1 = new Equipment(JSON.parse('{"id":6,"dual_wield":true}')); // for left hand slot to work
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
    spyOn(unitService, 'getAllowedEquipmentsForSlot$').and.returnValue(of([right_hand, head, body, accessory1, accessory2, materia1,
      materia2, materia3, materia4, left_hand, rh_trait1, rh_trait2, rh_trait3, lh_trait1, lh_trait2, lh_trait3]));
    spyOn(unitService, 'equipInSlot').and.callThrough();
    const unit = new Unit(unitFake);

    // WHEN
    fixture.detectChanges(); // trigger ngOnInit

    // THEN
    fixture.whenStable().then(() => {
      fixture.detectChanges(); // refresh DOM
      expect(component).toBeTruthy();
      expect(databaseClientMock.getUnitById$).toHaveBeenCalledTimes(1);
      expect(databaseClientMock.getUnitById$).toHaveBeenCalledWith(999);
      expect(unitService.getAllowedEquipmentsForSlot$).toHaveBeenCalledTimes(8);
      expect(unitService.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('right_hand');
      expect(unitService.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('head');
      expect(unitService.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('body');
      expect(unitService.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('accessory1');
      expect(unitService.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('materia1');
      expect(unitService.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('left_hand');
      expect(unitService.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('rh_trait1');
      expect(unitService.getAllowedEquipmentsForSlot$).toHaveBeenCalledWith('lh_trait1');
      expect(unitService.equipInSlot).toHaveBeenCalledTimes(16);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('right_hand', right_hand);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('left_hand', left_hand);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('head', head);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('body', body);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('accessory1', accessory1);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('accessory2', accessory2);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('materia1', materia1);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('materia2', materia2);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('materia3', materia3);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('materia4', materia4);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('rh_trait1', rh_trait1);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('rh_trait2', rh_trait2);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('rh_trait3', rh_trait3);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('lh_trait1', lh_trait1);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('lh_trait2', lh_trait2);
      expect(unitService.equipInSlot).toHaveBeenCalledWith('lh_trait3', lh_trait3);
      expect(unitService.selectedUnit.selectedBuild.algorithm['isKillerActive']).toBeDefined();
      expect(unitService.selectedUnit.selectedBuild.algorithm['isKillerActive']).toBeFalsy();
      expect(unitService.selectedUnit.selectedBuild.algorithm['opponentKillerType']).toEqual('dragon');
      expect(unitService.selectedUnit.selectedBuild.algorithm['opponentKillerType2']).toEqual('human');
      expect(unitService.selectedUnit.selectedBuild.algorithm['isSparkChain']).toBeTruthy();
      expect(unitService.selectedUnit.selectedBuild.algorithm['isSupportBuffing']).toBeDefined();
      expect(unitService.selectedUnit.selectedBuild.algorithm['isSupportBuffing']).toBeFalsy();
      expect(unitService.selectedUnit.selectedBuild.algorithm['isSupportBreakingResistances']).toBeDefined();
      expect(unitService.selectedUnit.selectedBuild.algorithm['isSupportBreakingResistances']).toBeFalsy();
      expect(unitService.selectedUnit.selectedBuild.algorithm['supportBuff']).toEqual(80);
      expect(unitService.selectedUnit.selectedBuild.algorithm['opponentDef']).toEqual(555);
      expect(unitService.selectedUnit.selectedBuild.algorithm['opponentSpr']).toEqual(777);
      expect(unitService.selectedUnit.selectedBuild.algorithm['opponentResistances']).toEqual([11, 22, 33, 44, 55, 66, 77, 88]);
      expect(unitService.selectedUnit.selectedBuild.algorithm['supportResistsBreak']).toEqual([-10, -20, -30, -40, -50, -60, -70, -80]);
      expect(unitService.selectedUnit.selectedBuild.skills[0].chainCombo).toEqual('4.0');
      expect(unitService.selectedUnit.selectedBuild.skills[1].chainCombo).toEqual('3.0');
      expect(component.currentStep).toEqual(6);
      expect(routerMock.navigate).toHaveBeenCalledTimes(1);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
      expect(component.currentStep).toEqual(6);
      const paragraphElement: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
      expect(paragraphElement.textContent).toEqual('calculator.externalLink.summary 6/6');
    });
  }));
});

describe('ExternalLinkComponent', () => {
  let component: ExternalLinkComponent;
  let fixture: ComponentFixture<ExternalLinkComponent>;

  beforeEach(() => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };
    const databaseClientMock = {
      getUnitById$: jasmine.createSpy('getUnitById$').and.returnValue(of(unitFake)),
    };

    TestBed.configureTestingModule({
      declarations: [
        ExternalLinkComponent
      ],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: DatabaseClientService, useValue: databaseClientMock},
        UnitsService,
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

  it('should load a unit even with minimal equipment parameters', async(() => {
    // GIVEN
    const unit = new Unit(unitFake);
    const databaseClientMock = TestBed.get(DatabaseClientService);
    const unitService = TestBed.get(UnitsService);
    const routerMock = TestBed.get(Router);
    spyOn(unitService, 'getAllowedEquipmentsForSlot$');
    spyOn(unitService, 'equipInSlot');

    // WHEN
    fixture.detectChanges(); // trigger ngOnInit

    // THEN
    fixture.whenStable().then(() => {
      fixture.detectChanges(); // refresh DOM
      expect(component).toBeTruthy();
      expect(databaseClientMock.getUnitById$).toHaveBeenCalledTimes(1);
      expect(databaseClientMock.getUnitById$).toHaveBeenCalledWith(999);
      expect(unitService.getAllowedEquipmentsForSlot$).toHaveBeenCalledTimes(0);
      expect(unitService.equipInSlot).toHaveBeenCalledTimes(0);
      expect(unitService.selectedUnit.selectedBuild.esper).toEqual(SHIVA_STATS_BOOST);
      expect(routerMock.navigate).toHaveBeenCalledTimes(1);
      expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
      expect(component.currentStep).toEqual(6);
      const paragraphElement: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
      expect(paragraphElement.textContent).toEqual('calculator.externalLink.summary 6/6');
    });
  }));
});
