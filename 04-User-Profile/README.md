# User profile

This example shows how to retrieve an Auth0 user’s profile and how to update it via the Management API. After following the steps outlined here, you will be able to retrieve, set, and update a user profile.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/spa/angular2/04-user-profile). 

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
  <script src="http://cdn.auth0.com/js/lock/10.7/lock.min.js"></script>
  ...
</head>
```

### 2. Add additional fields to signup

```typescript
/* ===== app/auth.service.ts ===== */
lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_DOMAIN', {
  additionalSignUpFields: [{
    name: "address",                              // required
    placeholder: "enter your address",            // required
    icon: "https://example.com/address_icon.png", // optional
    validator: function(value) {                  // optional
      // only accept addresses with more than 10 chars
      return value.length > 10;
    }
  }]
});
```

### 3. Fetch profile

```typescript
/* ===== app/auth.service.ts ===== */
// Add callback for lock `authenticated` event
this.lock.on("authenticated", (authResult) => {
  localStorage.setItem('id_token', authResult.idToken);

  // Fetch profile information
  this.lock.getProfile(authResult.idToken, (error, profile) => {
    if (error) {
      // Handle error
      alert(error);
      return;
    }

    profile.user_metadata = profile.user_metadata || {};
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile;
  });
});
``` 

### 4. Update profile

```typescript
/* ===== app/profile_edit.component.ts ===== */
...
import { AuthHttp }             from 'angular2-jwt';

export class ProfileEdit {
  address: String
  constructor(private auth: Auth, private authHttp: AuthHttp, private router: Router) {
    if(auth.userProfile.user_metadata && auth.userProfile.user_metadata.address){
      this.address = auth.userProfile.user_metadata.address;
    }
  }

  onSubmit() {
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var data: any = JSON.stringify({
      user_metadata: {
        address: this.address
      }
    });

    this.authHttp
      .patch('https://' + 'YOUR_DOMAIN' + '/api/v2/users/' + this.auth.userProfile.user_id, data, {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
          this.auth.userProfile = response;
          localStorage.setItem('profile', JSON.stringify(response));
          this.router.navigate(['/profile']);
        },
        error => alert(error.json().message)
      );
  }
}

/* ===== app/profile_edit.template.html ===== */
...
<form (ngSubmit)="onSubmit()">
  <div class="form-group">
    <label for="name">Address</label>
    <input type="text" class="form-control" [(ngModel)]="address" name="address" placeholder="Enter address">
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
...
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