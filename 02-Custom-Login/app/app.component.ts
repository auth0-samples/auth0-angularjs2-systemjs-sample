import {Component} from '@angular/core';
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

import {Home} from './home.component';
import {Login} from './login.component';
import {Auth} from './auth.service';

@Component({
    selector: 'my-app',
    providers: [ Auth ],
    directives: [ ROUTER_DIRECTIVES ],
    templateUrl: 'app/app.template.html'
})
@RouteConfig([
  { path: '/home', name: 'Home', component: Home, useAsDefault: true},
  { path: '/login', name: 'Login', component: Login}
])

export class AppComponent{
  constructor(private auth: Auth) {}
}
