<p align="center">
  <a href="https://www.wekit.dev/">
    <img src="https://user-images.githubusercontent.com/1697800/155078072-3ef2ace8-6d9f-4d18-b180-1abeff6bab6b.svg" height="128">
  </a>
</p>

<p align="center">
  <a aria-label="Jung von Matt TECH GmbH" href="https://www.jvm.com/en/agencies/jvm-tech-hamburg/">
    <img src="https://img.shields.io/badge/powered%20by%20Jung%20von%20Matt%20TECH-gray.svg?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjM2IDM5MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjxwYXRoIGQ9Ik0yMDguOTk4IDM3NS41NzNjMi43OTggNy4wODIgNy42OTUgMTEuNzkgMTMuMjgxIDExLjc5IDUuODY3IDAgMTAuOTczLTUuMTg2IDEzLjY4NC0xMi44NjRsLTI2Ljk2NSAxLjA3NHpNMjMyLjU5OCAzNTAuOTg4bC0yLjY3Ni0xMi4xNy0yMy40MS0xMDYuNDY0LTI0LjY1IDguOTE2IDMzLjAyNiA5OC4zMzRjLTIuODU4IDIuNTI2LTUuMTUzIDYuNDY0LTYuNTg4IDExLjIwNWwyNC4yOTguMTc5ek04LjI2IDM0OC44NzVjLTQuMzI0IDAtNy41NzEgOC4yODgtNy41NzEgMTguNjQyIDAgMTAuMzU4IDMuMjQ3IDE4LjY0MyA3LjU3MiAxOC42NDMgNC44NyAwIDcuNTc1LTguMjg1IDcuNTc1LTE4LjY0MyAwLTEwLjM1NC0yLjcwNS0xOC42NDItNy41NzUtMTguNjQyTTI1LjEwNCAzNTkuMjM2Yy40MzEgMi41MTIuNjYxIDUuMzI3LjY2MSA4LjMyMiAwIDMuODYtLjM3MiA3LjQzLTEuMDggMTAuNDE1aDU5LjYxOGMyLjUxMyA3LjYzNSA2Ljg1NyAxMi42OTUgMTEuODA3IDEyLjY5NSA3Ljc4MSAwIDE0LjA5LTEyLjQ4NSAxNC4wOS0yNy44ODUgMC0xNS40LTYuMzA5LTI3Ljg4NS0xNC4wOS0yNy44ODUtNS41OTIgMC0xMC40MDcgNi40Ni0xMi42ODQgMTUuOGwtNTIuOTE1IDYuNzk5IDI3LjM3MS0xMDIuNjQ1IDQ5LjQ5NS0yMi41MzggNy4zMTMgMTAyLjk0NWM1LjU2NyA0LjI5NCA5LjUyIDE0Ljk4MyA5LjUyIDI3LjUyNCAwIDUuNTYxLS43OTIgMTAuNzQ2LTIuMTQgMTUuMTloMTEuNDU4di0yNTIuNjNsMTYuMTgyIDUuOTE5IDQuMzcgMzIuMTAyYzQuOTU2LTQ3LjM1MyAxMS4wMTEtNjUuNTIyIDIzLjg1Mi04OWwyMy4yMTcgMjQuNTggMTEuODMzLTkuNTU5LTE3Ljc1Mi02OC43MzJMMjA1LjI0Mi4xN2MtNTUuMDc1IDM1Ljk2LTgxLjkzIDgyLjM4Ni0xMDEuMDQ4IDE0NC4yOTVsLTQ5LjE2MyAzMy42OTItMzcuMzkgMTcwLjcxMmguNDM4YzMuMTczIDAgNS40MDMgMy4xNCA2LjYzIDguMzg5bC4zOTUgMS45Nzh6TTIyNS41NyAxMy4xMTNzLTUuMzYzIDIuNTc3LTE2LjI4NiAxMS4yMjlsNy41NDIgMy41OTYgOC43NDQtMTQuODI1eiI+PC9wYXRoPjwvZz48L3N2Zz4=&labelColor=061E12">
  </a>
  <a aria-label="License" href="https://github.com/jungvonmatt/wekit/blob/main/LICENSE">
    <img alt="" src="https://img.shields.io/github/license/jungvonmatt/wekit?style=flat-square">
  </a>
</p>

## Overview

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



## Requirements

Make sure all dependencies have been installed:

- [Hugo](https://gohugo.io/) >= v0.91.0+extended
- [Go](https://golang.org/) >= v1.17
- [Node.js](https://nodejs.org/) >= v16

Set up Contentful:

- Create a new and preferably empty space.
- Go to *"Settings > API keys"* and add an API key for content delivery and preview tokens.
- Log in to your account by running `npx contentful-cli login`.

## Getting started

The easiest way to kickstart a new WEKit project using Contentful and Hugo is by using `@jungvonmatt/create-wekit-app`.
This CLI tool enables you to quickly setup a new WEKit application, with everything set up for you.
To get started, use the following command:

```bash
npx @jungvonmatt/create-wekit-app@latest
```

The script takes care of the most important settings:

- 🐹 A pre-configured Hugo setup.
- 🎨 A set of well-designed UI components, ready to test in Storybook.
- ✏️ Suitable migration scripts for Contentful.
- 🤖 The migrations can be started directly (or later) and all dependencies are installed automatically.

After that, you can try out the new app. To do so, change to the newly created directory and run
`npm run storybook`. This will start the Storybook development environment with all the UI components
you selected. You can also start the Hugo development server by running `npm start`. However,
you will only see an empty page because no entries have been created in Contentful yet.

Nice job so far. Now you can easily deploy your site to Netlify.

First, push the app to GitHub:

```
# Replace the origin with the correct URL to your repo
git remote add origin git@github.com:{ACCOUNT}/{REPO}.git`
git branch -M main
git push -u origin main
```

Create and configure a continuous deployment for a new site in Netlify:

- Log in to your account by running `npx netlify login`.
- `npx netlify init` configures a continuous deployment for a new site.
- And `npx netlify env:import .env` imports the current environment variables.

And last but not least we set up a webhook in Contentful:

- Netlify: Go to *"Site settings > Build & deploy > Build hooks"*, add a new build hook and copy it.
- Contentful: Go to *"Settings > Webhooks"*, add a new webhook and change the following settings.
  - URL: Paste the copied Netlify build hook URL
  - Triggers: Select specific triggering events
  - Content Events: Select only *Publish* and *Unpublish* for *Entry*
  - Filter: Add a new filter *Entity ID (sys.id) equals* with *deploy-to-production*

You are now ready to deploy. Open the *"Deploy to production"* content entry and click *Deploy*.
Switch to Netlify and check whether the webhook has run in. The build should now start
and after a short while... **Site is live ✨**

## Get involved

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?maxAge=31557600)](http://makeapullrequest.com)

We appreciate any help on our repositories. For more details about how to
contribute, see our [CONTRIBUTING.md](CONTRIBUTING.md)
document.

## Contributors
<a href="https://github.com/jungvonmatt/wekit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jungvonmatt/wekit" />
</a>


## You found a bug or want to propose a feature?

- File an issue here on GitHub: [![File an issue](https://img.shields.io/badge/-Create%20Issue-6cc644.svg?logo=github&maxAge=31557600)](https://github.com/jungvonmatt/wekit/issues/new)<br/> Make sure to remove any credential from your code before sharing it.

## License

This repository is published under the [MIT](LICENSE) license.
