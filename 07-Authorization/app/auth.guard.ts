import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Auth }           from './auth.service';
import { Router }         from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate() {
    if(this.auth.authenticated()){
      if(this.auth.isAdmin()){
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else {
      localStorage.setItem('redirect_on_login', 'true');
      this.auth.login();
      this.router.navigate(['']);
      return false;
    }
  }
}
