import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';


import { CommonModule } from '@angular/common';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';




import { AddActComponent } from './addAct.component';


@NgModule({
  declarations: [
    AddActComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
  ]
})
export class AddActModule { }
