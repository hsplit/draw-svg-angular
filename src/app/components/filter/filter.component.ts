import { Component, Input } from '@angular/core';
import { IFilter } from '../../interfaces/ifilter';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() filter: IFilter;

  constructor(public localizationService: LocalizationService) { }

  getTextData(text): string {
    return this.localizationService.getTextData(text);
  }
}
