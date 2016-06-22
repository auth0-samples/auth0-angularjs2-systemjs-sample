# Auth0 Simple NodeJS Server

This is a simple Express server that has two routes:

* **`/ping`**
* **`/secured/ping`**

The intent is to show how to protect the `secured` endpoint with JWT authentication using Auth0.

## Install Dependencies

```bash
npm install
```

## Add Your Auth0 Credentials

If you haven't already done so, [sign up](https://auth0.com/signup) for your free Auth0 account. Once you have the client ID and client secret for your app, replace the argumentts in the `authenticate` middleware within `server.js` with them.

Once your client ID and client secret are set, run the app with `node server.js`. It will be served at `http://localhost:3001`.
