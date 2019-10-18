import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {DatabaseClientService} from '../../core/services/database-client.service';
import {UnitsService} from '../../core/services/units.service';
import {UnitsRankingsComponent} from './units-rankings.component';
import {Unit} from '../../core/model/unit.model';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';
import {of} from 'rxjs';
import {IntegerPipe} from '../../core/pipes/integer.pipe';

const unitFake1 = JSON.parse(`{
  "id":1,"name":"Unit1",
  "stats": {"hp":1111,"mp":1111,"atk":1111,"mag":1111,"def":1111,"spr":1111},
  "builds":[
    {
      "id":11,"algorithmId":4,
      "equipments":{
      },
      "skills": [
        {"category":6,"power":500,"hits":1,"frames":"20","damages":"100","damages_type":"physical","isTurnCounting":true}
      ]
    }
  ]
}`);
const unitFake2 = JSON.parse(`{
  "id":2,"name":"Unit2",
  "stats": {"hp":2222,"mp":2222,"atk":2222,"mag":2222,"def":2222,"spr":2222},
  "builds":[
    {
      "id":22,"algorithmId":4,
      "equipments":{
        "materia1": {"id":9999,"atk":0,"atk_percent":0,"physical_killers":{"dragon":100,"insect":100,"fairy":100,"undead":100,"plant":100}}
      },
      "skills": [
        {"category":6,"power":1500,"hits":1,"frames":"20","damages":"100","damages_type":"physical","isTurnCounting":true}
      ]
    },
    {
      "id":23,"algorithmId":4,
      "equipments":{
      },
      "skills": [
        {"category":6,"power":2000,"hits":1,"frames":"20","damages":"100","damages_type":"physical","isTurnCounting":true}
      ]
    },
    {
      "id":24,"algorithmId":1,
      "equipments":{
      },
      "skills": [
        {"category":6,"power":20000,"hits":1,"frames":"20","damages":"100","damages_type":"physical","isTurnCounting":true}
      ]
    }
  ]
}`);

describe('UnitsRankingsComponent', () => {
  let component: UnitsRankingsComponent;
  let fixture: ComponentFixture<UnitsRankingsComponent>;

  beforeEach(() => {
    const unitServiceMock = {
      getUnitListByAlgorithm: jasmine.createSpy('getUnitListByAlgorithm').and.returnValue([new Unit(unitFake1), new Unit(unitFake2)]),
      resetUnitsRankingResults: jasmine.createSpy('resetUnitsRankingResults'),
      isLoaded: jasmine.createSpy('isLoaded').and.returnValue(true),
    };
    const databaseClientMock = {
      getUnitById$: jasmine.createSpy('getUnitById$')
        .withArgs(1).and.returnValue(of(unitFake1))
        .withArgs(2).and.returnValue(of(unitFake2))
    };

    TestBed.configureTestingModule({
      declarations: [
        IntegerPipe,
        UnitsRankingsComponent,
      ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: DatabaseClientService, useValue: databaseClientMock},
        {provide: UnitsService, useValue: unitServiceMock},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(UnitsRankingsComponent);
    component = fixture.componentInstance;
  });

  it('#changeAlgorithm should load the physical finishers from unitsService and display them', () => {
    // GIVEN
    const unitServiceMock = TestBed.get(UnitsService);
    component.selectedAlgorithmId = 4;
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'setItem');

    // WHEN
    component.changeAlgorithm();
    fixture.detectChanges();

    // THEN
    expect(unitServiceMock.getUnitListByAlgorithm).toHaveBeenCalledTimes(1);
    expect(unitServiceMock.getUnitListByAlgorithm).toHaveBeenCalledWith(4, false);
    expect(component.rankedUnits.length).toEqual(2);
    expect(component.rankedUnits[0].id).toEqual(1);
    expect(component.rankedUnits[1].id).toEqual(2);

    const buttonElement: HTMLElement = fixture.debugElement.query(By.css('.rankings-configuration button')).nativeElement;
    expect(buttonElement.textContent).toEqual('rankings.calculateMissingBuilds');

    const rankingsResults: DebugElement = fixture.debugElement.query(By.css('.rankings-results'));
    expect(rankingsResults).toBeTruthy();

    const rankingsResultsTitle: HTMLElement = rankingsResults.query(By.css('mat-card-title')).nativeElement;
    expect(rankingsResultsTitle.textContent).toEqual('rankings.rankingsTitle');

    const rankingsResultsTableRow1: DebugElement = rankingsResults.query(By.css('tr:nth-child(2)'));
    expect(rankingsResultsTableRow1.query(By.css('td:nth-child(1)')).nativeElement.textContent).toEqual('##');
    expect(rankingsResultsTableRow1.query(By.css('td:nth-child(2)')).nativeElement.textContent).toEqual('');
    expect(rankingsResultsTableRow1.query(By.css('td:nth-child(3)')).nativeElement.textContent).toEqual('Unit1');

    const rankingsResultsTableRow2: DebugElement = rankingsResults.query(By.css('tr:nth-child(3)'));
    expect(rankingsResultsTableRow2.query(By.css('td:nth-child(1)')).nativeElement.textContent).toEqual('##');
    expect(rankingsResultsTableRow2.query(By.css('td:nth-child(2)')).nativeElement.textContent).toEqual('');
    expect(rankingsResultsTableRow2.query(By.css('td:nth-child(3)')).nativeElement.textContent).toEqual('Unit2');
  });

  it('should calculate and display unit rankings', async(() => {
    // GIVEN
    const databaseClientMock: DatabaseClientService = TestBed.get(DatabaseClientService);
    const unitServiceMock: UnitsService = TestBed.get(UnitsService);
    const translateService: TranslateService = TestBed.get(TranslateService);
    component.selectedAlgorithmId = 4;
    translateService.use('fr');
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'setItem');

    // WHEN
    component.changeAlgorithm();
    fixture.debugElement.query(By.css('.rankings-configuration button')).nativeElement.click();
    fixture.detectChanges();

    // THEN
    expect(unitServiceMock.getUnitListByAlgorithm).toHaveBeenCalledTimes(1);
    expect(unitServiceMock.getUnitListByAlgorithm).toHaveBeenCalledWith(4, false);
    expect(component.rankedUnits.length).toEqual(2);

    fixture.whenStable().then(() => {
      expect(component.rankedUnits[0].rankingResult).toBeCloseTo(5333.9274);
      expect(component.rankedUnits[1].rankingResult).toBeCloseTo(307.4258);

      const rankingsResults: DebugElement = fixture.debugElement.query(By.css('.rankings-results'));
      expect(rankingsResults).toBeTruthy();

      const rankingsResultsTitle: HTMLElement = rankingsResults.query(By.css('mat-card-title')).nativeElement;
      expect(rankingsResultsTitle.textContent).toEqual('rankings.rankingsTitle');

      const rankingsResultsTableRow1: DebugElement = rankingsResults.query(By.css('tr:nth-child(2)'));
      expect(rankingsResultsTableRow1.query(By.css('td:nth-child(1)')).nativeElement.textContent).toEqual('1');
      expect(rankingsResultsTableRow1.query(By.css('td:nth-child(2)')).nativeElement.textContent).toEqual('5 334');
      expect(rankingsResultsTableRow1.query(By.css('td:nth-child(3)')).nativeElement.textContent).toEqual('Unit2');

      const rankingsResultsTableRow2: DebugElement = rankingsResults.query(By.css('tr:nth-child(3)'));
      expect(rankingsResultsTableRow2.query(By.css('td:nth-child(1)')).nativeElement.textContent).toEqual('2');
      expect(rankingsResultsTableRow2.query(By.css('td:nth-child(2)')).nativeElement.textContent).toEqual('307');
      expect(rankingsResultsTableRow2.query(By.css('td:nth-child(3)')).nativeElement.textContent).toEqual('Unit1');
    });
  }));

  it('should switch killers off, calculate and display unit rankings', async(() => {
    // GIVEN
    const databaseClientMock: DatabaseClientService = TestBed.get(DatabaseClientService);
    const unitServiceMock: UnitsService = TestBed.get(UnitsService);
    const translateService: TranslateService = TestBed.get(TranslateService);
    component.selectedAlgorithmId = 4;
    translateService.use('fr');
    spyOn(localStorage, 'getItem');
    spyOn(localStorage, 'setItem');

    // WHEN
    component.changeAlgorithm();
    component.isWithKillers = false;
    fixture.debugElement.query(By.css('.rankings-configuration button')).nativeElement.click();
    fixture.detectChanges();

    // THEN
    expect(unitServiceMock.getUnitListByAlgorithm).toHaveBeenCalledTimes(1);
    expect(unitServiceMock.getUnitListByAlgorithm).toHaveBeenCalledWith(4, false);
    expect(component.rankedUnits.length).toEqual(2);

    fixture.whenStable().then(() => {
      expect(component.rankedUnits[0].rankingResult).toBeCloseTo(4741.2688);
      expect(component.rankedUnits[1].rankingResult).toBeCloseTo(307.4258);

      const rankingsResults: DebugElement = fixture.debugElement.query(By.css('.rankings-results'));
      expect(rankingsResults).toBeTruthy();

      const rankingsResultsTitle: HTMLElement = rankingsResults.query(By.css('mat-card-title')).nativeElement;
      expect(rankingsResultsTitle.textContent).toEqual('rankings.rankingsTitle');

      const rankingsResultsTableRow1: DebugElement = rankingsResults.query(By.css('tr:nth-child(2)'));
      expect(rankingsResultsTableRow1.query(By.css('td:nth-child(1)')).nativeElement.textContent).toEqual('1');
      expect(rankingsResultsTableRow1.query(By.css('td:nth-child(2)')).nativeElement.textContent).toEqual('4 741');
      expect(rankingsResultsTableRow1.query(By.css('td:nth-child(3)')).nativeElement.textContent).toEqual('Unit2');

      const rankingsResultsTableRow2: DebugElement = rankingsResults.query(By.css('tr:nth-child(3)'));
      expect(rankingsResultsTableRow2.query(By.css('td:nth-child(1)')).nativeElement.textContent).toEqual('2');
      expect(rankingsResultsTableRow2.query(By.css('td:nth-child(2)')).nativeElement.textContent).toEqual('307');
      expect(rankingsResultsTableRow2.query(By.css('td:nth-child(3)')).nativeElement.textContent).toEqual('Unit1');
    });
  }));
});
