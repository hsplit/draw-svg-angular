import { Component } from '@angular/core';
import { IdbDataService } from '../../services/idb-data.service';
import { ISVGdata } from '../../interfaces/isvgdata';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataService } from '../../services/local-data.service';
import { IFilter } from '../../interfaces/ifilter';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.scss']
})
export class SavedListComponent {
  filter: IFilter;
  constructor(private idb: IdbDataService,
              private sanitizer: DomSanitizer,
              private localService: LocalDataService,
              public localizationService: LocalizationService) {
    this.filter = localService.getDefaultFilter();
  }

  getItems(): Array<ISVGdata> {
    return this.idb.getItems();
  }

  previewSVG(data: Array<string>): string {
    return this.localService.previewSVG(data);
  }

  saveToClipboard(data: Array<string>) {
    this.localService.saveToClipboard(this.localService.getSvg(data));
  }

  open(data: Array<string>) {
    this.localService.setData(data);
  }

  remove(item: ISVGdata) {
    this.idb.remove(item).then(result => this.localService.openSnackBar(this.getTextData(result),
      this.getTextData('success')));
  }

  getTextData(text): string {
    return this.localizationService.getTextData(text);
  }
}
