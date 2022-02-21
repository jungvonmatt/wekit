---
type: storybook
includeInDocs: true
partials:
  - id: default
    content_type: c-headline

argtypes:
  text:
    name: "Text"
    control:
      type: "text"
  tag:
    name: "Tag"
    options:
      - h1
      - h2
      - h3
      - h4
      - h5
      - h6
    defaultValue: h1
    control:
      type: "select"

---
