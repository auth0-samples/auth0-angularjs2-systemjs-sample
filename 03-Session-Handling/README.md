# Session Handling

This example shows how to manage sessions when authenticating with `Auth0` in your application.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/spa/angular2/03-session-handling). 

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

### 2. Save token on login

```typescript
/* ===== app/auth.service.ts ===== */
lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_DOMAIN', {});

constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }
}
```

### 3. Check if user is authenticated

```typescript
/* ===== app/auth.service.ts ===== */
import { tokenNotExpired } from 'angular2-jwt';

public authenticated() {
  // Check if there's an unexpired JWT
  // It searches for an item in localStorage with key == 'id_token'
  return tokenNotExpired();
};
``` 

### 3. Logout

```typescript
/* ===== app/auth.service.ts ===== */
public logout() {
  // Remove token from localStorage
  localStorage.removeItem('id_token');
};
```