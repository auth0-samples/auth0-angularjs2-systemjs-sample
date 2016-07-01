import { bootstrap }                              from '@angular/platform-browser-dynamic';
import { provide }                                from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { APP_ROUTER_PROVIDERS }                   from './app.routes';
import { AppComponent }                           from './app.component';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
])
