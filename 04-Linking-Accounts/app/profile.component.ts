import {Component} from '@angular/core';
import {ProfileShow} from './profile_show.component';
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@RouteConfig([
  { path: '/', name: 'ProfileShow', component: ProfileShow, useAsDefault: true},
])

@Component({
  selector: 'profile',
  directives: [ ROUTER_DIRECTIVES ],
  templateUrl: 'app/profile.template.html'
})
export class Profile {
}
