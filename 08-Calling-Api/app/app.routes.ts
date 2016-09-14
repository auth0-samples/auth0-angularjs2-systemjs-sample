import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { HomeComponent }               from './home.component';
import { PingComponent }               from './ping.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ping', component: PingComponent},
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);