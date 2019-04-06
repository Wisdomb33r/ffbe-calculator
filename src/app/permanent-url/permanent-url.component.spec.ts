import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PermanentUrlComponent} from './permanent-url.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {ClipboardModule} from 'ngx-clipboard';
import {FormsModule} from '@angular/forms';
import {Unit} from '../../core/model/unit.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {IFRIT_KILLERS} from '../../core/calculator-constants';

describe('PermanentUrlComponent', () => {
  let component: PermanentUrlComponent;
  let fixture: ComponentFixture<PermanentUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PermanentUrlComponent
      ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        TranslateModule.forRoot(),
        ClipboardModule,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PermanentUrlComponent);
    component = fixture.componentInstance;
  }));

  it('should construct a URL based on unit equipment and display it in the HTML input field', () => {
    // GIVEN
    const UNIT_DATA = `
    {
      "id": 1234,
      "stats": {},
      "builds": [
        {
          "id": 999,
          "equipments": {
            "right_hand": {"id": 1},
            "left_hand": {"id": 2},
            "head": {"id": 3},
            "body": {"id": 4},
            "accessory1": {"id": 5},
            "accessory2": {"id": 6},
            "materia1": {"id": 7},
            "materia2": {"id": 8},
            "materia3": {"id": 9},
            "materia4": {"id": 10},
            "rh_trait1": {"id": 11},
            "rh_trait2": {"id": 12},
            "rh_trait3": {"id": 13},
            "lh_trait1": {"id": 14},
            "lh_trait2": {"id": 15},
            "lh_trait3": {"id": 16}
          }
        }
      ]
    }`;
    const unit: Unit = new Unit(JSON.parse(UNIT_DATA));
    unit.selectDefaultBuild();
    component.unit = unit;
    component.right_hand = unit.selectedBuild.equipments.right_hand;
    component.left_hand = unit.selectedBuild.equipments.left_hand;
    component.head = unit.selectedBuild.equipments.head;
    component.body = unit.selectedBuild.equipments.body;
    component.accessory1 = unit.selectedBuild.equipments.accessory1;
    component.accessory2 = unit.selectedBuild.equipments.accessory2;
    component.materia1 = unit.selectedBuild.equipments.materia1;
    component.materia2 = unit.selectedBuild.equipments.materia2;
    component.materia3 = unit.selectedBuild.equipments.materia3;
    component.materia4 = unit.selectedBuild.equipments.materia4;
    component.rh_trait1 = unit.selectedBuild.equipments.rh_trait1;
    component.rh_trait2 = unit.selectedBuild.equipments.rh_trait2;
    component.rh_trait3 = unit.selectedBuild.equipments.rh_trait3;
    component.lh_trait1 = unit.selectedBuild.equipments.lh_trait1;
    component.lh_trait2 = unit.selectedBuild.equipments.lh_trait2;
    component.lh_trait3 = unit.selectedBuild.equipments.lh_trait3;
    component.esper = IFRIT_KILLERS;

    // WHEN
    fixture.detectChanges();

    // THEN
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('input'));
      const inputElement = input.nativeElement;
      expect(inputElement.value).toBe('https://www.final-fantasy.ch/ffbe/calculator/link/unit/1234;build=999;'
        + 'right_hand=1;left_hand=2;head=3;body=4;accessory1=5;accessory2=6;materia1=7;materia2=8;materia3=9;materia4=10;esper=21;'
        + 'rh_t1=11;rh_t2=12;rh_t3=13;lh_t1=14;lh_t2=15;lh_t3=16');
    });
  });

  it('should construct a minimal URL based on unit without equipment', () => {
    // GIVEN
    const UNIT_DATA = `
    {
      "id": 1234,
      "stats": {
      },
      "builds": [
        {
          "id": 999,
          "equipments": {
          }
        }
      ]
    }`;
    const unit: Unit = new Unit(JSON.parse(UNIT_DATA));
    unit.selectDefaultBuild();
    component.unit = unit;

    // WHEN
    component.ngDoCheck();

    // THEN
    expect(component.url).toBe('https://www.final-fantasy.ch/ffbe/calculator/link/unit/1234;build=999');
  });

  it('should construct a URL with the non-default algorithm parameters', () => {
    // GIVEN
    const UNIT_DATA = `
    {
      "id": 1234,
      "stats": {
      },
      "builds": [
        {
          "id": 999,
          "algorithmId": 4,
          "equipments": {
          },
          "skills": [
            {
              "id": 987,
              "category": 6
            },
            {
              "id": 988,
              "category": 6,
              "chainCombo": 3.0
            }
          ]
        }
      ]
    }`;
    const unit: Unit = new Unit(JSON.parse(UNIT_DATA));
    unit.selectDefaultBuild();
    component.unit = unit;
    unit.selectedBuild.algorithm['isKillerActive'] = false;
    unit.selectedBuild.algorithm['opponentKillerType'] = 'dragon';
    unit.selectedBuild.algorithm['opponentKillerType2'] = 'human';
    unit.selectedBuild.algorithm['isSparkChain'] = true;
    unit.selectedBuild.algorithm['isSupportBuffing'] = false;
    unit.selectedBuild.algorithm['isSupportBreakingResistances'] = false;
    unit.selectedBuild.algorithm['supportBuff'] = 80;
    unit.selectedBuild.algorithm['opponentDef'] = 555;
    unit.selectedBuild.algorithm['opponentSpr'] = 777;
    unit.selectedBuild.algorithm['opponentResistances'] = [11, 22, 33, 44, 55, 66, 77, 88];
    unit.selectedBuild.algorithm['supportResistsBreak'] = [10, 20, 30, 40, 50, 60, 70, 80];

    // WHEN
    component.ngDoCheck();

    // THEN
    expect(component.url).toBe('https://www.final-fantasy.ch/ffbe/calculator/link/unit/1234;build=999;killers=false;type1=dragon;'
      + 'type2=human;spark=true;buffing=false;breaks=false;buffs=80;enemyDef=555;enemySpr=777;enemyResist0=11;enemyResist1=22;'
      + 'enemyResist2=33;enemyResist3=44;enemyResist4=55;enemyResist5=66;enemyResist6=77;enemyResist7=88;breakResist0=10;breakResist1=20;'
      + 'breakResist2=30;breakResist3=40;breakResist4=50;breakResist5=60;breakResist6=70;breakResist7=80;skillcombo1=3');
  });
});
