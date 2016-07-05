import { bootstrap }                              from '@angular/platform-browser-dynamic';
import { provide }                                from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { APP_ROUTER_PROVIDERS }                   from './app.routes';
import { HTTP_PROVIDERS }                         from '@angular/http';
import { AUTH_PROVIDERS }                         from 'angular2-jwt';
import { AppComponent }                           from './app.component';

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDERS,
  AUTH_PROVIDERS,
  provide(LocationStrategy, { useClass: PathLocationStrategy })
]);
