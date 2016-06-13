import {Component} from '@angular/core';
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Home} from './home.component';
import {Profile} from './profile.component';
import {Auth} from './auth.service';

@Component({
    selector: 'my-app',
    providers: [ Auth ],
    directives: [ ROUTER_DIRECTIVES ],
    templateUrl: 'app/app.template.html',
    styles: [`.btn-margin { margin-top: 5px}`]
})
@RouteConfig([
  { path: '/home', name: 'Home', component: Home, useAsDefault: true},
  { path: '/profile/...', name: 'Profile', component: Profile}
])

export class AppComponent {
  constructor(private auth: Auth) {}
}
