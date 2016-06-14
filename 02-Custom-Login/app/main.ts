import {bootstrap}    from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';
import {AUTH_PROVIDERS} from 'angular2-jwt';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  AUTH_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
])
