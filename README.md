# sequelize-binary-uuid

This builds upon the [binary-uuid](https://github.com/odo-network/binary-uuid) package by making it easy to implement into [Sequelize](https://www.github.com/sequelize/sequelize).

This package provides a few important exports:

- A `BINARY` type (`binary(length)`).
- A `BINARYUUID` field creator.
- A `VIRTUALBINARYUUID` field creator.
- A `withBinaryUUID` preset field creator.

This package makes it easy to use `binary(16)` UUID's instead of `CHAR(36)` which is the default. It also modifies the `UUID` so that it is more performant when indexing which can lead to **significant** performance improvements over naive implementations.

## Examples

Multiple examples are available in the [examples folders](./examples).

## Using `withBinaryUUID` preset (recommended)

When utilizing the `preset`, the model will be created with an `id` field which is the `primaryKey` and is a generated `binary(16)` uuid value.

In addition, the model will have a `uuid` virtual field which is the string version of the uuid.

```javascript
import Sequelize from "sequelize";
import { withBinaryUUID } from "sequelize-binary-uuid";

const User = sql.define(
  "User",
  withBinaryUUID(
    {
      // any other fields here
      someKey: Sequelize.DataTypes.TEXT
    },
    {
      primaryID: "id", // default
      virtualID: "uuid", // default
      field: {
        // optionally provide extra parameters to the
        // `primaryID` binary field
        primaryKey: true
        // primaryKey: true is required to make it a
        // primaryKey!
      }
    }
  )
);
```

Once you have done this, you may interact with the table:

```javascript
sql
  .sync({ force: true })
  .then(() =>
    Promise.all([
      User.create({ someKey: "one" }),
      User.create({ someKey: "two" }),
      User.create({ someKey: "three" })
    ])
  )
  .then(() => User.findAll())
  .then(users => users.map(user => user.get({ plain: true })))
  .then(console.log);
```

```
[
  {
    uuid: '8cde7820-04c1-11e9-8d40-0d6e8c185c6c',
    id: <Buffer 11 e9 04 c1 8c de 78 20 8d 40 0d 6e 8c 18 5c 6c>,
    someKey: 'one',
    createdAt: 2018-12-21T01:41:35.000Z,
    updatedAt: 2018-12-21T01:41:35.000Z
  },
  {
    uuid: '8cdec640-04c1-11e9-8d40-0d6e8c185c6c',
    id: <Buffer 11 e9 04 c1 8c de c6 40 8d 40 0d 6e 8c 18 5c 6c>,
    someKey: 'two',
    createdAt: 2018-12-21T01:41:35.000Z,
    updatedAt: 2018-12-21T01:41:35.000Z
  },
  {
    uuid: '8cdec641-04c1-11e9-8d40-0d6e8c185c6c',
    id: <Buffer 11 e9 04 c1 8c de c6 41 8d 40 0d 6e 8c 18 5c 6c>,
    someKey: 'three',
    createdAt: 2018-12-21T01:41:35.000Z,
    updatedAt: 2018-12-21T01:41:35.000Z
  }
]
```

> **IMPORTANT:** It is important to note here that the `uuid` field is `VIRTUAL` - this means it is **NOT** stored in the database and is only provided as a convenience.

## Creating a Binary UUID

Using the `BINARYUUID` helper we can define a field as being a binary UUID. This will use a `binary(16)` type and will generate a uuid by default if none is provided.

```javascript
import Sequelize from "sequelize";
import { BINARYUUID } from "sequelize-binary-uuid";

const User = sql.define("User", {
  // ... your model definition ...
  binaryUUID: BINARYUUID({
    // field params here...
    allowNull: true
  })
});
```

> **NOTE:** If you set `allowNull` to `true` then a binary uuid will **not** be generated when the field is not provided. You will need to provide one yourself.

## Creating a UUID Virtual Field

Using `VIRTUALBINARYUUID` will make it easy to provide a `VIRTUAL` field which resolves to the initial string version of the uuid for the given field.

`VIRTUALBINARYUUID` expects two arguments. First, the `target` field (the binary uuid) then the `source` field (the string/virtual field).

```javascript
import Sequelize from "sequelize";
import { BINARYUUID, VIRTUALBINARYUUID } from "sequelize-binary-uuid";

const User = sql.define("User", {
  // ... your model definition ...
  binaryUUID: BINARYUUID({
    allowNull: false
  }),
  stringUUID: VIRTUALBINARYUUID("binaryUUID", "stringUUID")
});
```

## Using the `BINARY` type

If you wish to construct your own binary type and/or binary UUID values, you can follow the example below.

```javascript
import Sequelize from "sequelize";
import { BINARY, getBinaryUUID } from "sequelize-binary-uuid";

const User = sql.define("User", {
  // ... your model definition ...
  customBinaryUUID: {
    type: BINARY(16)
  }
});

// .. later

User.create({
  customBinaryUUID: getBinaryUUID()
});
```

## Helper Exports

As a convenience, this package also re-exports some helpers from [`binary-uuid`](https://www.github.com/odo-network/binary-uuid), as well as some helper functions.

```javascript
import {
  getBinaryUUID,
  fromBinaryUUID,
  toBinaryUUID
} from "sequelize-binary-uuid";

const buf = getBinaryUUID();
const uuid = fromBinaryUUID();
const buf2 = toBinaryUUID(uuid);
```
