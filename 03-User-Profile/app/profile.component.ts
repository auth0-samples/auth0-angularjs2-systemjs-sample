import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  selector: 'profile',
  directives: [ ROUTER_DIRECTIVES ],
  templateUrl: 'app/profile.template.html'
})

export class ProfileComponent {}
