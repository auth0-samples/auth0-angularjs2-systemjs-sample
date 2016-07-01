import { RouterConfig }     from '@angular/router';
import { ProfileShow }      from './profile_show.component';
import { ProfileComponent } from './profile.component';

export const ProfileRoutes: RouterConfig = [
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {path: '', component: ProfileShow}
    ]
  }
];
