import { bootstrap }                              from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms }   from '@angular/forms';
import { provide }                                from '@angular/core';
import { HTTP_PROVIDERS }                         from '@angular/http';
import { AUTH_PROVIDERS }                         from 'angular2-jwt';
import { APP_ROUTER_PROVIDERS }                   from './app.routes';
import { AppComponent }                           from './app.component';

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDERS,
  AUTH_PROVIDERS,
  disableDeprecatedForms(),
  provideForms()
]);
