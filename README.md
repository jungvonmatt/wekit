# WEKit

This is a Jamstack kit helping you build secure ([Mozilla Observatory: A+ score](https://observatory.mozilla.org/analyze/wekit-demo.netlify.app)), fast ([Lighthouse: 100 scores](https://googlechrome.github.io/lighthouse/viewer/?gist=0bcb28ac8eaf3b84677a25462940d0cc)), multilingual and highly maintainable sites with **Contentful** ([Compose ready](https://www.contentful.com/marketplace/contentful-app/compose/)) and **Hugo**.


**Hugo Modules**
- [`hugo-modules/core`](./hugo-modules/core#readme) contains [Hugo](https://gohugo.io/) templates and utilities that support [Contentful](https://www.contentful.com/) and/or [Storybook](https://storybook.js.org/) projects.

**Packages**
- [`packages/create-wekit-app`](./packages/create-wekit-app#readme) contains a CLI tool to scaffold your WEKit app.
- [`packages/contentful-migrations`](./packages/contentful-migrations) contains migration files for content models used in your app.
- [`packages/contentful-apps`](./packages/contentful-apps) contains ui extensions / apps used in your app

**App Templates**
- [`templates/app`](./templates/app#readme) combines everything and shows a production-ready example.
- [`templates/theme-default`](./templates/theme-default#readme) contains all components, modules and templates.



## Getting started

The easiest way to kickstart a new WEKit project using contentful and hugo is by using `@jungvonmatt/create-wekit-app`.
This CLI tool enables you to quickly setup a new WEKit application, with everything set up for you.
To get started, use the following command:

```bash
npx @jungvonmatt/create-wekit-app@latest
```
