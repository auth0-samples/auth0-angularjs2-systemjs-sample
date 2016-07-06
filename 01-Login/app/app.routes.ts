import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent }               from './home.component';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
