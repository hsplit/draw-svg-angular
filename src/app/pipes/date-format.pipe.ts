import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from '../services/localization.service';

@Pipe({
  name: 'dateFormat',
  pure: false
})
export class DateFormatPipe implements PipeTransform {
  constructor(private localizationService: LocalizationService) { }
  transform(value: number, args?: any): string {
    return new Intl.DateTimeFormat(this.localizationService.currentLanguage, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(value);
  }
}
