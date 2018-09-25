import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material';


import { FormsModule }   from '@angular/forms';

import { LogInComponent } from './log-in.component';


@NgModule({
  declarations: [
    LogInComponent
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: []
})
export class LogInModule { }
