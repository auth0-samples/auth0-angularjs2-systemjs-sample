# Custom Login

This example shows how to add ***Login/SignUp*** to your application without using `Lock` widget. Using [auth0.js library](https://github.com/auth0/auth0.js) and a custom form, we can easily add `Auth0` authentication.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/spa/angular2/02-custom-login). 

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

### 1. Add auth0.js dependency

```html
/* ===== ./index.html ===== */
<head>
  ...
  <!-- Auth0 library -->
  <script src="//cdn.auth0.com/w2/auth0-7.0.2.min.js"></script>
  ...
</head>
```

### 2. Login with auth0	

```typescript
/* ===== app/auth.service.ts ===== */
@Injectable()
export class Auth {
  // Configure Auth0
  auth0 = new Auth0({
    domain: 'YOUR_DOMAIN',
    clientID: 'YOUR_CLIENT_ID',
    callbackOnLocationHash: true,
    callbackURL: 'CALLBACK_URL',
  });

  constructor(private router: Router) {
    var result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      this.router.navigate(['/home']);
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }

  public login(username, password) {
    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  };
}
```
