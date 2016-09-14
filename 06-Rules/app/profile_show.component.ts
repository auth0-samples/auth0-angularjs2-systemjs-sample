import { Component }         from '@angular/core';
import { Auth }              from './auth.service';

@Component({
  selector: 'profile_show',
  templateUrl: 'app/profile_show.template.html'
})

export class ProfileShow {
  constructor(private auth: Auth) {}
};
