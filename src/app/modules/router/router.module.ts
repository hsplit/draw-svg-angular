import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { SavedListComponent } from '../../components/saved-list/saved-list.component';
import { HomeStatComponent } from '../../components/home-stat/home-stat.component';
import { DrawSvgComponent } from '../../components/draw-svg/draw-svg.component';
import { SettingsComponent } from '../../components/settings/settings.component';

const routes: Routes = [
  {
    path: '', component: HomeStatComponent
  },
  {
    path: 'draw', component: DrawSvgComponent
  },
  {
    path: 'saved', component: SavedListComponent
  },
  {
    path: 'gallery', component: GalleryComponent
  },
  {
    path: 'settings', component: SettingsComponent
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRouterModule { }
