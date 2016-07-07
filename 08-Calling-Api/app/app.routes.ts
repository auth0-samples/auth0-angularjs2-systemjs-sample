import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent }               from './home.component';
import { PingComponent }               from './ping.component';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent},
  { path: 'ping', component: PingComponent},
  { path: '**', redirectTo: '' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
