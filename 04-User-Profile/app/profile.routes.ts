import { Routes }     from '@angular/router';
import { ProfileEdit }      from './profile_edit.component';
import { ProfileShow }      from './profile_show.component';
import { ProfileComponent } from './profile.component';

export const ProfileRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'edit',  component: ProfileEdit },
      { path: '',     component: ProfileShow }
    ]
  }
];
