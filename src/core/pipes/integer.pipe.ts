import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'integer'
})
export class IntegerPipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  transform(value: number | string): string {
    let locale = 'en-us';
    if (this.translate.currentLang === 'fr') {
      locale = 'fr-fr';
    }
    return new Intl.NumberFormat(locale, {maximumFractionDigits: 0}).format(Number(value));
  }
}
