import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';

import { appRoutes } from './app.routes';

import { LogInModule } from './login/log-in.module';
import { SignUpModule } from './signup/sign-up.module';
import { ActsListModule } from './actsList/actsList.module';
import { UniqueActModule } from './uniqueAct/uniqueAct.module';
import { AddActModule } from './addAct/addAct.module';
import { EditProfileModule } from './editProfile/editProfile.module';

import { MenuModule } from './core/components/menu/menu.module';

import { AppComponent } from './app.component';
import { StaticPageComponent } from './static-page/static-page.component';
import { ImageUploadComponent } from './addAct/image-upload/image-upload.component';
import { GooglePlacesComponent } from './addAct/google-places/google-places.component';







@NgModule({
  declarations: [
    AppComponent,
    StaticPageComponent,
    ImageUploadComponent,
    GooglePlacesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),

    LogInModule,
    SignUpModule,
    ActsListModule,
    UniqueActModule,
    AddActModule,
    EditProfileModule,
    MenuModule

  ],
  providers: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
