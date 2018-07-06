import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule,
} from '@angular/material';
import {AppComponent} from './app.component';
import {UnitDetailsComponent} from './unit-details/unit-details.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {EquipmentDetailsComponent} from './equipment-details/equipment-details.component';
import {UnitSelectionComponent} from './popup/unit-selection/unit-selection.component';
import {CalculationDisplayComponent} from './calculation-display/calculation-display.component';
import {DatabaseClientService} from '../core/services/database-client.service';
import {UnitsService} from '../core/services/units.service';
import {UnitDetailsStatSumComponent} from './unit-details-stat-sum/unit-details-stat-sum.component';
import {EquipmentSelectionComponent} from './popup/equipment-selection/equipment-selection.component';
import {EquipmentsDisplayComponent} from './equipments-display/equipments-display.component';
import {SkillsDisplayComponent} from './skills-display/skills-display.component';
import {CalculationDefensiveComponent} from './calculation-defensive/calculation-defensive.component';
import {CalculationOffensiveComponent} from './calculation-offensive/calculation-offensive.component';
import {CalculationPhysicalDamagesComponent} from './popup/calculation-physical-damages/calculation-physical-damages.component';
import {CalculationMagicalDamagesComponent} from './popup/calculation-magical-damages/calculation-magical-damages.component';
import {CalculationPhysicalEhpComponent} from './popup/calculation-physical-ehp/calculation-physical-ehp.component';
import {CalculationMagicalEhpComponent} from './popup/calculation-magical-ehp/calculation-magical-ehp.component';
import {CalculationEhpComponent} from './popup/calculation-ehp/calculation-ehp.component';
import {IntegerPipe} from '../core/pipes/integer.pipe';
import {AboutReportComponent} from './about-report/about-report.component';
import {AppMenusComponent} from './app-menus.component';
import {AboutCalculatorComponent} from './about-calculator/about-calculator.component';
import {SkillDisplayComponent} from './popup/skill-display/skill-display.component';
import {ExternalLinkComponent} from './external-link/external-link.component';
import {PermanentUrlComponent} from './permanent-url/permanent-url.component';
import {ClipboardModule} from 'ngx-clipboard';
import {AppFooterComponent} from './app-footer.component';
import {EsperSelectionComponent} from './popup/esper-selection/esper-selection.component';
import {CalculationEsperDamagesComponent} from './popup/calculation-esper-damages/calculation-esper-damages.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appRoutes: Routes = [
  {path: 'about/report', component: AboutReportComponent},
  {path: 'about/calculator', component: AboutCalculatorComponent},
  {path: 'link/unit/:id', component: ExternalLinkComponent},
  {path: '', pathMatch: 'full', component: CalculatorComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    AppMenusComponent,
    AppFooterComponent,
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
    CalculationOffensiveComponent,
    CalculationPhysicalDamagesComponent,
    CalculationMagicalDamagesComponent,
    CalculationEsperDamagesComponent,
    CalculationPhysicalEhpComponent,
    CalculationMagicalEhpComponent,
    CalculationEhpComponent,
    AboutReportComponent,
    AboutCalculatorComponent,
    SkillDisplayComponent,
    ExternalLinkComponent,
    PermanentUrlComponent,
    EsperSelectionComponent,
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
    MatInputModule,
    MatFormFieldModule,
    ClipboardModule,
  ],
  entryComponents: [
    UnitSelectionComponent,
    UnitDetailsStatSumComponent,
    EquipmentSelectionComponent,
    CalculationPhysicalDamagesComponent,
    CalculationMagicalDamagesComponent,
    CalculationEsperDamagesComponent,
    CalculationPhysicalEhpComponent,
    CalculationMagicalEhpComponent,
    CalculationEhpComponent,
    SkillDisplayComponent,
    EsperSelectionComponent,
  ],
  providers: [
    DatabaseClientService,
    UnitsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
