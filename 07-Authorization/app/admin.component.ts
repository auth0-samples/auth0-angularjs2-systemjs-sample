import { Component } from '@angular/core';
import { Auth }      from './auth.service';

@Component({
  selector: 'admin',
  templateUrl: 'app/admin.template.html'
})

export class AdminComponent {
  constructor(private auth: Auth) {}
};
