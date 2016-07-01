import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

@Component({
    selector: 'my-app',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/app.template.html'
})

export class AppComponent {}
