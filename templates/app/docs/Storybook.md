# Storybook

> [Storybook](https://storybook.js.org/) is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.

The WEKit Storybook implementation works out of the box with Hugo generating all stories and template files for you. All you have to do is providing the markdown files with the desired content for each component and run `npm run storybook`. This will spin up a Hugo server using the preconfigured `storybook` environment and start storybook.

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

### Create stories

To create a new story for a component you only need **2 files**.

**Story Doc**
*/content/storybook/stories/<content-type-id>/_index.md*
```md
---
type: storybook
---
```

This file is responsible for creating a docs page for your component. It will automatically include examples of your component variations including source code and Hugo template code to as well as auto-generated tables of the available template params and the contentful model.

**Story**
*/content/storybook/stories/<content-type-id>/<variation>.md*
```md
---
type: storybook
includeInDocs: true
partials:
  - id: <variation>
    content_type: <content-type-id>
    <parameters>
---
```

This file generates a specific example story based on the parameters passed to the hugo partial. The following file will render the `c-headline` component with the parameters `tag` and `text` passed as `'h1'` and `'Lorem ipsum'`
```md
---
type: storybook
includeInDocs: true
partials:
  - id: h1
    content_type: c-headline
    tag: h1
    text: Lorem ipsum
---
```

Even though it is possible to create stories this way, you should keep the parameters in a separate file in the `/data` folder to be able to reuse them in other components if necessary.

*/content/storybook/stories/c-headline/h1.md*
```md
---
type: storybook
includeInDocs: true
partials:
  - id: h1
    content_type: c-headline
---
```

*/data/storybook/c-headline/h1.yaml*
```yaml
tag: h1
text: Lorem ipsum
```

This way the partial resolver used to generate the website will be used to locate the partial data for your story.


### Auto-generate data files with random content.

You can use `npx storybook-fakes -o data/storybook -c <content-type-id>` to generate two data files with random content based on your Contentful data model.

- Adds `data/storybook/<content-type-id>/default.yaml` with all fields populated.
- Adds `data/storybook/<content-type-id>/min.yaml` with all optional fields left out.

### Create stories by script (recommended)

Run `npm run scaffold` to let all required files be created for you in a breeze including template and scss.
This script provides the following files if not already present:

- Adds `assets/scss/<category>/_<content-type-id>.scss`
- Injects `@import "<category>/<content-type-id>";` in `assets/scss/main.scss`
- Adds `layouts/partials/modules/<content-type-id>.html`
- Adds `content/storybook/stories/<content-type-id>/_index.md`
- Adds `content/storybook/stories/<content-type-id>/default.md`
- Adds `content/storybook/stories/<content-type-id>/min.md`
- Optionally adds `/data/storybook/<content-type-id>/default.yaml`
- Optionally adds `/data/storybook/<content-type-id>/min.yaml`


## Troubleshooting

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
