import { Injectable } from '@angular/core';
import { ILanguage } from '../interfaces/ilanguage';
import { HttpClient } from '@angular/common/http';
import { ItextData } from '../interfaces/itext-data';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  currentLanguage: string;
  textData: ItextData;
  private languages = new Map<string, ILanguage>([
    ['ru-RU', {
      title: 'Русский',
      code: 'ru-RU',
      isRtl: false
    }],
    ['en-US', {
      title: 'English (US)',
      code: 'en-US',
      isRtl: false
    }],
    ['en-GB', {
      title: 'English (GB)',
      code: 'en-GB',
      isRtl: false
    }],
    ['ar-AR', {
      title: 'العربية',
      code: 'ar-AR',
      isRtl: true
    }]
  ]);
  constructor(private _http: HttpClient) {
    this.currentLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : 'en-GB';
    this.loadLocale();
  }

  loadLocale() {
    this._http.get(`assets/${this.currentLanguage}.json`)
      .subscribe(result => this.textData = result as ItextData);
  }

  getTextData(text: string): string {
    return this.textData ? this.textData[text] : '';
  }

  getLanguageList(): Array<ILanguage> {
    return Array.from(this.languages.values()) as Array<ILanguage>;
  }

  setCurrentLocalization(code: string) {
    if (this.languages.has(code)) {
      this.currentLanguage = code;
      localStorage.setItem('language', code);
      this.loadLocale();
    }
  }

  getCurrentLocalization(): ILanguage {
    return this.languages.get(this.currentLanguage);
  }
}
