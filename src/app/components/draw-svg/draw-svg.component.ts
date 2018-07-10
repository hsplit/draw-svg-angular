import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataService } from '../../services/local-data.service';
import { IdbDataService } from '../../services/idb-data.service';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'draw-svg',
  templateUrl: './draw-svg.component.html',
  styleUrls: ['./draw-svg.component.scss']
})
export class DrawSvgComponent implements OnDestroy {
  tools = new Set(['brash', 'line']);
  selectedTool: string;
  line = false;			// true чтобы рисовать прямые линии
  lineStart = false;	// менять не нужно, флаг для сохранения начальной точки
  md = false;				// состояние mousedown, для проверки во время движения
  closed = false;		// добавление Z в конец d, пока работает не логично
  dataSVG: Array<string> = [];    // атрибут d у svg, в виде массива точек

  isModalActive = false;
  comment = '';
  timeStamp: number;

  constructor(public sanitizer: DomSanitizer,
              private localService: LocalDataService,
              private idbService: IdbDataService,
              public localizationService: LocalizationService) {
    this.dataSVG = localService.getData();
    this.selectedTool = localService.getTool();
  }

  ngOnDestroy() {
    this.localService.setData(this.dataSVG);
    this.localService.setTool(this.selectedTool);
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  getTextData(text): string {
    return this.localizationService.getTextData(text);
  }

  save() {
    this.toggleModal();
    this.idbService.put({
      timeStamp: Date.now(),
      comment: this.comment,
      data: this.dataSVG
    }).then(result => this.localService.openSnackBar(this.getTextData(result),
      this.getTextData('success')));
    this.comment = '';
  }

  saveToClipboard() {
    this.localService.saveToClipboard(this.getSvg());
  }

  getTools(): Array<string> {
    return Array.from(this.tools.values());
  }

  getSvg(): string {
    return this.localService.getSvg(this.dataSVG);
  }

  reset() {
    this.dataSVG = [];
    this.md = false;
    this.lineStart = false;
    this.localService.setData(this.dataSVG);
    this.localService.setTool(this.selectedTool);
  }

  mDown(e) {
    this.md = true;
    this.dataSVG.push(`M ${e.offsetX},${e.offsetY}`);
    this.lineStart = true;
  }

  mUp(e) {
    this.md = false;
    this.dataSVG.push(`L ${e.offsetX},${e.offsetY}`);

    this.localService.setData(this.dataSVG);
    this.localService.setTool(this.selectedTool);
  }

  mMove(e) {
    if (e.movementX === 0 && e.movementX === 0) {
      return;
    }
    if (this.lineStart) {
      this.lineStart = false;
      this.dataSVG.push(`L ${e.offsetX},${e.offsetY}`);
      return;
    }
    if (this.md) {
      if (this.selectedTool !== 'line') {
        this.dataSVG.push(`L ${e.offsetX},${e.offsetY}`);
      } else {
        this.dataSVG[this.dataSVG.length - 1] = `L ${e.offsetX},${e.offsetY}`;
      }
      if (this.selectedTool !== 'line') {
        this.dataSVG.push(`M ${e.offsetX},${e.offsetY}`);
      }
    }
  }

  /*
  tDown(e) {
    console.log('tDown');
    e.preventDefault();
    let rect = e.target.getBoundingClientRect();
    let x = e.targetTouches[0].pageX - rect.left;
    let y = e.targetTouches[0].pageY - rect.top;

    this.md = true;
    this.dataSVG.push(`M ${x},${y}`);
    this.lineStart = true;
  }

  tUp(e) {
    console.log('tUp');
    console.log(e);
    e.preventDefault();
    let rect = e.target.getBoundingClientRect();
    let x = e.targetTouches[0].pageX - rect.left;
    let y = e.targetTouches[0].pageY - rect.top;

    this.md = false;
    this.dataSVG.push(`L ${x},${y}`);

    this.localService.setData(this.dataSVG);
    this.localService.setTool(this.selectedTool);
  }

  tMove(e) {
    console.log('tMove');
    e.preventDefault();
    let rect = e.target.getBoundingClientRect();
    let x = e.targetTouches[0].pageX - rect.left;
    let y = e.targetTouches[0].pageY - rect.top;

    if (this.lineStart) {
      this.lineStart = false;
      this.dataSVG.push(`L ${x},${y}`);
      return;
    }
    if (this.md) {
      if (this.selectedTool !== 'line') {
        this.dataSVG.push(`L ${x},${y}`);
      } else {
        this.dataSVG[this.dataSVG.length - 1] = `L ${x},${y}`;
      }
      if (this.selectedTool !== 'line') {
        this.dataSVG.push(`M ${x},${y}`);
      }
    }
  }*/

  /*
     (touchmove)="tMove($event)"
     (touchend)="tUp($event)"
     (touch)="tUp($event)"
   */
}
