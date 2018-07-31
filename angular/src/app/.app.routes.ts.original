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
  { path: '', redirectTo: '/acts/all', pathMatch: 'full' },
  { path: 'acts',
  children: [
    { path: 'all', component: ActsListComponent, data: { actsType: 'all' }},
    { path: 'interests', component: ActsListComponent, data: { actsType: 'interests' }, canActivate: [AuthGuard]},
    { path: 'bookmarked', component: ActsListComponent, data: { actsType: 'bookmarked' }, canActivate: [AuthGuard]},
    { path: 'uploads', component: ActsListComponent, data: { actsType: 'uploads' }, canActivate: [AuthGuard]},
    ]},
  { path: 'log-in', component: LogInComponent, pathMatch: 'full'  },
  { path: 'sign-up', component: SignUpComponent, pathMatch: 'full'  },
  { path: 'acts', component: ActsListComponent, pathMatch: 'full'  },
  { path: 'events/:slug', component: UniqueActComponent, pathMatch: 'full'},
  { path: 'add-act', component: AddActComponent, pathMatch: 'full',canActivate: [AuthGuard]  },
  { path: 'edit-profile', component: EditProfileComponent, pathMatch: 'full',canActivate: [AuthGuard]  },
  { path: 'about', component: StaticPageComponent, data: { slug: 'about' }},
  { path: 'terms', component: StaticPageComponent, data: { slug: 'terms-and-conditions' }},
  { path: 'privacy', component: StaticPageComponent, data: { slug: 'privacy-policy' }},
  { path: 'feedback', component: StaticPageComponent, data: { slug: 'feedback' }},
  { path: '**', component: ActsListComponent },
];
