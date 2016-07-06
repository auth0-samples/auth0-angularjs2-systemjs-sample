import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent }               from './home.component';
import { LoginComponent }              from './login.component';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
