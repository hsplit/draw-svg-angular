import { Component } from '@angular/core';
import { LocalizationService } from '../../services/localization.service';
import { ILanguage } from '../../interfaces/ilanguage';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  languageList: Array<ILanguage> = [];

  constructor(public localizationService: LocalizationService) {
    this.languageList = localizationService.getLanguageList();
  }

  get currentLanguage(): string {
    return this.localizationService.currentLanguage;
  }

  set currentLanguage(code: string) {
    this.localizationService.setCurrentLocalization(code);
  }

  getTextData(text): string {
    return this.localizationService.getTextData(text);
  }
}
