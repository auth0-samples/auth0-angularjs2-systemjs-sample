import {Component} from '@angular/core';
import {Auth} from './auth.service';

@Component({
  selector: 'home',
  templateUrl: 'app/home.template.html'
})
export class Home {
  constructor(private auth: Auth) {}
}
