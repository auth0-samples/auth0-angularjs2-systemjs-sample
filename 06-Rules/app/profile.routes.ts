import { Routes }     from '@angular/router';
import { ProfileShow }      from './profile_show.component';
import { ProfileComponent } from './profile.component';

export const ProfileRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {path: '', component: ProfileShow}
    ]
  }
];
