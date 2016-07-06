import { provideRouter, RouterConfig } from '@angular/router';
import { HomeComponent }               from './home.component';
import { AdminComponent }              from './admin.component';
import { UnauthorizedComponent }       from './unauthorized.component';
import { AuthGuard }                   from './auth.guard';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AuthGuard
];
