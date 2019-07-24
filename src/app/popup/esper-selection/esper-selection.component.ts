import {Component} from '@angular/core';
import {ESPER_BUILDS} from '../../../core/calculator-constants';
import {Esper} from '../../../core/model/esper.model';
import {TranslateService} from '@ngx-translate/core';
import {MatDialogRef} from '@angular/material/dialog';
import {EquipmentSelectionComponent} from '../equipment-selection/equipment-selection.component';

@Component({
  selector: 'app-esper-selection',
  templateUrl: './esper-selection.component.html',
  styleUrls: ['./esper-selection.component.css']
})
export class EsperSelectionComponent {

  constructor(private dialogRef: MatDialogRef<EquipmentSelectionComponent>,
              private translateService: TranslateService) {
  }

  public selectEsper(esper: Esper) {
    this.dialogRef.close(esper);
  }

  public getEsperList(): Array<Esper> {
    return ESPER_BUILDS;
  }

  public getEsperName(esper: Esper) {
    return esper['name_' + this.translateService.currentLang];
  }

  public getEsperBuildName(esper: Esper) {
    return esper['build_' + this.translateService.currentLang];
  }
}
