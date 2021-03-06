# Site

## Requirements

Make sure all dependencies have been installed:

- [Hugo](https://gohugo.io/) >= v0.91.0+extended
- [Go](https://golang.org/) >= v1.17
- [Node.js](https://nodejs.org/) >= v16

## Getting started

Connect to your Contentful space by renaming the `.env.example` to `.env` and filling out the missing fields.

Install dependencies:

```bash
npm install
```

Build development files with live reloading and injection:

```bash
npm start
```

### Other commands

- `npm run build` - Build production files
- `npm run content` - Fetch data from Contentful
- `npm run clean` - Delete temporary directories
- `npm run storybook` - Run storybook
- `npm run scaffold` - Scaffold new components
- `npm run debug:i18n` - Track down missing translation strings
- `npm run lint:styles` - Check styles for errors
- `npm run lint:js` - Check scripts for errors
- `npm run lh:install` - Install dependencies of tools/lighthouse
- `npm run lh:start` - Start lighthouse server
- `npm run lh:audit` - Create lighthouse report

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
