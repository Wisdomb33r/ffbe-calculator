import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {UnitDetailsComponent} from './unit-details/unit-details.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {EquipmentDetailsComponent} from './equipment-details/equipment-details.component';
import {UnitSelectionComponent} from './unit-selection/unit-selection.component';
import {CalculationDisplayComponent} from './calculation-display/calculation-display.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatabaseClientService} from '../core/services/database-client.service';
import {UnitsService} from '../core/services/units.service';
import {UnitDetailsStatSumComponent} from './unit-details-stat-sum/unit-details-stat-sum.component';
import {EquipmentSelectionComponent} from './equipment-selection/equipment-selection.component';
import {EquipmentsDisplayComponent} from './equipments-display/equipments-display.component';
import {SkillsDisplayComponent} from './skills-display/skills-display.component';
import {CalculationDefensiveComponent} from './calculation-defensive/calculation-defensive.component';
import {CalculationPhysicalChainingComponent} from './calculation-physical-chaining/calculation-physical-chaining.component';
import {CalculationSkillChainingHitsDamagesComponent} from './popup/calculation-skill-chaining-hits-damages/calculation-skill-chaining-hits-damages.component';
import {FormsModule} from '@angular/forms';
import {CalculationPhysicalDamagesComponent} from './popup/calculation-physical-damages/calculation-physical-damages.component';
import {CalculationMagicalChainingComponent} from './calculation-magical-chaining/calculation-magical-chaining.component';
import {CalculationMagicalDamagesComponent} from './popup/calculation-magical-damages/calculation-magical-damages.component';
import {CalculationPhysicalEhpComponent} from './popup/calculation-physical-ehp/calculation-physical-ehp.component';
import {CalculationMagicalEhpComponent} from './popup/calculation-magical-ehp/calculation-magical-ehp.component';
import {CalculationEhpComponent} from './popup/calculation-ehp/calculation-ehp.component';
import {IntegerPipe} from '../core/pipes/integer.pipe';
import {RouterModule, Routes} from '@angular/router';
import {AboutReportComponent} from './about-report/about-report.component';
import {AppMenusComponent} from './app-menus.component';
import {AboutCalculatorComponent} from './about-calculator/about-calculator.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appRoutes: Routes = [
  {path: 'about/report', component: AboutReportComponent},
  {path: 'about/calculator', component: AboutCalculatorComponent},
  {path: '', pathMatch: 'full', component: CalculatorComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    AppMenusComponent,
    IntegerPipe,
    UnitDetailsComponent,
    CalculatorComponent,
    EquipmentDetailsComponent,
    EquipmentSelectionComponent,
    CalculationDisplayComponent,
    UnitSelectionComponent,
    UnitDetailsStatSumComponent,
    EquipmentsDisplayComponent,
    SkillsDisplayComponent,
    CalculationDefensiveComponent,
    CalculationPhysicalChainingComponent,
    CalculationSkillChainingHitsDamagesComponent,
    CalculationPhysicalDamagesComponent,
    CalculationMagicalChainingComponent,
    CalculationMagicalDamagesComponent,
    CalculationPhysicalEhpComponent,
    CalculationMagicalEhpComponent,
    CalculationEhpComponent,
    AboutReportComponent,
    AboutCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
  ],
  entryComponents: [
    UnitSelectionComponent,
    UnitDetailsStatSumComponent,
    EquipmentSelectionComponent,
    CalculationSkillChainingHitsDamagesComponent,
    CalculationPhysicalDamagesComponent,
    CalculationMagicalDamagesComponent,
    CalculationPhysicalEhpComponent,
    CalculationMagicalEhpComponent,
    CalculationEhpComponent,
  ],
  providers: [
    DatabaseClientService,
    UnitsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
