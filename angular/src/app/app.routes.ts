import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { LogInComponent } from './login/log-in.component';
import { SignUpComponent } from './signup/sign-up.component';
import { ActsListComponent } from './actsList/actsList.component';
import { UniqueActComponent } from './uniqueAct/uniqueAct.component';
import { AddActComponent } from './addAct/addAct.component';
import { EditProfileComponent } from './editProfile/editProfile.component';
import { StaticPageComponent } from './static-page/static-page.component';

// auth guard
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/acts/all', pathMatch: 'full', data: { title: 'Backacts | Experience everything.'} },
  { path: 'acts',
  children: [
    { path: 'all', component: ActsListComponent, data: { actsType: 'all', title: 'Backacts | Experience everything.' }},
    { path: 'interests', component: ActsListComponent, data: { actsType: 'interests', title: 'For me | Backacts' }, canActivate: [AuthGuard]},
    { path: 'bookmarked', component: ActsListComponent, data: { actsType: 'bookmarked', title: 'My bookmarks | Backacts' }, canActivate: [AuthGuard]},
    { path: 'uploads', component: ActsListComponent, data: { actsType: 'uploads', title: 'My uploads | Backacts' }, canActivate: [AuthGuard]},
    ]},
  { path: 'log-in', component: LogInComponent, pathMatch: 'full', data: { title: 'Log in | Backacts'}   },
  { path: 'sign-up', component: SignUpComponent, pathMatch: 'full', data: { title: 'Sign up | Backacts'}  },
  { path: 'acts', component: ActsListComponent, pathMatch: 'full', data: { title: 'Backacts | Experience everything.'}  },
  { path: 'events/:slug', component: UniqueActComponent, data: {'actsType':'userEvents'}},
  { path: 'add-act', component: AddActComponent, pathMatch: 'full', data: { title: 'Add an act | Backacts'} ,canActivate: [AuthGuard]  },
  { path: 'edit-profile', component: EditProfileComponent, pathMatch: 'full', data: { title: 'Edit profile | Backacts'}, canActivate: [AuthGuard]  },
  { path: 'about', component: StaticPageComponent, data: { slug: 'about', title: 'About us | Backacts' }},
  { path: 'terms', component: StaticPageComponent, data: { slug: 'terms-and-conditions', title: 'Terms and conditions | Backacts' }},
  { path: 'privacy', component: StaticPageComponent, data: { slug: 'privacy-policy', title: 'Privacy policy | Backacts' }},
  { path: 'feedback', component: StaticPageComponent, data: { slug: 'feedback', title: 'Feedback | Backacts' }},
  { path: '**', component: ActsListComponent },
];
