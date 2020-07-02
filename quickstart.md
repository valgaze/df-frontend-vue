## Quickstart for development & deployment

Note: The steps below assume you have a functioning DialogFlow agent and a backend that can receive/process DialogFlow traffic.

## 0. Get a backend

If you don't have a backend that will transact with DialogFlow, follow steps below

- Setup: https://github.com/valgaze/df-starter-kit/blob/docs/master/quickstart.md

- Deploy to firebase: https://github.com/valgaze/df-starter-kit/blob/docs/master/README.md#Deployment

## 1. Local development

Turn on your backend (ex http://localhost:3000/chat) & set `VUE_APP_BACKEND` in **[.env](.env)**

Boot with

```sh
npm run serve
```

Note you can change the backend on the fly in settings menu (see **[here for details](./assets/README.md)**)-- note this changes are only persisted on your local machine

![image](asseets/set_backend.gif)

## 2. Build with backend

This will create a deployable bundle in the /dist directory

For deploymeent, set `VUE_APP_BACKEND` in **[.env.production](.env.production)**

Build a bundle with

```sh
npm run build
```

## 3. Test

Verify that everything is working/looking the way you expect

```
cd dist
npx serve -p 4567
```

(Above open browser to localhost:4567)

## 4. Deploy

If you're using the **[starter kit](https://github.com/valgaze/df-starter-kit)** make sure frontend/dist has the contents of this frontend's dist and run

```
npm run deploy:frontend
```

Answer "yes" when asked if you set the backend (which you did in step 2)
