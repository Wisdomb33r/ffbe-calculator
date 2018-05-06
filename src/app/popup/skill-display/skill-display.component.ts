import {Component, Inject} from '@angular/core';
import {Skill} from '../../../core/model/skill.model';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-skill-display',
  templateUrl: './skill-display.component.html',
  styleUrls: ['./skill-display.component.css']
})
export class SkillDisplayComponent {

  public skill: Skill;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.skill = data.skill;
  }

}
