import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

import { ActsListModule } from '../actsList/actsList.module';

import { UniqueActComponent } from './uniqueAct.component';


@NgModule({
  declarations: [
    UniqueActComponent
  ],
  imports: [
    RouterModule,
    MatCardModule,
    MatIconModule,
    ActsListModule
  ],
  providers: [
  ]
})
export class UniqueActModule { }
