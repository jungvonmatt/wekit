# Storybook

> Storybook is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.

## Requirements

Make sure these dependencies are installed in your **package.json**

```
@storybook/addon-a11y
@storybook/addon-controls
@storybook/addon-docs
@storybook/addon-viewport
@storybook/builder-webpack5
@storybook/html
@storybook/manager-webpack5
copy-webpack-plugin
generate-template-files
npm-run-all
prettier
ts-dedent
```

Make sure these scripts are available in your **package.json**

```json
"storybook:build": "hugo --gc --environment storybook --watch",
"storybook:run": "start-storybook -p 6006 -c themes/storybook/.storybook",
"prestorybook": "run-s clean cf:docs",
"storybook": "run-p storybook:build storybook:run",
"prebuild-storybook": "npm run clean && hugo --gc --environment storybook",
"build-storybook": "build-storybook",
```

Ignore Storybook files in your global Hugo config

```toml
ignoreFiles = [ "storybook" ]
```

Update the **.gitignore**

```
storybook-static
build-storybook.log
```

Update your **netlify.toml**

```toml
[context.storybook]
  publish = "storybook-static"
  NPM_FLAGS = "--production false"
  command = "npm run build-storybook"
```

## Get started

### Basics

Install dependencies:

```bash
npm install
```

Build development files with live reloading and injection:

```bash
npm run storybook
```

Build production files:

```bash
npm run storybook-build
```

### Create stories by script

Run `npm run create-story` and choose *Story Bundle*, *Story Single* or *Docs*.

**Story Bundle**

Creates a bundle of story docs and a single story with a related variation.

```
./
└── content/storybook/pages/stories/<contentType>/
│   └── <variation>/
│   │   └── index.md
│   └── _index.md
└── data/storybook/<contentType>/<variation>.yaml
```

> Info: `index.md` is a regular page and `_index.md` is the content page for the list type of pages, i.e. pages that has children - home page, section page, taxonomy lists and taxonomy terms.

**Story Single**

Creates a single story with a related variation.

```
./
└── content/storybook/pages/stories/<contentType>/<variation>/index.md
└── data/storybook/<contentType>/<variation>.yaml
```

**Docs**

Creates a regular docs page.

```
./content/storybook/pages/docs/<title>/_index.md
```
