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

  public linkAccount() {
    this.auth.linkAccount();
  }

  public unLinkAccount(identity) {
    this.auth.unLinkAccount(identity);
  }

  public linkedAccounts() {
   return this.auth.userProfile.identities.filter(identity => {
      return this.auth.userProfile.user_id != identity.provider + '|' + identity.user_id
    })
  }
}
