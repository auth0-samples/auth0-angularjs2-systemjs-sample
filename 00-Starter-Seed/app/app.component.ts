import {Component} from '@angular/core';
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Home} from './home.component';

@Component({
    selector: 'my-app',
    directives: [ ROUTER_DIRECTIVES ],
    templateUrl: 'app/app.template.html',
    styles: [`.btn-margin { margin-top: 5px}`]
})
@RouteConfig([
  { path: '/home', name: 'Home', component: Home}
])

export class AppComponent { }
