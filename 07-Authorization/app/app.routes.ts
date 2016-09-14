import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { HomeComponent }               from './home.component';
import { AdminComponent }              from './admin.component';
import { UnauthorizedComponent }       from './unauthorized.component';
import { AuthGuard }                   from './auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [
       AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
