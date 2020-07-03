# df-cheatchat

Demo (try ordering ice cream 3 times): **[https://df-cheatcodes.valgaze.com](https://df-cheatcodes.valgaze.com)**

![image](assets/frontend_ex.gif)

Reference implementation of a conversational interface that renders rich **[components](#status)** with lots of convenience and debugging tools-- powered by **[df-cheatcodes](https://github.com/valgaze/df-cheatcodes)**

## Backend

If you need a "backend" (like a server, fulfillment intent handlers, etc), see here for a fully fleshed-out "starter" kit (server, agent config, fulfillment webhook, etc): **[https://github.com/valgaze/df-starter-kit](https://github.com/valgaze/df-starter-kit)**

## Handy features

Lots of other stuff, **[see here for details](./assets/README.md)**

- Conversation debugging tools (see the settings & request buttons to trigger requests, transform grpc, etc)

- Convenience like up/Down arrows to cycle through history to easily repeat commands, darkmode, swap backends on the fly, etc

**NOTE:** Before deploying, make sure to replace the value in **[.env.production](.env.production)**

## Libraries & credit

- NES.CSS: https://github.com/nostalgic-css/NES.css

- Press Start 2P font: https://fonts.google.com/specimen/Press+Start+2P

- Carol Skelly's wonderful zero-dependency JSON linter: https://medium.com/wdstack/vue-json-lint-4d665671e993

- Facebook 'shimmer' effect: https://github.com/facebook/Shimmer

- "Shimmer" text effect implemented in CSS: https://codepen.io/redouglas/pen/gobsm

## Status

| Component                                                                                                             | Status                | Notes                       |
| --------------------------------------------------------------------------------------------------------------------- | --------------------- | --------------------------- |
| **[card](https://developers.google.com/assistant/conversational/rich-responses#BasicCardSamples)**                    | done                  |                             |
| **[suggestions](https://developers.google.com/assistant/conversational/rich-responses#suggestion_chips)**             | done (webhookpayload) |                             |
| **[media](https://developers.google.com/assistant/conversational/rich-responses#MediaResponseSamples)**               | done                  |                             |
| **[tableCard](https://developers.google.com/assistant/conversational/rich-responses#TableCardSamples)**               | done                  |                             |
| **[browseCarousel](https://developers.google.com/assistant/conversational/rich-responses#BrowsingCarouselSamples)**   | done                  | tap emits title to chat     |
| **[linkoutSuggestion](https://developers.google.com/assistant/conversational/rich-responses#SuggestionChipsSamples)** | done                  | disappears on tap, no alias |
| **[carouselSelect](https://developers.google.com/assistant/conversational/selection-responses)**                      | done (webhookPayload) | tap emits title             |
| **[listSelect](https://developers.google.com/assistant/conversational/selection-responses)**                          | done (webhookPayload) | tap emits title             |

All items: https://gist.github.com/valgaze/dcd07f6d93f654de6d14d76a341d9450#actions-on-google

## Tests

```sh
npm run test
```

Visual test

```sh
npm run test:visual
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
