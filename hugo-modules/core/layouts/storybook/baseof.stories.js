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
