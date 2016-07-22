# Calling API


This example shows how to make authenticated API calls using the JSON Web Token given by Auth0 in your Angular2 application. To do this, [angular2-jwt](https://github.com/auth0/angular2-jwt) provides the `AuthHttp` helper which has the same `Http` module interface but automatically add the authorization header to the requests. 


You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/spa/angular2/08-calling-apis). 

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