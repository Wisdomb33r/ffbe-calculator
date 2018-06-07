import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService,
              private meta: Meta,
              private title: Title) {
    translate.setDefaultLang('en');
    if (translate.getBrowserLang().startsWith('fr')) {
      translate.use('fr');
    }

    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="keywords"');
    this.translate.get('calculator.app.title').subscribe(translated => this.title.setTitle(translated));
    this.translate.get('calculator.app.description').subscribe(translated => this.meta.addTag({name: 'description', content: translated}));
    this.translate.get('calculator.app.keywords').subscribe(translated => this.meta.addTag({name: 'keywords', content: translated}));
  }

}
