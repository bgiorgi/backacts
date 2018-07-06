import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';



import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';

import { MenuModule } from '../core/components/menu/menu.module';

import * as fromComponents from './components';

import { ActsListComponent } from './actsList.component';

import { InfiniteScrollModule } from "ngx-infinite-scroll";



@NgModule({
  declarations: [
    ActsListComponent,
    ...fromComponents.components
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MenuModule,
    InfiniteScrollModule
  ],
  providers: [
  ],
  exports: [
    ...fromComponents.components
  ]
})
export class ActsListModule { }
