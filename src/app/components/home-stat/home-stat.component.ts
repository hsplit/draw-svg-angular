import { Component } from '@angular/core';
import { IdbDataService } from '../../services/idb-data.service';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'home-stat',
  templateUrl: './home-stat.component.html',
  styleUrls: ['./home-stat.component.scss']
})
export class HomeStatComponent {
  constructor(private idb: IdbDataService,
              public localizationService: LocalizationService) { }

  getCount(): number {
    return this.idb.getCount();
  }

  getTextData(text): string {
    return this.localizationService.getTextData(text);
  }
}
