{{ block "main" . -}}{{- end }}

{{/*
  This is just to trigger the Hugo pipes for SCSS.
  The CSS file is picked up later by Webpack.
*/}}
{{ $css_params := .Site.Params }}
{{ $main_css := resources.Get "scss/main.scss" | resources.ExecuteAsTemplate "style.main.scss" $css_params | toCSS (dict
  "targetPath" "css/main.css"
  "outputStyle" "compressed"
) }}
{{ $main_css_permalink := $main_css.Permalink }}
