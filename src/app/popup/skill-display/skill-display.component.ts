import {Component, Inject} from '@angular/core';
import {Skill} from '../../../core/model/skill.model';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Esper} from '../../../core/model/esper.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './skill-display.component.html',
  styleUrls: ['./skill-display.component.css']
})
export class SkillDisplayComponent {

  public skill: Skill;
  public esper: Esper;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private translateService: TranslateService) {
    this.skill = data.skill;
    this.esper = data.esper;
  }

  public getEsperName() {
    return this.esper['name_' + this.translateService.currentLang];
  }
}
