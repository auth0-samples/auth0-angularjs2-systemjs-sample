import {Component} from '@angular/core';
import {Auth} from './auth.service';

@Component({
  selector: 'login',
  templateUrl: 'app/login.template.html'
})
export class Login {
  constructor(private auth: Auth) {}
}
