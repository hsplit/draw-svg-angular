import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule, MatBadgeModule, MatSelectModule, MatFormFieldModule, BrowserAnimationsModule,
    MatCardModule, MatInputModule, MatSnackBarModule, MatIconModule, MatListModule, MatProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialUiModule { }
