# sql-escape-string [![build status](https://secure.travis-ci.org/thlorenz/sql-escape-string.svg?branch=master)](http://travis-ci.org/thlorenz/sql-escape-string)

Simple SQL string escape.

```js
const escapeString = require('sql-string-escape')
const sqlString = 'Sup\ter'
console.log(escapeString(sqlString)) // => Sup\\ter
```


## Installation

    npm install sql-escape-string

## Note

Implementation lifted from [sqlstring](https://github.com/mysqljs/sqlstring) with some
adaptations.

- adapted method is private inside the above module so it cannot be accessed directly there
- instead you'll have to call `SqlString.escape` which does a bunch of checks to support
  passing `Array`s, `Object`s, etc.
- here it is exposed directly and thus changed as follows:
  - passing `null` or `undefined` throws
  - the passed string is not wrapped in quotes, instead only characters inside it are escaped,
    however if you need that to happen I recommend using [full featured
    escaping](https://github.com/mysqljs/sqlstring#escaping-query-values) provided by
    `sqlstring`.

## [API](https://thlorenz.github.io/sql-escape-string)


## License

MIT
