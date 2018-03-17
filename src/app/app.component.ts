import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    if (translate.getBrowserLang().startsWith('fr')) {
      translate.use('fr');
    }
  }

  public switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
