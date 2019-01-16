import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialog, MatDialogModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UnitDetailsStatSumComponent} from './unit-details-stat-sum.component';
import {Component, NgModule} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {IFRIT_STATS_BOOST} from '../../core/calculator-constants';
import {UnitStats} from '../../core/model/unit-stats.model';
import {TranslateModule} from '@ngx-translate/core';
import {IntegerPipe} from '../../core/pipes/integer.pipe';

// testing components inside Angular Material MatDialog is not obvious
// see http://angular-tips.com/blog/2018/02/testing-angular-material-dialog-templates/ for more details

// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {
}

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule, TranslateModule.forRoot()],
  exports: [UnitDetailsStatSumComponent, NoopComponent, IntegerPipe],
  declarations: [UnitDetailsStatSumComponent, NoopComponent, IntegerPipe],
  entryComponents: [UnitDetailsStatSumComponent],
})
class DialogTestModule {
}

describe('UnitDetailsStatSumComponent', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;
  let noop: ComponentFixture<NoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogTestModule,
      ],
      providers: [
        {
          provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return {getContainerElement: () => overlayContainerElement};
          }
        }
      ]
    });

    dialog = TestBed.get(MatDialog);
    noop = TestBed.createComponent(NoopComponent);
  }));

  fit('should display unit stats', () => {
    // GIVEN
    const UNIT_STATS_TEST_DATA = `{
      "hp":1000,"mp":100,"atk":100,"mag":100,"def":100,"spr":100,
      "hp_passive":100,"mp_passive":10,"atk_passive":10,"mag_passive":10,"def_passive":10,"spr_passive":10,
      "hp_dh":100,"mp_dh":10,"atk_dh":10,"mag_dh":10,"def_dh":10,"spr_dh":10,
      "hp_tdh":100,"mp_tdh":10,"atk_tdh":10,"mag_tdh":10,"def_tdh":10,"spr_tdh":10,
      "hp_dw":50,"mp_dw":10,"atk_dw":10,"mag_dw":10,"def_dw":10,"spr_dw":10
    }`;
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    unitStats.defineEquipmentsStats(500, 100, 100, 100, 100, 100, 10);
    unitStats.defineEquipmentPassives(50, 10, 10, 10, 10, 10, 10, []);
    unitStats.defineEquipmentDwBonuses(25, 10, 10, 10, 10, 10, []);
    unitStats.defineEsperStats(IFRIT_STATS_BOOST);
    unitStats.computeTotals(false, false, true);
    const dialogConfig = {
      data: {
        unitStats: unitStats,
        stat: 'hp',
        esper: IFRIT_STATS_BOOST,
        doublehanding: false,
        dualwielding: true,
      }
    };

    // WHEN
    dialog.open(UnitDetailsStatSumComponent, dialogConfig);
    noop.detectChanges();

    // THEN
    const table = overlayContainerElement.querySelector('table.stat-details');
    console.log(table);
    expect(table).toBeTruthy();

    // unit header line
    const unitHeaderLine = table.querySelector('tr:nth-child(1)');
    expect(unitHeaderLine.querySelector('th').textContent).toEqual('unit.details.stats.popup.unit');

    // unit base line
    const unitBaseLine = table.querySelector('tr:nth-child(2)');
    expect(unitBaseLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.base');
    expect(unitBaseLine.querySelector('td:nth-child(2)').textContent).toEqual('1,000');

    // unit passive line
    const unitPassiveLine = table.querySelector('tr:nth-child(3)');
    expect(unitPassiveLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.passive');
    expect(unitPassiveLine.querySelector('td:nth-child(2)').textContent).toEqual('1,000');
    expect(unitPassiveLine.querySelector('td:nth-child(3)').textContent).toEqual('(100%)');
  });
});
