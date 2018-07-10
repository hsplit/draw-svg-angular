import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import * as components from './components';
import * as pipes from './pipes';

import { FormsModule } from '@angular/forms';
import { AppRouterModule } from './modules/router/router.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialUiModule } from './modules/material-ui/material-ui.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

/*import {AppComponent} from './components/app-root/app.component';
import {HomeStatComponent} from './components/home-stat/home-stat.component';
import {DrawSvgComponent} from './components/draw-svg/draw-svg.component';
import {SavedListComponent} from './components/saved-list/saved-list.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import {FilterComponent} from './components/filter/filter.component';
import {SettingsComponent} from './components/settings/settings.component';
import {SvgFilterPipe} from './pipes/svg-filter.pipe';
import {DateFormatPipe} from './pipes/date-format.pipe';*/

@NgModule({
  declarations: [
    ...Object.values(components),
    ...Object.values(pipes)
    /*AppComponent, HomeStatComponent, DrawSvgComponent, SavedListComponent, GalleryComponent, FilterComponent,
    SettingsComponent, SvgFilterPipe, DateFormatPipe*/
  ],
  imports: [
    BrowserModule, FormsModule, AppRouterModule, HttpClientModule, MaterialUiModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [], // LocalDataService, IdbDataService, LocalizationService
  bootstrap: [components.AppComponent]
})
export class AppModule { }
