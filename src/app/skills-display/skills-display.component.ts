import {Component, OnInit} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';

@Component({
  selector: 'app-skills-display',
  templateUrl: './skills-display.component.html',
  styleUrls: ['./skills-display.component.css']
})
export class SkillsDisplayComponent implements OnInit {

  constructor(public unitsService: UnitsService) {
  }

  ngOnInit() {
  }

}
