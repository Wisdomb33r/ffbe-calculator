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
import {MatButtonModule, MatCardModule, MatDialogModule, MatMenuModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatabaseClientService} from '../core/services/database-client.service';
import {UnitsService} from '../core/services/units.service';
import {UnitDetailsStatSumComponent} from './unit-details-stat-sum/unit-details-stat-sum.component';
import {EquipmentSelectionComponent} from './equipment-selection/equipment-selection.component';
import {EquipmentsDisplayComponent} from './equipments-display/equipments-display.component';
import {SkillsDisplayComponent} from './skills-display/skills-display.component';
import {CalculationDefensiveComponent} from './calculation-defensive/calculation-defensive.component';
import {CalculationPhysicalChainingComponent} from './calculation-physical-chaining/calculation-physical-chaining.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
  ],
  entryComponents: [
    UnitSelectionComponent,
    UnitDetailsStatSumComponent,
    EquipmentSelectionComponent,
  ],
  providers: [
    DatabaseClientService,
    UnitsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
