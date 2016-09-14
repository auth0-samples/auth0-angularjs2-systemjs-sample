import { NgModule }                from '@angular/core';
import { BrowserModule  }          from '@angular/platform-browser';
import { FormsModule }             from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AUTH_PROVIDERS }          from 'angular2-jwt';

import { AppComponent }            from './app.component';
import { HomeComponent }           from './home.component';
import { AdminComponent }          from './admin.component';
import { UnauthorizedComponent }   from './unauthorized.component';
import { routing,
         appRoutingProviders }     from './app.routes';

import { Auth } from './auth.service'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AdminComponent,
        UnauthorizedComponent
    ],
    providers:    [
        appRoutingProviders,
        AUTH_PROVIDERS,
        Auth
    ],
    imports:      [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    bootstrap:    [AppComponent],
})
export class AppModule {}
