# Calling API


This example shows how to make authenticated API calls using the JSON Web Token given by Auth0 in your Angular2 application. To do this, [angular2-jwt](https://github.com/auth0/angular2-jwt) provides the `AuthHttp` helper which has the same `Http` module interface but automatically add the authorization header to the requests. 


You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/spa/angular2/08-calling-apis). 

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

There is also a very simple Express server [here](https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/Server). Run it and then start this app to send secure pings to an API.

You're ready to write your application.

## Important Snippets

### 1. Add `AUTH_PROVIDERS` to the app

```typescript
/* ===== app/main.ts ===== */
...
import { AUTH_PROVIDERS }                         from 'angular2-jwt';
import { AppComponent }                           from './app.component';

bootstrap(AppComponent, [
  ...
  AUTH_PROVIDERS,
  ...
]);
```

### 2. Use `AuthHttp` to make authenticated http requests

```typescript
/* ===== app/ping.component.ts ===== */
import { Component } from '@angular/core';
import { Auth }      from './auth.service';
import { AuthHttp }  from 'angular2-jwt';
import { Http }      from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'ping',
  templateUrl: 'app/ping.template.html'
})

export class PingComponent {
  API_URL: string = 'http://localhost:3001';
  message: string;

  constructor(private auth: Auth, private http: Http, private authHttp: AuthHttp) {}

  ...

  public securedPing() {
    this.message = '';
    this.authHttp.get(`${this.API_URL}/secured/ping`)
      .map(res => res.json())
      .subscribe(
        data => this.message= data.text,
        error => this.message = error._body || error
      );
  }
};
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