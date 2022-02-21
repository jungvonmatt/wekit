{{/*
  Prepare params from argtype with a control type so we can build an array with all combinations

  Boolean: { key: key, options: [true, false] }
  String: { key: key, options: ["", "${key}"] } // Either empty string (omit) or any string used as variable
  List of options: { key: key, options: options }
 */}}
{{- define "partials/template-params" -}}
  {{- $templateParams := slice }}
  {{- range $key, $value := .argtypes -}}
    {{- $param := dict -}}
    {{- with index $value "control" "type" -}}
      {{- $typename := cond (partial "utils/reflect/is-string" .) . (index $value "type" "name") -}}
      {{- if or (eq $typename "Boolean") (eq $typename "boolean") (eq $typename "bool")  -}}
        {{- $param = (dict "key" $key "options" (slice true false) "type" "bool") -}}
      {{- else -}}
        {{ with (index $value "options") }}
          {{- $param = (dict "key" $key "options" .  "type" "array") }}
        {{- else -}}
          {{/* Comment out to limit the amount of combinations */}}
          {{- $param = (dict "key" $key "options" (slice "" (printf "${%s}" $key)) "type" "string" ) }}
        {{- end -}}
      {{- end -}}
    {{- end -}}
    {{- with $param -}}
      {{- with index $value "defaultValue" -}}
        {{- $param = $param | merge (dict "defaultValue" .) -}}
      {{- end -}}
      {{- $templateParams = $templateParams | append $param }}
    {{- end -}}
  {{- end -}}
  {{ return $templateParams }}
{{- end -}}


{{/*
  Build a list of all possible combinations.
  Maybe we should limit this as it can get really big when a lot of keys/options are available.

  Example
  Input:  [
    { key: 'a', options: [true, false]},
    { key: 'b', options: [true, false]}
  ]

  Return: [
    { a: true, b: true }
    { a: true, b: false }
    { a: false, b: true }
    { a: false, b: false }
  ]
 */}}
{{ define "partials/combinations" }}
  {{ $list := .list | default slice }}
  {{ $n := .n | default 0 }}
  {{ $current := .current | default slice }}
  {{ $result := slice }}

  {{ if eq $n (len $list) }}
    {{ $tmp := dict }}
    {{ range $current }}
      {{ $tmp = $tmp | merge . }}
    {{ end }}
    {{ $result = $result | append $tmp }}
  {{ else }}
    {{ $current_item := (index $list $n) | default dict }}
    {{ with index $current_item "options" }}
      {{ range . }}
        {{ $current_param := ($current | append (dict (index $current_item "key") . )) }}
        {{ $part := partial "combinations" (dict
          "list" $list
          "n" (add $n 1)
          "current" $current_param
        ) }}
        {{ $result = $result | append  $part }}
      {{ end }}
    {{ end }}
  {{ end }}

  {{ return $result }}
{{ end }}

{{- define "main" -}}
{{- $parts := split .Page.SectionsPath "/" -}}
{{- $params := .Params }}
{{- $partials := $params.partials | default slice }}
{{- $argtypes_manual := $params.argtypes | default dict }}
{{- $content_type := index (last 1 $parts) 0 -}}
{{- $category := partial "utils/get-category-name" (dict "content_type" $content_type) -}}
{{- $path := print $category "/" $content_type "/Examples"  -}}

{{/* Try to load generated argtypes from data/contentful/argtypes/<content-type>.json */}}
{{- $argtypes := dict -}}
{{- with index site.Data "contentful" }}
  {{- with index  . "argtypes" -}}
    {{- with index  .  $content_type -}}
      {{ $argtypes = . }}
    {{- end -}}
  {{- end -}}
{{- end -}}

{{/* Use manually specified argtypes if available */}}
{{- with $argtypes_manual -}}
  {{/* {{- $argtypes = merge $argtypes (dict $key $value)}} */}}
  {{- $argtypes = . -}}
{{- end -}}

{{- $templateParams := partial "template-params" (dict "argtypes" $argtypes)  }}
{{- $combinations := partial "combinations" (dict "list" $templateParams) }}

{{ $params := merge site.Params (dict
  "environment" (or (getenv "HUGO_ENVIRONMENT") hugo.Environment)
) }}
{{- $js := resources.Get "js/main.js" | js.Build (dict
  "format" "esm"
  "target" "es2019"
  "params" $params
) -}}
{{- with $js -}}
  {{- with .Permalink -}}
    import '@public{{ . }}';
  {{- end -}}
{{- end -}}

{{/* console.log({{ $argtypes | jsonify (dict "prefix" "  " "indent" "  ") }})
console.log({{ $templateParams | jsonify (dict "prefix" "  " "indent" "  ") }})
console.log({{ $combinations | jsonify (dict "prefix" "  " "indent" "  ") }}) */}}

export default {
  title: '{{- $path -}}',
  parameters: {
    viewMode: 'canvas',
  },
  argTypes: {{ $argtypes | jsonify (dict "prefix" "  " "indent" "  ") }},
};

{{/* Build a slice of all variables with a control type so we can render the Template function params */}}
{{ $jsVariables := slice }}
{{- range $key, $value := $argtypes }}
  {{- with index $value "control" "type" -}}
  {{- $jsVariables = $jsVariables | append $key -}}
  {{- end -}}
{{- end -}}

{{/* Build a key-value map for the variables with control type to pass as story args */}}
{{- $jsParams := dict -}}
{{- range $jsVariables -}}
  {{- $key := . -}}
  {{- range $partials -}}
    {{- with partial "utils/get-data" . -}}
      {{- if ne (index . $key) nil -}}
        {{- $jsParams = merge $jsParams (dict $key (index . $key)) -}}
      {{- else -}}
        {{- $templateParam := dict -}}
        {{- range $templateParams -}}
          {{- if eq .key $key -}}
            {{- $templateParam = . -}}
          {{- end -}}
        {{- end -}}
        {{- with $templateParam -}}
          {{- if ne .defaultValue nil -}}
            {{- $jsParams = merge $jsParams (dict $key .defaultValue) -}}
          {{- else if ne .options nil -}}
            {{- $jsParams = merge $jsParams (dict $key (index .options 0)) -}}
          {{- end -}}
        {{- end -}}
      {{- end -}}
    {{- end -}}
  {{- end -}}
{{- end -}}


const Template = ({{ with $jsVariables }}{ {{ delimit $jsVariables ", " }} } {{ end }}) => {
{{- range $combinations -}}
  {{- $options := . -}}
  {{- range $templateParams -}}
    {{- if eq .type "string" -}}
      {{- $options = merge $options (dict .key (printf "${%s}" .key)) -}}
    {{- end -}}
  {{- end -}}
  {{- $condition := slice true -}}

  {{- range $key, $value := . -}}
    {{/* Compare Boolean(var) with value as value can only be true|false and var can also be empty || undefined */}}
    {{- if eq (printf "%#T" $value) "bool" -}}
      {{- $condition = $condition | append (print "Boolean(" $key ") === " ($value | jsonify)) -}}

    {{/* Value can be "" or "${query}" so the variable content doesn't matter as long as it is set so we first check empty and then ${...} */}}
    {{- else if and (eq (printf "%#T" $value) "string") (eq $value "") -}}
      {{- $condition = $condition | append (print "Boolean(" $key ") === false") -}}
    {{- else if and (eq (printf "%#T" $value) "string") (eq $value (printf "${%s}" $key)) -}}
      {{- $condition = $condition | append (print "Boolean(" $key ") === true") -}}

    {{/* Lists with predefined options must match the option with strict equality*/}}
    {{- else -}}
      {{- $condition = $condition | append (print $key " === " ($value | jsonify)) -}}
    {{- end -}}
  {{- end }}

if ({{ delimit $condition " && " }}) {
  return `{{- range $partials -}}
{{- partial "utils/get-partial" (dict
  "context" .
  "globals" $
  "options" $options
) -}}{{ with partial "utils/svg/sprite" $ }}
  {{ . }}
{{ end }}
{{- end -}}`;
}
{{- end }}
 return `{{- range $partials -}}
{{- partial "utils/get-partial" (dict
  "context" .
  "globals" $
) -}}{{ with partial "utils/svg/sprite" $ }}
  {{ . }}
{{ end }}
{{- end -}}`;
};

{{ $variant := replace (.File.ContentBaseName | title) "-" "" -}}
export const {{ $variant }} = Template.bind({});
{{ $variant }}.args = {{$jsParams  | jsonify (dict "prefix" "  " "indent" "  ") -}};
{{- end -}}
