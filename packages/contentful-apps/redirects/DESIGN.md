# Contentful redirects app design

## Context and scope

The topic "Redirects" has kept us busy during our last projects. Since many of our projects are based on the Hugo+Contentful+Netlify stack that our product "WEKit" offers, we decided to build a Contentful app that uses Hugo's engine to serve redirects in Netlify's required format. The scope of this app is initially limited to a pure Netlify connection with little room for customization. However, extensions such as a configuration with Vercel+Next.js have already been discussed and noted. Other possible features are listed at the end of this document. It has even been considered to make the finished app available in the Contentful Marketplace later.

## Goals and non-goals

Our main goal is to create a simple and intuitive way to maintain redirects. With this, we want to become more productive in creating and maintaining redirects in the future. Since the app will be integrated with Contentful, it should also have the same look and feel. To accomplish this, we are using the design system from Contentful itself called "Forma 36". We don't want to give too much flexibility to the editors to keep the error-proneness as low as possible.

## Basic concept

All redirect data is stored in a JSON field in Contentful. By installing and enabling the redirects app, this JSON field is transformed into a well-organized table with several buttons and functionalities. The editor will now have the ability to edit the JSON content by interacting with a user interface. This means that every action the editor takes will transform the original JSON under the hood. With this mechanism, we can provide a smooth user experience even for non-technical people who may not be familiar with the syntax of the JSON format. At the same time, we can perform important technical tasks like validating, filtering, and sorting the data.

### View of the table

* Initially, the editor sees a table of all existing redirects (if there are any), along with a single button labeled "Add entry" at the top.
* The table shows five columns: `from`, `to`, `status`, `date` and `action` (edit/delete).
* The `date` column shows the date on which the specific redirect entry was submitted. It is useful for sorting. By default, the entire table is sorted by the most recent date.
* The `action` column contains two buttons, `edit` and `delete`.

### User flow

* Clicking the `add` button opens a modal window showing a small form with three fields:
  1. `from` - a text input field
  2. `to` - a text input field
  3. `status` - a radio button group
* After filling in the fields completely, the editor can `submit` the form or `cancel` the whole process.
  * Both actions automatically close the modal dialog.
* Clicking the `edit` button in the action column opens the modal window again. This way the form fields are automatically filled with the appropriate redirect data.
  * Clicking the `save` button will update the entry.
* Clicking the `delete` button in the action column opens another modal dialog to confirm the removal.

## Technical guidelines

### Input validations

* The input for the `from` and `to` fields must be a valid URL.
* The input for the `from` field must also be a unique value.
* The input for the `status` field is a predefined select field with valid HTTP status codes.

### Sorting algorithm

To work properly, redirects must be sorted in a special way. The first rule that matches will be executed. So it's important that the most specific rules are listed before the less specific rules. The least specific rules are lexical wildcards. To achieve this, after each change to the list, a custom sorting algorithm will bring the entries into the correct order.

Example:
```
/career/jobs/design/junior-uxd      /jobs/junior-uxd
/career/jobs/design/senior-uxd      /jobs/senior-uxd
/career/jobs/design                 /jobs/design
/career/jobs                        /jobs
/career/jobs/design/*               /jobs/design
/career/jobs/*                      /jobs
/career/*                           /jobs
```

### Elements model

Element types and output format example:

#### Fields

- Input: `from`: string*
- Input: `to`: string*
- Input: `status`: select*: number:
  - 200 - OK (Default)
  - 301 - Moved Permanently
  - 302 - Found
  - 404 - Not Found
  - 410 - Gone
- Button: `submit`: string*
- Button: `cancel`: string*
- JSON Object: `table`: json*

#### Output JSON

```json
[
  {
    "from": "/career/jobs/design",
    "to": "/jobs/design",
    "status": 301,
    "date": 1678299089769
  }
]
```

## Additional possible features

Some ideas for further development of the app:

- Sort by - Clicking on the column headers will sort the data based on the value.
- Search - Use the search field at the top of the table to filter for specific matches.
- Paginate - Organize entries into pages
- Show items per page - Choose how many items to display per page.
- Bulk Delete - Check boxes on each row to allow the user to select multiple entries and delete them all at the same time
- Mass upload - Add multiple redirects at once
- Configurable fields - e.g. the Status Codes radio group can be customized to your needs
- Presets - Predefined configurations for providers other than Netlify can be used
- More tests
- Checkboxes per row and single action buttons
- Add comments feature to table

## TODO

-  fix README accordingly to https://github.com/jungvonmatt/contentful-apps/tree/main/packages/enhanced-preview also 
@tharders tharders
I am not sure if it makes sense to have this document in here as it is.
Maybe we should transform it into something like a ToDo List or a Roadmap?
So only the open tasks or possible improvements would be listed.
The objective can be moved to the readme.
Parts from the document could also be transferred to a document that describes how the app should be used and what it produces.
We should talk about that.

- @tharders
From is normally a path and not a full URL.
The regex "URL" Pattern actually tests for a path.
So it should be named accordingly.
The "to" on the other hand should normally allow full URLs, in order to allow a redirect to another domain.
That should be checked with another regular expression.
You can still use one FormControl Field for both cases when you provide the validation function.
The result of the function can be the error message or undefined. This way you can also have different error messages. (IN PROGRESS)


- @tharders
We should discuss this logic, maybe together with Holger.
Netlify also supports placeholders which should come after the links without placeholders.
All other redirects are simply sorted at the start, which will be a mess for long lists.
I would prefer to have a list generally ordered by path or a possibility for the user to change the order (in that case the user would be responsible to place the wildcard matches after the static paths).
Letting the user do the order would also help with using this app for other deployment platforms, since the * only at the end is kind of netlify specific.
When we sort the rows, we need to ensure that the order makes sense for the target platform, which is problematic. But this kind of "random" sorting will be confusing I think.
