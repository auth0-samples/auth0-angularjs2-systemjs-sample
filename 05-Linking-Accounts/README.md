# Linking accounts

This example shows how to link/unlink different `Auth0` users accounts. 

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/spa/angular2/05-linking-accounts). 

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
  <script src="http://cdn.auth0.com/js/lock/10.0.0/lock.min.js"></script>
  ...
</head>
```

### 2. Create 2 lock instances (one for linking login)

```typescript
/* ===== app/auth.service.ts ===== */
...
lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_DOMAIN');
// Lock instance to lauch a login to obtain the secondary JWT
lockLink = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_DOMAIN', {
    auth: {params: {state: "linking"}},
    allowedConnections: ['Username-Password-Authentication', 'facebook', 'google-oauth2'],
    languageDictionary: { // allows to override dictionary entries
      title: "Link with:"
    }
  });
...
```

### 3. Check auth result state on authenticated callback

```typescript
/* ===== app/auth.service.ts ===== */
...
// Add callback for lock `authenticated` event
this.lock.on("authenticated", (authResult) => {
  // Every lock instance listen to the same event, so we have to check if
  // it's not the linking login here.
  if(authResult.state != "linking"){
    localStorage.setItem('id_token', authResult.idToken);
    this.fetchProfile(authResult.idToken);
  }
});

// Add callback for lockLink `authenticated` event
this.lockLink.on("authenticated", (authResult) => {
  // Every lock instance listen to the same event, so we have to check if
  // it's the linking login here.
  if(authResult.state == "linking"){
    // If it's the linking login, then do the link through the API.
    this.doLinkAccounts(authResult.idToken);
  }
});
...
``` 

### 4. Link two accounts

```typescript
/* ===== app/auth.service.ts ===== */
@Injectable()
export class Auth {
  ...

  constructor(private authHttp: AuthHttp, private router: Router) {
    ...
  };

  public doLinkAccounts(accountToLinkJWT) {
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var data: any = JSON.stringify({
      link_with: accountToLinkJWT
    });

    this.authHttp
      .post('https://' + 'YOUR_DOMAIN' + '/api/v2/users/' + this.userProfile.user_id + '/identities', data, {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
          console.log("accounts linked");
          this.fetchProfile(localStorage.getItem('id_token'));
          this.router.navigate(['/profile']);
        },
        error => alert(error.json().message)
      );
  }
}
``````
