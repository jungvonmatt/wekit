# Netlify

## Initial setup

Create a new netlify project on https://app.netlify.com/start. After selecting the repository you should add the environment variables needed to fetch data from your Contentful space:

```
CONTENTFUL_SPACE_ID = 'CONTENTFUL-SPACE-ID'
CONTENTFUL_DELIVERY_TOKEN = '<contentful-delivery-token>'
CONTENTFUL_PREVIEW_TOKEN = '<contentful-preview-token>'
```

Take a look at your `.env` file or visit https://app.contentful.com/spaces/CONTENTFUL-SPACE-ID/api/keys

The easiest way to get everything upn and running is by placing a `netlify.toml` configuration file in the root directory of your project.

*netlify.toml*
```toml
[[plugins]]
package = "./tools/netlify-plugin-env-build-overwrites"

  [plugins.inputs]
  variable = "STORYBOOK"

    [plugins.inputs.overwrites]
    publish = "storybook-static"
    command = "npm run build-storybook"

[build]
base = ""
publish = "public"

  [build.environment]
  HUGO_VERSION = "0.91.0"
  GO_VERSION = "1.17"

[context.production]
command = "npm run build -- -b $URL"

[context.deploy-preview]
command = "npm run build -- -b $DEPLOY_PRIME_URL"

[context.branch-deploy]
command = "npm run build -- -b $DEPLOY_PRIME_URL"
```

The build plugin [netlify-plugin-env-build-overwrites](https://www.npmjs.com/package/netlify-plugin-env-build-overwrites) enables you to add another netlify project for Storybook. The only thing you need to do is to add the environment variable `STORYBOOK: true` to your netlify build config.



More resources:
- [https://docs.netlify.com/configure-builds/common-configurations/hugo/](https://docs.netlify.com/configure-builds/common-configurations/hugo/)
- [https://gohugo.io/hosting-and-deployment/hosting-on-netlify/](https://gohugo.io/hosting-and-deployment/hosting-on-netlify/)
