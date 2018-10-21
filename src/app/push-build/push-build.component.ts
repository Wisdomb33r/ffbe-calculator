import {Component, OnInit} from '@angular/core';
import {UnitsService} from '../../core/services/units.service';

@Component({
  selector: 'app-push-build',
  templateUrl: './push-build.component.html',
  styleUrls: ['./push-build.component.css']
})
export class PushBuildComponent implements OnInit {

  public isResultToBePushed = false;

  constructor(private unitsService: UnitsService) {
  }

  ngOnInit() {
  }

  public pushBuild() {
    this.unitsService.pushBuild(this.isResultToBePushed);
  }
}
