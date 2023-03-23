# WEKit Redirects App

## Create your app definition

To create an app definition:

1. [Go to the Apps tab](https://app.contentful.com/deeplink?link=app-definition-list) under your organization settings
2. Click Create app. The "App details" page is displayed.
3. In the Name field, enter a custom name for your app. For our example app, we use Blog Post Metrics as a name.
4. In the Frontend field you can choose to either run the App locally or Hosted by Contentful
    1. To run it locally add the URL for the local running application. The default one is `http://localhost:3000`.
    2. To host it you can either upload the build folder or run the `npm run upload` to automatically upload the app. (See more below)
5. On `Locations` section select only the `Entry Editor` option
6. Click Save. Your app definition is saved.

[Read more here](https://www.contentful.com/developers/docs/extensibility/app-framework/tutorial/) 

## Available Scripts

In the project directory, you can run:

#### `npm start`

Creates or updates your app definition in Contentful, and runs the app in development mode.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

#### `npm run upload`

Uploads the build folder to contentful and creates a bundle that is automatically activated.
The command guides you through the deployment process and asks for all required arguments.
Read [here](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/#deploy-with-contentful) for more information about the deployment process.

#### `npm run upload-ci`

Similar to `npm run upload` it will upload your app to contentful and activate it. The only difference is   
that with this command all required arguments are read from the environment variables, for example when you add
the upload command to your CI pipeline.

For this command to work, the following environment variables must be set: 

- `CONTENTFUL_ORG_ID` - The ID of your organization
- `CONTENTFUL_APP_DEF_ID` - The ID of the app to which to add the bundle
- `CONTENTFUL_ACCESS_TOKEN` - A personal [access token](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/personal-access-tokens)

## Libraries used

- [Forma 36](https://f36.contentful.com/) – Contentful's design system

## Learn More

[Read more](https://www.contentful.com/developers/docs/extensibility/app-framework/create-contentful-app/) and check out the video on how to use the CLI.

Create Contentful App uses [Create React App](https://create-react-app.dev/). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) and how to further customize your app.

## Setup Redirects app

On a given content type (e.g. `d-settings`) add a new field with these parameters:
- name `redirects`
- type `JSON Object`

On the `d-settings` content model settings > Entry editors > Add the `Redirects App`

You can see the app running on Content > `d-settings` > Redirects tab
