# MFA

This example shows how to add ***MultiFactor Authentication*** to your `Auth0` authentication flow. You just need to config your auth0 account to add MFA and then make a login. There is no need of extra code configuration. 

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


### 1. Login

```typescript
@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_DOMAIN', {});

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };
  ...
}
```

