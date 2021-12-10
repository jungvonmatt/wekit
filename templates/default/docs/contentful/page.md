| Name          | ID          | Type   | Required | Localized | Validations                                           | Help text |
| ------------- | ----------- | ------ | -------- | --------- | ----------------------------------------------------- | --------- |
| Internal name | name        | Symbol | ✓        |           |                                                       |           |
| Page title    | title       | Symbol | ✓        | ✓         |                                                       |           |
| Parent page   | parent_page | Link   |          |           | **Allowed content types:** `page`.                    |           |
| Slug          | slug        | Symbol | ✓        | ✓         |                                                       |           |
| Teaser        | teaser      | Link   |          |           | **Allowed content types:** `c-teaser`.                |           |
| SEO metadata  | seo         | Link   |          |           | **Allowed content types:** `seo`.                     |           |
| Content       | content     | Link   | ✓        |           | **Allowed content types:** `t-article`, `t-default`.  |           |