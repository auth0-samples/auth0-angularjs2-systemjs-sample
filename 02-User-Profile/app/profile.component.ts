import {Component} from '@angular/core';
import {Auth} from './auth.service';

@Component({
  selector: 'profile',
  templateUrl: 'app/profile.template.html'
})
export class Profile {
  constructor(private auth: Auth) {}
}
