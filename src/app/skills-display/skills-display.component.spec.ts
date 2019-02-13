import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {MatCardModule, MatDialog} from '@angular/material';
import {UnitsService} from '../../core/services/units.service';
import {By} from '@angular/platform-browser';
import {SkillsDisplayComponent} from './skills-display.component';
import {Unit} from '../../core/model/unit.model';
import {Skill} from '../../core/model/skill.model';
import {DebugElement} from '@angular/core';
import {SkillDisplayComponent} from '../popup/skill-display/skill-display.component';

const UNIT_FAKE = JSON.parse(`{
      "id":999,
      "stats": {"hp":3000,"mp":200,"atk":300,"mag":400,"def":500,"spr":600},
      "builds":[
        {
          "algorithmId":1,
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

describe('SkillsDisplayComponent', () => {
  let component: SkillsDisplayComponent;
  let fixture: ComponentFixture<SkillsDisplayComponent>;

  beforeEach(() => {
    const unitServiceMock = {
      selectedUnit: undefined
    };
    const matDialogMock = {
      open: jasmine.createSpy('open'),
    };

    TestBed.configureTestingModule({
      declarations: [
        SkillsDisplayComponent
      ],
      imports: [
        MatCardModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {provide: UnitsService, useValue: unitServiceMock},
        {provide: MatDialog, useValue: matDialogMock},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SkillsDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should display both start and stable phases skills', () => {
    // GIVEN
    const unitServiceMock: UnitsService = TestBed.get(UnitsService);
    unitServiceMock.selectedUnit = new Unit(UNIT_FAKE);
    unitServiceMock.selectedUnit.selectDefaultBuild();
    unitServiceMock.selectedUnit.selectedBuild.startPhaseSkills = [
      new Skill(JSON.parse(`{
        "category":1,
        "power":1000,
        "hits":4,
        "frames":"10 20 30 40",
        "damages":"10 20 30 40",
        "damages_type":"physical",
        "icon":"1.jpg",
        "isStartPhase":true
      }`))
    ];
    unitServiceMock.selectedUnit.selectedBuild.skills = [
      new Skill(JSON.parse(`{
        "category":1,
        "power":500,
        "hits":1,
        "frames":"100",
        "damages":"100",
        "damages_type":"physical",
        "icon":"2.jpg",
        "isStartPhase":false
      }`))
    ];

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(component).toBeTruthy();
    const startTitleElement: HTMLElement = fixture.debugElement.query(By.css('mat-card-title.start-skills-title')).nativeElement;
    expect(startTitleElement.textContent.trim()).toEqual('skills.display.battleStartTitle');
    const startSkillImage: DebugElement = fixture.debugElement.query(By.css('div.start-skills-content img'));
    expect(startSkillImage.nativeElement['src']).toContain('1.jpg');

    const stableTitleElement: HTMLElement = fixture.debugElement.query(By.css('mat-card-title.stable-skills-title')).nativeElement;
    expect(stableTitleElement.textContent.trim()).toEqual('skills.display.stableTitle');
    const stableSkillImage: DebugElement = fixture.debugElement.query(By.css('div.stable-skills-content img'));
    expect(stableSkillImage.nativeElement['src']).toContain('2.jpg');
  });

  it('should display only stable phases skills with LB image and open dialog to display details', () => {
    // GIVEN
    const unitServiceMock: UnitsService = TestBed.get(UnitsService);
    const matDialogMock: MatDialog = TestBed.get(MatDialog);
    unitServiceMock.selectedUnit = new Unit(UNIT_FAKE);
    unitServiceMock.selectedUnit.selectDefaultBuild();
    const lbSkill: Skill = new Skill(JSON.parse(`{
        "category":1,
        "power":500,
        "hits":1,
        "frames":"100",
        "damages":"100",
        "damages_type":"physical",
        "isLimitBreak":true,
        "isStartPhase":false
      }`));
    unitServiceMock.selectedUnit.selectedBuild.skills = [
      lbSkill
    ];

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(component).toBeTruthy();
    const startTitleElement: DebugElement = fixture.debugElement.query(By.css('mat-card-title.start-skills-title'));
    expect(startTitleElement).toBeNull();
    const startSkillImage: DebugElement = fixture.debugElement.query(By.css('div.start-skills-content img'));
    expect(startSkillImage).toBeNull();

    const stableTitleElement: HTMLElement = fixture.debugElement.query(By.css('mat-card-title.stable-skills-title')).nativeElement;
    expect(stableTitleElement.textContent.trim()).toEqual('skills.display.stableTitle');
    const stableSkillImage: DebugElement = fixture.debugElement.query(By.css('div.stable-skills-content img'));
    expect(stableSkillImage.nativeElement['src']).toContain('lb_en.png');
    stableSkillImage.triggerEventHandler('click', {button: 0});
    expect(matDialogMock.open).toHaveBeenCalledTimes(1);
    expect(matDialogMock.open).toHaveBeenCalledWith(SkillDisplayComponent, {
      data: {
        skill: lbSkill,
        esper: unitServiceMock.selectedUnit.selectedBuild.esper,
      }
    });
  });
});
