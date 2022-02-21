---
to: content/storybook/stories/<%= contentType %>/<%= name %>.md
unless_exists: true
---
---
type: storybook
includeInDocs: true
partials:
  - id: <%= name %>
    content_type: <%= contentType %>
---



