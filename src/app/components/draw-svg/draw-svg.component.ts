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
  color = {
    color: '#000000'
  };

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

  setLinkSVG(name = 'mySvg.svg') {
    // svgEl = this.getSvg().setAttribute('xmlns', "http://www.w3.org/2000/svg");
    let svgEl = this.getSvg().replace(/<svg /, `<svg xmlns="http://www.w3.org/2000/svg" `);
    // let svgData = svgEl.outerHTML;
    let svgData = svgEl;
    let preface = '<?xml version="1.0" standalone="no"?>\r\n';
    let svgBlob = new Blob([preface, svgData], {type: 'image/svg+xml;charset=utf-8'});
    let svgUrl = URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    let imgsrc = 'data:image/svg+xml;base64,' + btoa(svgEl);

    //document.body.innerHTML += '<canvas id="canvasId"></canvas>';
    //let canvas = document.getElementById('canvasId') as HTMLCanvasElement;
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    canvas.width = 320;
    canvas.height = 180;

    let image = new Image();
    image.src = imgsrc;
    image.onload = function() {
      context.drawImage(image, 0, 0);
      canvas.toBlob(blob => {
        let canvasdata = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.download = 'mySvg.png';
        a.href = canvasdata;
        // document.body.appendChild(a);
        a.dispatchEvent(new MouseEvent('click'));
        URL.revokeObjectURL(canvasdata);
      });

      // document.body.removeChild(a);
    };
    // document.body.removeChild(canvas);
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
    return this.localService.getSvg(this.dataSVG).replace(/stroke=".*?"/, `stroke="${this.color.color}"`);
  }

  reset() {
    this.dataSVG = [];
    this.md = false;
    this.lineStart = false;
    this.localService.setData(this.dataSVG);
    this.localService.setTool(this.selectedTool);
  }

  mDown(e) {
    e.preventDefault();
    this.md = true;
    this.dataSVG.push(`M ${e.offsetX},${e.offsetY}`);
    this.lineStart = true;
  }

  mUp(e) {
    e.preventDefault();
    this.md = false;
    this.dataSVG.push(`L ${e.offsetX},${e.offsetY}`);

    this.localService.setData(this.dataSVG);
    this.localService.setTool(this.selectedTool);
  }

  mMove(e) {
    e.preventDefault();
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
}
