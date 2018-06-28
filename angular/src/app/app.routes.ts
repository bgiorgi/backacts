import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { LogInComponent } from './login/log-in.component';
import { SignUpComponent } from './signup/sign-up.component';
import { ActsListComponent } from './actsList/actsList.component';
import { UniqueActComponent } from './uniqueAct/uniqueAct.component';
import { AddActComponent } from './addAct/addAct.component';
import { EditProfileComponent } from './editProfile/editProfile.component';

export const appRoutes: Routes = [
  { path: '', component: ActsListComponent, pathMatch: 'full' },
  { path: 'log-in', component: LogInComponent, pathMatch: 'full'  },
  { path: 'sign-up', component: SignUpComponent, pathMatch: 'full'  },
  { path: 'acts', component: ActsListComponent, pathMatch: 'full'  },
  { path: 'u-act', component: UniqueActComponent, pathMatch: 'full'  },
  { path: 'add-act', component: AddActComponent, pathMatch: 'full'  },
  { path: 'edit-profile', component: EditProfileComponent, pathMatch: 'full'  },
  { path: '**', component: ActsListComponent },
];
