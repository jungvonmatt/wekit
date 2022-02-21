{{ block "main" . -}}{{- end }}

{{/*
  This is just to trigger the Hugo pipes for SCSS.
  The CSS file is picked up later by Webpack.
*/}}
{{ $main_css := resources.Get "scss/main.scss" | toCSS (dict
  "targetPath" "css/main.css"
  "outputStyle" "compressed"
) }}
{{ $main_css_permalink := $main_css.Permalink }}

{{ $params := merge site.Params (dict
  "environment" (or (getenv "HUGO_ENVIRONMENT") hugo.Environment)
) }}
{{ $js := resources.Get "js/main.js" | js.Build (dict
  "format" "esm"
  "target" "es2019"
  "params" $params
) }}
{{ $js_permalink := $js.Permalink }}
