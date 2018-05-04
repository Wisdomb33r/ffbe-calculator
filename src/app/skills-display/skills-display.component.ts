import {Component} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-skills-display',
  templateUrl: './skills-display.component.html',
  styleUrls: ['./skills-display.component.css']
})
export class SkillsDisplayComponent {

  constructor(public unitsService: UnitsService,
              public translate: TranslateService) {
  }

}
