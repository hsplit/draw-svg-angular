import { Component } from '@angular/core';
import { LocalizationService } from '../../services/localization.service';
import { IdbDataService } from '../../services/idb-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private idb: IdbDataService,
              public localizationService: LocalizationService) { }

  getCount(): number {
    return this.idb.getCount();
  }

  getTextData(text): string {
    return this.localizationService.getTextData(text);
  }
}
