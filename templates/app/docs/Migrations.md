# Migrations

We use the [JvM Contentful Migrations](https://github.com/jungvonmatt/contentful-migrations) package,
which offers additional functionality on top of the existing migration functionality of the
[Contentful CLI](https://github.com/contentful/contentful-cli). It makes it easy and safe to deploy
changes to your content model in a way that can be reviewed and tested before being deployed to
production. See the [official documentation](https://github.com/contentful/contentful-migration)
for more information.

## Requirements

To make changes in Contentful the **CONTENTFUL_MANAGEMENT_TOKEN** is needed. Please generate and
add it to your `.env` file.

It is highly recommended that you develop and test your migrations in a separate environment before
executing them on production content. You can easily create one by running the following script.

```
npx migrations environment <ticket-id> --create
```

Please replace `<ticket-id>` with the related ticket id. This helps to keep track
of multiple migrations from different devs.

You can reset your environment at any time and pull the current state from master.

```
npx migrations environment <ticket-id> --reset
```

After your local test the environment should be removed again, because the number of
environments is limited.

```
npx migrations environment <ticket-id> --remove
```

## Examples

### Create a new content type

(1) Go to the web app and create a new content type in your environment.

(2) Generate a migration script for the content type.

```
npx migrations fetch -c <content-type> -e <ticket-id>
```

(3) Reset your environment.

```
npx migrations environment <ticket-id> --reset
```

(4) Run all new migrations.

```
npx migrations migrate -e <ticket-id>
```

(5) Remove your environment.

```
npx migrations environment <ticket-id> --remove
```

### Edit an existing content type

(0) Changing existing content types is a manual process. However, it is recommended to have a look at
the web app beforehand, e.g. to find out the field ids. Additionally, it may be helpful to look at
the previous migration scripts, especially the corresponding create script. And you can find many
[examples in the Contentful repo](https://github.com/contentful/contentful-migration/tree/master/examples),
which you could use as a starting point.

(1) Generate a new blank migration.

```
npx migrations generate
```

(2) Change the filename except the timestamp, e.g. `1635328936866-remove-headline-from-m-text.js`
and add your migration code. See (0) for examples.

(3) Reset your environment.

```
npx migrations environment <ticket-id> --reset
```

(4) Run all new migrations.

```
npx migrations migrate -e <ticket-id>
```

(5) Remove your environment.

```
npx migrations environment <ticket-id> --remove
```
