# Linking accounts

This example shows how to link/unlink different `Auth0` users accounts. 

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/spa/angular2/05-linking-accounts). 

## Getting Started

Rename the `auth0.config.ts.example` file in the `app` directory to `auth0.config.ts` and provide your Auth0 client ID and domain.

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
  <script src="http://cdn.auth0.com/js/lock/10.2/lock.min.js"></script>
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
```

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [JSON Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.