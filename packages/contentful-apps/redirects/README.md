# WEKit redirects app

## Objective
Have a field on Contentful which allows us to add/edit redirects.

## Concept

### Base idea

* The values for a new redirect can be filled out and added to the json object by clicking the submit button.
* Inputs for the `from` and `to` fields must be a valid URL.
* The input for the `from` field also has to be a unique value.
* The input for the `status` field is predefined select field with valid HTTP status codes.
* The table shows five columns `from`, `to`, `status`, `date` and `action` (edit/delete).
* The `date` column shows the submit date of the specific redirect. It is useful for sorting. The default sorting of the whole table is by the latest date.
* In the `action` column two buttons `edit` and `remove` are placed.
* By clicking the `edit` button, the above form fields will be filled out automatically with the specific redirects data. The `from` field will be disabled (greyed out), since it's a unique field and not necessary to edit. (If a user wants to change the `from` value, he should add a new entry). Also the submit button label will change to something like `Save changes`. On save, the date field should be updated.
* By clicking on `delete` button a dialog would present to confirm the removal.

Additionally, existing entries can be edited by clicking the corresponding row in the table below.

**Input fields:**
- Input: `from`: string*
- Input: `to`: string*
- Input: `status`: select*: number:
  - 200 - OK (Default)
  - 301 - Moved Permanently
  - 302 - Found
  - 404 - Not Found
  - 410 - Gone
- Button: `submit`: string*
- Button: `save changes`: string* (only on edit mode)
- JSON Object: `table`: json*

**Output JSON:**
```json
[
  {
    "from": "/de/unternehmen/salesforce-by-salesfive/",
    "to": "/de/leistungen/",
    "status": 301,
    "date": 1678299089769
  }
]
```

### Possible features
- Sort by column/type
- Search/Filter
- Pagination
- Show entries per page
- Bulk upload (add many redirects at once)

- Form as a Modal (just show table at first)
- Status code could be a separete contentful field and be handled by the editor

### Resources

- https://codesandbox.io/examples/package/react-json-table
- https://codesandbox.io/s/test-react-json-to-table-p4u74i



### Missing

- field validations
- Dialogs
- unit test
- add loading

### Holger Feature Request

- Netlify lexical Wildcard *
