# Authorization

This example shows one of the ways of adding ***Authorization*** for a resource in your application. We have an `/admin` page, which is only accessible for users with an `admin` role.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/spa/angular2/07-authorization). 

## Getting Started

Install the npm packages described in the package.json and verify that it works:

```bash
# Install the dependencies
npm install

# Run
npm start
```

The npm start command first compiles the application, then simultaneously re-compiles and runs the lite-server. Both the compiler and the server watch for file changes.

Shut it down manually with Ctrl-C.

You're ready to write your application.

## Important Snippets

### 1. Add lock dependency

```html
/* ===== ./index.html ===== */
<head>
  ...
  <!-- Auth0 Lock script -->
  <script src="http://cdn.auth0.com/js/lock/10.2.2/lock.min.js"></script>
  ...
</head>
```

### 2. Check if user is admin

```typescript
/* ===== app/auth.service.ts ===== */
export class Auth {
  ...
  public isAdmin() {
    return this.userProfile && this.userProfile.app_metadata
      && this.userProfile.app_metadata.roles
      && this.userProfile.app_metadata.roles.indexOf('admin') > -1;
  }
}
...
```

### 3. Create a guard to filter access

```typescript
/* ===== app/auth.guard.ts ===== */

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.auth.authenticated()){
      if(this.auth.isAdmin()){
        return true;
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else {
      localStorage.setItem('redirect_url', state.url);
      this.auth.login();
      this.router.navigate(['']);
      return false;
    }
  }
}
```

### 4. Add guard to protected route

```typescript
/* ===== app/app.routes.ts ===== */
export const routes: RouterConfig = [
  ...
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  ...
];
```