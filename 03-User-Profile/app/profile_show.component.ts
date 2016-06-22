import {Component} from '@angular/core';
import {Auth} from './auth.service';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  selector: 'profile_show',
  directives: [ ROUTER_DIRECTIVES ],
  templateUrl: 'app/profile_show.template.html'
})
export class ProfileShow {
  constructor(private auth: Auth) {}
}
