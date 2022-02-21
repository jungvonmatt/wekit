# WEKit core

[Hugo](https://gohugo.io/) templates and utilities that support [Contentful](https://www.contentful.com/) and/or [Storybook](https://storybook.js.org/) projects.

- [wekit-core](#wekit-core)
  - [Utils](#utils)
    - [asset](#asset)
    - [svg/icon](#svgicon)
    - [svg/sprite](#svgsprite)
    - [console/dump](#consoledump)
    - [console/error](#consoleerror)
    - [console/warn](#consolewarn)
    - [dump](#dump)
    - [get-category-name](#get-category-name)
    - [get-data](#get-data)
    - [get-page](#get-page)
    - [get-params](#get-params)
    - [get-partial](#get-partial)
    - [get-settings](#get-settings)
    - [html/tag](#htmltag)
    - [html/attribute](#htmlattribute)
    - [seo/tags](#seotags)
    - [seo/data](#seodata)
    - [link](#link)
    - [not-found](#not-found)
    - [reflect/is-string](#reflectis-string)
    - [rich-text/rich-text](#rich-textrich-text)
  - [Layouts](#layouts)
    - [storybook](#storybook)
    - [robots.txt](#robotstxt)
  - [Credits](#credits)

## Utils

### asset

Render Contentful asset. Uses data from [cssg-plugin-assets](https://github.com/jungvonmatt/contentful-ssg/tree/main/packages/cssg-plugin-assets) if available.
Uses `svg/icon` when the inline options is set and we got an svg, 
*Template*

```
{{ partial "utils/asset" (dict
  "globals" $globals
  "context" $image
  "options" (dict
    "sizes" "(max-width: 768px) 100vw, 768px"
  )
) }}
```

### svg/icon

Render svg icon from local file or contentful asset

*Template*

```
{{ partial "utils/svg/icon" (dict
  "globals" $globals
  "context" $svg (contentful asset or path relative to assets)
  "options" (dict
    "inline" true
    "sprite" false
    "class_name" "c-icon"
    "width" 16
    "height" 16
  )
) }}
```


### svg/sprite

Render svg icon sprite with all icons rendered by utils/svg/icon using "sprite" true

*Template*

```
{{ partial "utils/svg/sprite" $ }}
```

### console/dump

Emits a warning message with information on variables.

*Template*

```
{{ partial "utils/console/dump" $message }}
```

### console/error

Emits an error message.

*Template*

```
{{ partial "utils/console/error" $message }}
```

### console/warn

Emits a warning message.

*Template*

```
{{ partial "utils/console/warn" $message }}
```

### dump

Dump variable as highlighted yaml.

*Template*

```
{{ partial "utils/dump" .context }}
```

### get-category-name

Get category name by prefix of `content_type`.

*Template*

```
{{ partial "utils/get-category-name" (dict "content_type" $content_type) }}
```

### get-data

Get data from Contentful data types.

*Template*

```
{{ partial "utils/get-data" (dict
  "globals" $globals
  "context" (dict
    "id" "ENTRY_ID"
    "content_type"
    "CONTENT_TYPE_ID"
  )
) }}
```

### get-page

Get linked page document for `content_type` and `id`. Get data from Contentful data types.

*Template*

```
{{ partial "utils/get-page" (dict
  "id" "ENTRY_ID"
  "content_type" "CONTENT_TYPE_ID"
) }}
```

### get-params

Get params from linked page.

*Template*

```
{{ partial "utils/get-params" (dict
  "id" "ENTRY_ID"
  "content_type" "CONTENT_TYPE_ID"
) }}
```

### get-partial

Calls partial connected with linked content type with .Params from from linked page. Get params from linked page.

*Template*

```
{{ partial "utils/get-partial" (dict
  "globals" $globals
  "context" (dict
    "id" "ENTRY_ID"
    "content_type" "CONTENT_TYPE_ID"
  )
  "options" (dict "key" "param overwrite")
) }}
```

### get-settings

Get Contentful settings (`d-settings`).

*Template*

```
{{ partial "utils/get-settings" }}
```

### html/tag

Render HTML tag.

*Template*

```
{{- with partial "utils/html/tag" (dict "name" "a" "inner" "Link Text" "attr" (dict "href" "..." )) -}}
  {{- . | safeHTML -}}
{{- end -}}
```

*Output*

```
<a href="...">Link Text</a>
```

### html/attribute

Render HTML attributes.

*Template*

```
{{ $attr := partialCached "utils/html/attribute" (dict
  "key" "value"
  "data" (dict "index" 2)
  "disabled" true
) }}
```

*Output*

```
key="value" data-index="2" disabled
```

### seo/tags

Render SEO attributes used in HEAD. (title,description,canonical,hreflang,twitter:...,og:...,jsonld,robots

*Template*

```
{{ partial "utils/seo/tags" $ }}
```

*Output*

```
<title>Karate Kit</title>
<meta content="Karate Kit" property="og:title">
<meta content="Karate Kit" name="twitter:title">
<meta content="Home" name="description">
<meta content="Home" property="og:description">
<meta content="Home" name="twitter:description">
<meta content="https://deploy-preview-278--karate-kit-dojo.netlify.app/en/" property="og:url">
<meta content="https://deploy-preview-278--karate-kit-dojo.netlify.app/en/" name="twitter:url">
<meta content="Karate Kit" property="og:site_name">
<meta content="en" property="og:locale">
<link href="https://deploy-preview-278--karate-kit-dojo.netlify.app/de/" hreflang="de" rel="alternate">
<meta content="de" property="og:locale:alternate">
<meta content="website" property="og:type">
<meta content="2021-05-19T20:18:57+00:00" property="og:published_time">
<meta content="2021-08-13T12:50:12+00:00" property="og:updated_time">
<meta content="summary" name="twitter:card">
<meta content="https://deploy-preview-278--karate-kit-dojo.netlify.app/en/" name="canonical">
<meta content="index, follow" name="robots">
<meta content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" name="googlebot">
<meta content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" name="bingbot">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"website","dateModified":"2021-08-13T12:50:12+00:00","datePublished":"2021-05-19T20:18:57+00:00","description":"Home","headline":"Karate Kit","image":null,"url":"https://deploy-preview-278--karate-kit-dojo.netlify.app/en/"}</script>
```

### seo/data

Add/Edit SEO Scratch Object

The user does not load the partial, as the component will.
This allows to overwrite some SEO Data with project's own.
Project's partial should live under `layouts/partials/utils/seo/data.html`

### link

Get link attributes from context.

*Template*

```
{{ partial "utils/link" .context }}
```

### not-found

Render a not-found warning.

*Template*

```
{{ partial "utils/not-found" (dict "name" $file_path) }}
```

### reflect/is-string

Check if passed value is of type "string".

*Template*

```
{{ if partialCached "reflect/is-string" $value $value }}
  We have a string!
{{ end }}
```

### rich-text/rich-text

A rich text field in Contentful consists of nested arrays. The util loops over each node and generates the corresponding HTML depending on the nodeType. See `utils/rich-text/blocks` for supported types.

## Layouts

### storybook

A set of layouts that support the generation of Storybook files.

*Example output*

```
./public/
└── stories/<contentType>/
    └── <variation>/
    │   └── canvas.stories.js
    └── docs.stories.mdx
```

### robots.txt

Generate a customized robots.txt.

*Template*

```
User-agent: *
{{ if eq (hugo.Environment) "production" -}}
Allow: /
{{ else -}}
Disallow: /
{{ end }}
Sitemap: {{ "sitemap.xml" | absURL -}}
```

## Contributors
<a href="https://github.com/jungvonmatt/wekit-core/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jungvonmatt/wekit-core" />
</a>


## Credits

Many thanks to [regisphilibert](https://github.com/regisphilibert) for his outstanding support in the Hugo community and the inspiring work on the Hugo framework [Huge](https://github.com/theNewDynamic/huge).
