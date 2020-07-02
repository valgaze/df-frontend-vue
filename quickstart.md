## Quickstart for deployment

Note: The steps below assume you have a functioning DialogFlow agent and a backend that can receive/process DialogFlow traffic.

## 0. Get a backend

If you don't have a backend that will transact with DialogFlow, follow steps below

- Setup: https://github.com/valgaze/df-starter-kit/blob/docs/master/quickstart.md

- Deploy to firebase: https://github.com/valgaze/df-starter-kit/blob/docs/master/README.md#Deployment

## 1. Build with backend

This will create a bundle in /dist

For development, set `VUE_APP_BACKEND` in **[.env](.env)**

For production deploymeent, set `VUE_APP_BACKEND` in **[.env.production](.env.production)**

## 2. Test

Verify that everything is working/looking the way you expect

```
cd dist
npx serve -p 4567
```

(Above open browser to localhost:4567)

## 3. Deploy

If you're using the **[starter kit](https://github.com/valgaze/df-starter-kit)** make sure frontend/dist has the contents of this frontend's dist and run

```
npm run deploy:frontend
```

Answer "yes"
