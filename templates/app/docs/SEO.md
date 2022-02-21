# SEO

WEKit provides sensible SEO settings by default.
Based on the pages' Front Matter and the project settings the following meta tags will be generated automatically without you need to do anything:

- title tag
- description tag
- hreflang tags
- robots tag  *(`noindex, nofollow` for development builds. Based on your settings made in contentful when `HUGO_ENV` is set to `production`)*
- OpenGraph tags
- Twitter tags
- JSON+LD

Hugo also generates robots.txt & sitemap.xml files.

## Customization

You can add a partial in `layouts/partials/utils/seo/data.html` to overwrite some SEO Data with project's own.
See https://github.com/theNewDynamic/hugo-module-tnd-seo/blob/main/README.md#example for an example.

