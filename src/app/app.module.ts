import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
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
import {CalculationEvokerDamagesComponent} from './popup/calculation-evoker-damages/calculation-evoker-damages.component';
import {PushBuildComponent} from './push-build/push-build.component';
import {UnitTraitsComponent} from './unit-traits/unit-traits.component';
import {CalculationOffensiveTotalsComponent} from './calculation-offensive-totals/calculation-offensive-totals.component';
import {UnitsRankingsComponent} from './units-rankings/units-rankings.component';
import {SkillHitsPowerDisplayComponent} from './popup/skill-hits-power-display/skill-hits-power-display.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appRoutes: Routes = [
  {path: 'about/report', component: AboutReportComponent},
  {path: 'about/calculator', component: AboutCalculatorComponent},
  {path: 'link/unit/:id', component: ExternalLinkComponent},
  {path: 'rankings', component: UnitsRankingsComponent},
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
    SkillHitsPowerDisplayComponent,
    CalculationDefensiveComponent,
    CalculationOffensiveComponent,
    CalculationOffensiveTotalsComponent,
    CalculationPhysicalDamagesComponent,
    CalculationMagicalDamagesComponent,
    CalculationEsperDamagesComponent,
    CalculationEvokerDamagesComponent,
    CalculationPhysicalEhpComponent,
    CalculationMagicalEhpComponent,
    CalculationEhpComponent,
    AboutReportComponent,
    AboutCalculatorComponent,
    SkillDisplayComponent,
    ExternalLinkComponent,
    PermanentUrlComponent,
    EsperSelectionComponent,
    PushBuildComponent,
    UnitTraitsComponent,
    UnitsRankingsComponent,
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
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    ClipboardModule,
  ],
  entryComponents: [
    UnitSelectionComponent,
    UnitDetailsStatSumComponent,
    EquipmentSelectionComponent,
    CalculationPhysicalDamagesComponent,
    CalculationMagicalDamagesComponent,
    CalculationEsperDamagesComponent,
    CalculationEvokerDamagesComponent,
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
