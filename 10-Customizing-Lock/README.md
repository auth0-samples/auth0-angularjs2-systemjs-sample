# Customizing Lock.

This example shows how to customize the `Lock` widget. Sometimes you need to change some UI stuff so this is what we are going to do.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/spa/angular2/10-customizing-lock). 

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
  <script src="http://cdn.auth0.com/js/lock/10.0.0-rc.2/lock.min.js"></script>
  ...
</head>
```

### 2. Add options on lock instance creation

```typescript
/* ===== app/auth.service.ts ===== */

export class Auth {
 lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_DOMAIN', {
   theme: {
     logo: "test-icon.png",
     primaryColor: "#b81b1c"
   },
   languageDictionary: {
     title: "My Company"
   }
 });
 ...
}
```