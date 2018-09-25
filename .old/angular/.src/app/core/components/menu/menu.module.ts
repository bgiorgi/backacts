import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule }  from '@angular/material/expansion';
import { MatSliderModule }  from '@angular/material';
import { MatRadioModule }  from '@angular/material';
import { MatDatepickerModule }  from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material'

import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    MatSliderModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTooltipModule,
    MatSlideToggleModule

  ],
  providers: [],
  exports: [MenuComponent]
})
export class MenuModule {
}
