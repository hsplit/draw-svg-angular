import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { IFilter} from '../interfaces/ifilter';
import { LocalizationService } from './localization.service';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  dataSVG: Array<string> = [];
  tool: string;

  constructor(public snackBar: MatSnackBar,
              private localizationService: LocalizationService) {
    this.dataSVG = localStorage.getItem('lastSVG') ? localStorage.getItem('lastSVG').split(' ') : [];
    this.tool = localStorage.getItem('tool') ? localStorage.getItem('tool') : 'brash';
  }

  getData(): Array<string> {
    return this.dataSVG;
  }

  setData(data: Array<string>) {
    this.dataSVG = data;
    localStorage.setItem('lastSVG', this.dataSVG.join(' '));
  }

  getTool(): string {
    return this.tool;
  }

  setTool(tool: string) {
    this.tool = tool;
    localStorage.setItem('tool', this.tool);
  }

  saveToClipboard(val: string) {
    let selBox = document.createElement('textarea');

    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;

    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();

    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.openSnackBar(this.localizationService.getTextData('info_copy'),
      this.localizationService.getTextData('success'));
    /*
      try {
        let successful = document.execCommand('copy');
        let msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        alert('Oops, unable to copy\n\n' + this.getSvg());
      }
    });*/
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 3000} as MatSnackBarConfig);
  }

  getSvg(data: Array<string>): string {
    let d = data.join(' ');
    return `
    <svg width="320" height="180">
        <path stroke="orange" stroke-width="2" fill="gold" d="${d}"/>
    </svg>`;
  }

  previewSVG(data: Array<string>): string {
    let d = data.join(' ');
    return `
    <svg width="50" height="50" viewBox="0 0 320 180">
        <path stroke="black" stroke-width="2" fill="grey" d="${d}"/>
    </svg>`;
  }

  getDefaultFilter(): IFilter {
    return {
      dateFrom: '',
      dateTo: '',
      query: '',
      sortBy: 'date',
      sortDirection: 'down'
    } as IFilter;
  }
}
