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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanentUrlComponent);
    component = fixture.componentInstance;
  });

  it('should construct a URL based on unit equipment and display it in the HTML input field', () => {
    const UNIT_DATA = `
    {
      "id": 1234,
      "stats": {
      },
      "builds": [
        {
          "id": 999,
          "equipments": {
            "right_hand": {
              "id": 1
            },
            "left_hand": {
              "id": 2
            },
            "head": {
              "id": 3
            },
            "body": {
              "id": 4
            },
            "accessory1": {
              "id": 5
            },
            "accessory2": {
              "id": 6
            },
            "materia1": {
              "id": 7
            },
            "materia2": {
              "id": 8
            },
            "materia3": {
              "id": 9
            },
            "materia4": {
              "id": 10
            },
            "rh_trait1": {
              "id": 11
            },
            "rh_trait2": {
              "id": 12
            },
            "rh_trait3": {
              "id": 13
            },
            "lh_trait1": {
              "id": 14
            },
            "lh_trait2": {
              "id": 15
            },
            "lh_trait3": {
              "id": 16
            }
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
    fixture.detectChanges();
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('input'));
      const inputElement = input.nativeElement;
      expect(inputElement.value).toBe('https://www.final-fantasy.ch/ffbe/calculator/link/unit/1234;build=999;'
        + 'right_hand=1;left_hand=2;head=3;body=4;accessory1=5;accessory2=6;materia1=7;materia2=8;materia3=9;materia4=10;esper=21;'
        + 'rh_t1=11;rh_t2=12;rh_t3=13;lh_t1=14;lh_t2=15;lh_t3=16');
    });
  });

  it('should construct a minimal URL based on unit without equipment and display it in the HTML input field', () => {
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
    fixture.detectChanges();
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('input'));
      const inputElement = input.nativeElement;
      expect(inputElement.value).toBe('https://www.final-fantasy.ch/ffbe/calculator/link/unit/1234;build=999');
    });
  });
});
