import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

import { MenuModule } from '../core/components/menu/menu.module';

import * as fromComponents from './components';

import { ActsListComponent } from './actsList.component';


@NgModule({
  declarations: [
    ActsListComponent,
    ...fromComponents.components
  ],
  imports: [
    RouterModule,
    MatCardModule,
    MatIconModule,

    MenuModule
  ],
  providers: [
  ],
  exports: [
    ...fromComponents.components
  ]
})
export class ActsListModule { }
