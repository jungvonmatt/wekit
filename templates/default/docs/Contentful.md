# Contentful

> TODO

- [x] Setup: Initial setup
- [x] Setup: Import example model
- [ ] Setup: Compose and Launch
- [ ] Setup: How to use without Compose

## Setup

### Requirements

Install all dependencies: see [README.md](../README.md).

### Initial setup

Create manually a new space and change the default locale (settings/locales) from `en-US` to `en`. Or you can also use the [space create command](https://github.com/contentful/contentful-cli/tree/master/docs/space/create).

### Import example model

Login and save the access token:

```
npm run cf:login
```

Select an empty space:

```
npm run cf:space
```

Import the model from `export/contentful-model.json`:

```
npm run cf:import
```

## Compose

[https://www.contentful.com/help/introduction-to-compose/](https://www.contentful.com/help/introduction-to-compose/)

## Launch

[https://www.contentful.com/help/introduction-to-launch/](https://www.contentful.com/help/introduction-to-launch/)
