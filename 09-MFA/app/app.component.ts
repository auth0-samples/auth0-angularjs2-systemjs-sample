import { Component }         from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Auth }              from './auth.service';

@Component({
    selector: 'my-app',
    providers: [ Auth ],
    directives: [ ROUTER_DIRECTIVES ],
    templateUrl: 'app/app.template.html'
})

export class AppComponent {
  constructor(private auth: Auth) {}
};
