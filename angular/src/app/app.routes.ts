import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { LogInComponent } from './login/log-in.component';
import { SignUpComponent } from './signup/sign-up.component';
import { ActsListComponent } from './actsList/actsList.component';
import { UniqueActComponent } from './uniqueAct/uniqueAct.component';
import { AddActComponent } from './addAct/addAct.component';
import { EditProfileComponent } from './editProfile/editProfile.component';

// auth guard
import { AuthGuard } from './auth.guard';
// temp
export const appRoutes: Routes = [
  { path: '', redirectTo: '/add-act', pathMatch: 'full' },
  { path: 'home', redirectTo: '/add-act', pathMatch: 'full' },
  { path: 'acts/interests', component: ActsListComponent, data: { actsType: 'interests' }, canActivate: [AuthGuard]},
  { path: 'acts/bookmarked', component: ActsListComponent, data: { actsType: 'bookmarked' }, canActivate: [AuthGuard]},
  { path: 'acts/uploads', component: ActsListComponent, data: { actsType: 'uploads' }, canActivate: [AuthGuard]},
  { path: 'log-in', component: LogInComponent, pathMatch: 'full'  },
  { path: 'sign-up', component: SignUpComponent, pathMatch: 'full'  },
  { path: 'acts', component: ActsListComponent, pathMatch: 'full'  },
  { path: 'events/:slug', component: UniqueActComponent, pathMatch: 'full'},
  { path: 'add-act', component: AddActComponent, pathMatch: 'full',canActivate: [AuthGuard]  },
  { path: 'edit-profile', component: EditProfileComponent, pathMatch: 'full',canActivate: [AuthGuard]  },
  { path: '**', component: ActsListComponent },
];
