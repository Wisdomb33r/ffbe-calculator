import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {UnitDetailsComponent} from './unit-details/unit-details.component';
import {DamageCalculatorComponent} from './damage-calculator/damage-calculator.component';
import {EquipmentSelectionComponent} from './equipment-selection/equipment-selection.component';
import {UnitSelectionComponent} from './unit-selection/unit-selection.component';
import {DamageResultsComponent} from './damage-results/damage-results.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatButtonModule, MatCardModule, MatDialogModule, MatMenuModule, MatSelectModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatabaseClientService} from '../core/services/database-client.service';
import {UnitsService} from '../core/services/units.service';
import {UnitDetailsMagComponent} from './unit-details-mag/unit-details-mag.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    UnitDetailsComponent,
    DamageCalculatorComponent,
    EquipmentSelectionComponent,
    DamageResultsComponent,
    UnitSelectionComponent,
    UnitDetailsMagComponent,
  ],
  imports: [
    CommonModule,
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
  ],
  entryComponents: [
    UnitSelectionComponent,
    UnitDetailsMagComponent,
  ],
  providers: [
    DatabaseClientService,
    UnitsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
