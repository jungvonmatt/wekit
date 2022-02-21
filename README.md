# WEKit

This is a Jamstack kit helping you build secure ([Mozilla Observatory: A+ score](https://observatory.mozilla.org/analyze/wekit-demo.netlify.app)), fast ([Lighthouse: 100 scores](https://googlechrome.github.io/lighthouse/viewer/?gist=0bcb28ac8eaf3b84677a25462940d0cc)), multilingual and highly maintainable sites with **Contentful** ([Compose ready](https://www.contentful.com/marketplace/contentful-app/compose/)) and **Hugo**.


**Hugo Modules**
- [`core`](./hugo-modules/core/README.md) contains [Hugo](https://gohugo.io/) templates and utilities that support [Contentful](https://www.contentful.com/) and/or [Storybook](https://storybook.js.org/) projects.

**Packages**
- [`create-wekit-app`](./packages/create-wekit-app/README.md) contains a CLI tool to scaffold your WEKit app.
- [`contentful-migrations`](./packages/contentful-migrations) contains migration files for content models used in your app.
- [`contentful-apps`](./packages/contentful-apps) contains ui extensions / apps used in your app

**App Templates**
- [`theme-default`](./templates/theme-default/README.md) contains all components, modules and templates.
- [`app`](./templates/app/README.md) combines everything and shows a production-ready example.


## Getting started

The easiest way to kickstart a new WEKit project using contentful and hugo is by using `@jungvonmatt/create-wekit-app`.
This CLI tool enables you to quickly setup a new WEKit application, with everything set up for you.
To get started, use the following command:

```bash
npx @jungvonmatt/create-wekit-app@latest
```
