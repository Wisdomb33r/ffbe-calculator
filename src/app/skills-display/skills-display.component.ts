import {Component} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material';
import {Skill} from '../../core/model/skill.model';
import {SkillDisplayComponent} from '../popup/skill-display/skill-display.component';

@Component({
  selector: 'app-skills-display',
  templateUrl: './skills-display.component.html',
  styleUrls: ['./skills-display.component.css']
})
export class SkillsDisplayComponent {

  constructor(public unitsService: UnitsService,
              public translate: TranslateService,
              private dialog: MatDialog) {
  }

  public displaySkill(skill: Skill) {
    this.dialog.open(SkillDisplayComponent, {
      width: '300px',
      data: {
        skill: skill
      }
    });
  }
}
