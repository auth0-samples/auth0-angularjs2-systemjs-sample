import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent }               from './home.component';
import { ProfileRoutes }               from './profile.routes';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent},
  ...ProfileRoutes,
  { path: '**', redirectTo: '' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
