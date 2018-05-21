import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-about-report',
  templateUrl: './about-report.component.html',
  styleUrls: ['./about-report.component.css']
})
export class AboutReportComponent {

  constructor(public translateService: TranslateService) {
  }

}
