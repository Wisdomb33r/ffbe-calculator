import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialog, MatDialogModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UnitDetailsStatSumComponent} from './unit-details-stat-sum.component';
import {Component, NgModule} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {GOLEM_TANKING, IFRIT_STATS_BOOST} from '../../core/calculator-constants';
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

  it('should display unit stats for DW', () => {
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
    expect(table).toBeTruthy();

    // unit header line
    const unitHeaderLine = table.querySelector('tr:nth-child(1)');
    expect(unitHeaderLine.querySelector('th').textContent).toEqual('unit.details.stats.popup.unit');

    // unit base line
    const unitBaseLine = table.querySelector('tr:nth-child(2)');
    expect(unitBaseLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.base');
    expect(unitBaseLine.querySelector('td:nth-child(2)').textContent).toEqual('1,000');
    expect(unitBaseLine.querySelector('td:nth-child(3)').textContent).toEqual('');

    // unit passive line
    const unitPassiveLine = table.querySelector('tr:nth-child(3)');
    expect(unitPassiveLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.passive');
    expect(unitPassiveLine.querySelector('td:nth-child(2)').textContent).toEqual('1,000');
    expect(unitPassiveLine.querySelector('td:nth-child(3)').textContent).toEqual('(100%)');

    // unit dw line
    const unitDwLine = table.querySelector('tr:nth-child(4)');
    expect(unitDwLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.dw');
    expect(unitDwLine.querySelector('td:nth-child(2)').textContent).toEqual('250');
    expect(unitDwLine.querySelector('td:nth-child(3)').textContent).toEqual('(50%)');

    // equipment header line
    const equipmentHeaderLine = table.querySelector('tr:nth-child(5)');
    expect(equipmentHeaderLine.querySelector('th').textContent).toEqual('unit.details.stats.popup.equipment');

    // equipment passive line
    const equipmentPassiveLine = table.querySelector('tr:nth-child(6)');
    expect(equipmentPassiveLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.base');
    expect(equipmentPassiveLine.querySelector('td:nth-child(2)').textContent).toEqual('500');
    expect(equipmentPassiveLine.querySelector('td:nth-child(3)').textContent).toEqual('');

    // equipment base line
    const equipmentBaseLine = table.querySelector('tr:nth-child(7)');
    expect(equipmentBaseLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.passive');
    expect(equipmentBaseLine.querySelector('td:nth-child(2)').textContent).toEqual('500');
    expect(equipmentBaseLine.querySelector('td:nth-child(3)').textContent).toEqual('(50%) ');

    // equipment dw line
    const equipmentDwLine = table.querySelector('tr:nth-child(8)');
    expect(equipmentDwLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.dw');
    expect(equipmentDwLine.querySelector('td:nth-child(2)').textContent).toEqual('125');
    expect(equipmentDwLine.querySelector('td:nth-child(3)').textContent).toEqual('(25%)');

    // esper header line
    const esperHeaderLine = table.querySelector('tr:nth-child(9)');
    expect(esperHeaderLine.querySelector('th').textContent).toEqual('unit.details.stats.popup.esper');

    // esper base line
    const esperBaseLine = table.querySelector('tr:nth-child(10)');
    expect(esperBaseLine.querySelector('td:nth-child(1)').textContent).toEqual('Ifrit');
    expect(esperBaseLine.querySelector('td:nth-child(2)').textContent).toEqual('75');
    expect(esperBaseLine.querySelector('td:nth-child(3)').textContent).toEqual('');

    // esper passive line
    const esperPassiveLine = table.querySelector('tr:nth-child(11)');
    expect(esperPassiveLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.passive');
    expect(esperPassiveLine.querySelector('td:nth-child(2)').textContent).toEqual('0');
    expect(esperPassiveLine.querySelector('td:nth-child(3)').textContent).toEqual('(0%)');

    // esper percent line
    const esperPercentLine = table.querySelector('tr:nth-child(12)');
    expect(esperPercentLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.esperPercent');
    expect(esperPercentLine.querySelector('td:nth-child(2)').textContent).toEqual('30');
    expect(esperPercentLine.querySelector('td:nth-child(3)').textContent).toEqual('(40%)');

    // total line
    const totalLine = table.querySelector('tr:nth-child(13)');
    expect(totalLine.querySelector('th').textContent).toEqual('unit.details.stats.popup.total');
    expect(totalLine.querySelector('td:nth-child(2)').textContent).toEqual('3,480');
    expect(totalLine.querySelector('td:nth-child(3)').textContent).toEqual('');
  });

  it('should display unit stats for DH and warning for exceeding limit', () => {
    // GIVEN
    const UNIT_STATS_TEST_DATA = `{
      "hp":1000,"mp":100,"atk":100,"mag":100,"def":100,"spr":100,
      "hp_passive":100,"mp_passive":10,"atk_passive":10,"mag_passive":10,"def_passive":10,"spr_passive":10,
      "hp_dh":100,"mp_dh":10,"atk_dh":10,"mag_dh":10,"def_dh":10,"spr_dh":10,
      "hp_tdh":100,"mp_tdh":10,"atk_tdh":10,"mag_tdh":10,"def_tdh":10,"spr_tdh":10,
      "hp_dw":50,"mp_dw":10,"atk_dw":10,"mag_dw":10,"def_dw":10,"spr_dw":10,
      "esper_percent": 20
    }`;
    const unitStats: UnitStats = new UnitStats(JSON.parse(UNIT_STATS_TEST_DATA));
    unitStats.defineEquipmentsStats(500, 100, 100, 100, 100, 100, 10);
    unitStats.defineEquipmentPassives(50, 10, 10, 10, 10, 10, 10, []);
    unitStats.defineEquipmentDhBonuses(250, 10, 10, 10, 10, 10, []);
    unitStats.defineEquipmentEsperPercent(50, []);
    unitStats.defineEsperStats(GOLEM_TANKING);
    unitStats.computeTotals(true, true, false);
    const dialogConfig = {
      data: {
        unitStats: unitStats,
        stat: 'hp',
        esper: GOLEM_TANKING,
        doublehanding: true,
        dualwielding: false,
      }
    };

    // WHEN
    dialog.open(UnitDetailsStatSumComponent, dialogConfig);
    noop.detectChanges();

    // THEN
    const table = overlayContainerElement.querySelector('table.stat-details');
    expect(table).toBeTruthy();

    // unit header line
    const unitHeaderLine = table.querySelector('tr:nth-child(1)');
    expect(unitHeaderLine.querySelector('th').textContent).toEqual('unit.details.stats.popup.unit');

    // unit base line
    const unitBaseLine = table.querySelector('tr:nth-child(2)');
    expect(unitBaseLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.base');
    expect(unitBaseLine.querySelector('td:nth-child(2)').textContent).toEqual('1,000');
    expect(unitBaseLine.querySelector('td:nth-child(3)').textContent).toEqual('');

    // unit passive line
    const unitPassiveLine = table.querySelector('tr:nth-child(3)');
    expect(unitPassiveLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.passive');
    expect(unitPassiveLine.querySelector('td:nth-child(2)').textContent).toEqual('1,000');
    expect(unitPassiveLine.querySelector('td:nth-child(3)').textContent).toEqual('(100%)');

    // unit dh line
    const unitDhLine = table.querySelector('tr:nth-child(4)');
    expect(unitDhLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.dh');
    expect(unitDhLine.querySelector('td:nth-child(2)').textContent).toEqual('1,000');
    expect(unitDhLine.querySelector('td:nth-child(3)').textContent).toEqual('(200%)');

    // unit esper percent line
    const unitEsperPercentLine = table.querySelector('tr:nth-child(5)');
    expect(unitEsperPercentLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.esperPercent');
    expect(unitEsperPercentLine.querySelector('td:nth-child(2)').textContent).toEqual('19');
    expect(unitEsperPercentLine.querySelector('td:nth-child(3)').textContent).toEqual('(20%)');

    // equipment header line
    const equipmentHeaderLine = table.querySelector('tr:nth-child(6)');
    expect(equipmentHeaderLine.querySelector('th').textContent).toEqual('unit.details.stats.popup.equipment');

    // equipment base line
    const equipmentBaseLine = table.querySelector('tr:nth-child(7)');
    expect(equipmentBaseLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.base');
    expect(equipmentBaseLine.querySelector('td:nth-child(2)').textContent).toEqual('500');
    expect(equipmentBaseLine.querySelector('td:nth-child(3)').textContent).toEqual('');

    // equipment passive line
    const equipmentPassiveLine = table.querySelector('tr:nth-child(8)');
    expect(equipmentPassiveLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.passive');
    expect(equipmentPassiveLine.querySelector('td:nth-child(2)').textContent).toEqual('500');
    expect(equipmentPassiveLine.querySelector('td:nth-child(3)').textContent).toEqual('(50%) ');

    // equipment dh line
    const equipmentDhLine = table.querySelector('tr:nth-child(9)');
    expect(equipmentDhLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.dh');
    expect(equipmentDhLine.querySelector('td:nth-child(2)').textContent).toEqual('500');
    expect(equipmentDhLine.querySelector('td.limit-warn').textContent).toEqual('(250%)');

    // equipment esper percent line
    const equipmentEsperPercentLine = table.querySelector('tr:nth-child(10)');
    expect(equipmentEsperPercentLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.esperPercent');
    expect(equipmentEsperPercentLine.querySelector('td:nth-child(2)').textContent).toEqual('47');
    expect(equipmentEsperPercentLine.querySelector('td:nth-child(3)').textContent).toEqual('(50%)');

    // esper header line
    const esperHeaderLine = table.querySelector('tr:nth-child(11)');
    expect(esperHeaderLine.querySelector('th').textContent).toEqual('unit.details.stats.popup.esper');

    // esper base line
    const esperBaseLine = table.querySelector('tr:nth-child(12)');
    expect(esperBaseLine.querySelector('td:nth-child(1)').textContent).toEqual('Golem');
    expect(esperBaseLine.querySelector('td:nth-child(2)').textContent).toEqual('93');
    expect(esperBaseLine.querySelector('td:nth-child(3)').textContent).toEqual('');

    // esper passive line
    const esperPassiveLine = table.querySelector('tr:nth-child(13)');
    expect(esperPassiveLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.passive');
    expect(esperPassiveLine.querySelector('td:nth-child(2)').textContent).toEqual('100');
    expect(esperPassiveLine.querySelector('td:nth-child(3)').textContent).toEqual('(10%)');

    // esper esper percent line
    const esperEsperPercentLine = table.querySelector('tr:nth-child(14)');
    expect(esperEsperPercentLine.querySelector('td:nth-child(1)').textContent).toEqual('unit.details.stats.popup.esperPercent');
    expect(esperEsperPercentLine.querySelector('td:nth-child(2)').textContent).toEqual('37');
    expect(esperEsperPercentLine.querySelector('td:nth-child(3)').textContent).toEqual('(40%)');

    // total line
    const totalLine = table.querySelector('tr:nth-child(15)');
    expect(totalLine.querySelector('th').textContent).toEqual('unit.details.stats.popup.total');
    expect(totalLine.querySelector('td:nth-child(2)').textContent).toEqual('4,795');
    expect(totalLine.querySelector('td:nth-child(3)').textContent).toEqual('');
  });
});
