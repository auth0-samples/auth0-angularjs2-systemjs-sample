# User profile

This example shows how to retrieve an Auth0 user’s profile and how to update it via the Management API. After following the steps outlined here, you will be able to retrieve, set, and update a user profile.

You can read a quickstart for this sample [here](https://auth0.com/docs/quickstart/spa/angular2/04-user-profile). 

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
  <script src="http://cdn.auth0.com/js/lock/10.2/lock.min.js"></script>
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