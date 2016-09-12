import { NgModule }            from '@angular/core';
import { BrowserModule  }      from '@angular/platform-browser';

import { AppComponent }        from './app.component';
import { HomeComponent }       from './home.component';
import { routing,
         appRoutingProviders } from './app.routes';


@NgModule({
    declarations: [
                        AppComponent,
                        HomeComponent
                  ],
    providers:    [appRoutingProviders],
    imports:      [
                        BrowserModule,
                        routing
                  ],
    bootstrap:    [AppComponent],
})
export class AppModule {}