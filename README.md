<p align="center">
  <a href="https://www.wekit.dev/">
    <img src="https://user-images.githubusercontent.com/1697800/155078072-3ef2ace8-6d9f-4d18-b180-1abeff6bab6b.svg" height="128">
  </a>
</p>

<p align="center">
  <a aria-label="Jung von Matt TECH GmbH" href="https://www.jvm.com/en/agencies/jvm-tech-hamburg/">
    <img src="https://img.shields.io/badge/MADE%20by%20Jung%20von%20Matt%20TECH-0f2319.svg?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjM2IDM5MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjxwYXRoIGQ9Ik0yMDguOTk4IDM3NS41NzNjMi43OTggNy4wODIgNy42OTUgMTEuNzkgMTMuMjgxIDExLjc5IDUuODY3IDAgMTAuOTczLTUuMTg2IDEzLjY4NC0xMi44NjRsLTI2Ljk2NSAxLjA3NHpNMjMyLjU5OCAzNTAuOTg4bC0yLjY3Ni0xMi4xNy0yMy40MS0xMDYuNDY0LTI0LjY1IDguOTE2IDMzLjAyNiA5OC4zMzRjLTIuODU4IDIuNTI2LTUuMTUzIDYuNDY0LTYuNTg4IDExLjIwNWwyNC4yOTguMTc5ek04LjI2IDM0OC44NzVjLTQuMzI0IDAtNy41NzEgOC4yODgtNy41NzEgMTguNjQyIDAgMTAuMzU4IDMuMjQ3IDE4LjY0MyA3LjU3MiAxOC42NDMgNC44NyAwIDcuNTc1LTguMjg1IDcuNTc1LTE4LjY0MyAwLTEwLjM1NC0yLjcwNS0xOC42NDItNy41NzUtMTguNjQyTTI1LjEwNCAzNTkuMjM2Yy40MzEgMi41MTIuNjYxIDUuMzI3LjY2MSA4LjMyMiAwIDMuODYtLjM3MiA3LjQzLTEuMDggMTAuNDE1aDU5LjYxOGMyLjUxMyA3LjYzNSA2Ljg1NyAxMi42OTUgMTEuODA3IDEyLjY5NSA3Ljc4MSAwIDE0LjA5LTEyLjQ4NSAxNC4wOS0yNy44ODUgMC0xNS40LTYuMzA5LTI3Ljg4NS0xNC4wOS0yNy44ODUtNS41OTIgMC0xMC40MDcgNi40Ni0xMi42ODQgMTUuOGwtNTIuOTE1IDYuNzk5IDI3LjM3MS0xMDIuNjQ1IDQ5LjQ5NS0yMi41MzggNy4zMTMgMTAyLjk0NWM1LjU2NyA0LjI5NCA5LjUyIDE0Ljk4MyA5LjUyIDI3LjUyNCAwIDUuNTYxLS43OTIgMTAuNzQ2LTIuMTQgMTUuMTloMTEuNDU4di0yNTIuNjNsMTYuMTgyIDUuOTE5IDQuMzcgMzIuMTAyYzQuOTU2LTQ3LjM1MyAxMS4wMTEtNjUuNTIyIDIzLjg1Mi04OWwyMy4yMTcgMjQuNTggMTEuODMzLTkuNTU5LTE3Ljc1Mi02OC43MzJMMjA1LjI0Mi4xN2MtNTUuMDc1IDM1Ljk2LTgxLjkzIDgyLjM4Ni0xMDEuMDQ4IDE0NC4yOTVsLTQ5LjE2MyAzMy42OTItMzcuMzkgMTcwLjcxMmguNDM4YzMuMTczIDAgNS40MDMgMy4xNCA2LjYzIDguMzg5bC4zOTUgMS45Nzh6TTIyNS41NyAxMy4xMTNzLTUuMzYzIDIuNTc3LTE2LjI4NiAxMS4yMjlsNy41NDIgMy41OTYgOC43NDQtMTQuODI1eiI+PC9wYXRoPjwvZz48L3N2Zz4=&labelColor=0f2319">
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



## Getting started

The easiest way to kickstart a new WEKit project using contentful and hugo is by using `@jungvonmatt/create-wekit-app`.
This CLI tool enables you to quickly setup a new WEKit application, with everything set up for you.
To get started, use the following command:

```bash
npx @jungvonmatt/create-wekit-app@latest
```

## Contributing

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
