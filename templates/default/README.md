# Site

## Netlify preview

[https://karate-kit-dojo.netlify.app](https://karate-kit-dojo.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/98ecef61-8d51-4c76-b842-b9e423800bfb/deploy-status)](https://app.netlify.com/sites/karate-kit-dojo/deploys)

### Storybook

[https://karate-kit-storybook.netlify.app](https://karate-kit-storybook.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/5d3fa6dc-46ec-49d8-959a-afbd2a305361/deploy-status)](https://app.netlify.com/sites/karate-kit-storybook/deploys)

## Requirements

Make sure all dependencies have been installed:

- [Hugo](https://gohugo.io/) >= v0.89.4+extended
- [Node.js](https://nodejs.org/) >= v16

## Get started

Connect to your Contentful space by renaming the `.env.example` to `.env` and filling out the missing fields.

Install dependencies:

```bash
npm install
```

Build development files with live reloading and injection:

```bash
npm run start
```

### Other commands

- `npm run build` - Build production files
- `npm run content` - Fetch data from Contentful
- `npm run clean` - Delete temporary directories
- `npm run debug:i18n` - Track down missing translation strings
- `npm run lint:styles` - Check styles for errors
- `npm run lh:install` - Install dependencies of tools/lighthouse
- `npm run lh:start` - Start lighthouse server
- `npm run lh:audit` - Create lighthouse report
- `npm run cf:login` - Login to Contentful
- `npm run cf:logout` - Logout from Contentful
- `npm run cf:space` - Choose a Contentful space
- `npm run cf:export` - Export Contentful model
- `npm run cf:import` - Import Contentful model

## Documentation

- [Contentful.md](docs/Contentful.md)
- [i18n.md](docs/i18n.md)
- [Migrations.md](docs/Migrations.md)
- [Netlify.md](docs/Netlify.md)
- [Performance.md](docs/Performance.md)
- [Redirects.md](docs/Redirects.md)
- [Security.md](docs/Security.md)
- [SEO.md](docs/SEO.md)
- [Storybook.md](docs/Storybook.md)

**External docs**
- [Hugo](https://gohugo.io/documentation/)
- [Go Template](https://golang.org/pkg/text/template/)
- [Contentful](https://www.contentful.com/developers/docs/)
- [Contentful-SSG](https://github.com/jungvonmatt/contentful-ssg)
- [stylelint](https://stylelint.io/)

**Communities**

- [Hugo support and discussion](https://discourse.gohugo.io/)

## Contributing

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
