'use strict'

// eslint-disable-next-line no-control-regex, no-useless-escape
const CHARS_GLOBAL_REGEXP = /[\0\b\t\n\r\x1a\"\'\\]/g
const CHARS_ESCAPE_MAP = {
    '\0'   : '\\0'
  , '\b'   : '\\b'
  , '\t'   : '\\t'
  , '\n'   : '\\n'
  , '\r'   : '\\r'
  , '\x1a' : '\\Z'
  , '"'    : '\\"'
  , '\''   : '\\\''
  , '\\'   : '\\\\'
}

/**
 * Escapes the given string to protect against SQL injection attacks'
 *
 * NOTE: the string is not quoted after it is escaped, therefore either use parameterized
 * queries and/or process it further via modules like [squel](https://github.com/hiddentao/squel)
 *
 * NOTE for MYSQL users: These methods of escaping values only works when the
 * [NO_BACKSLASH_ESCAPES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_no_backslash_escapes)
 * SQL mode is disabled (which is the default state for MySQL servers)
 *
 * @param {String} val the original string to be used in a SQL query
 * @returns {String} the original string escaped and safe to use
 */
function escapeString(val) {
  if (val == null) {
    throw new Error('Need to pass a valid string')
  }
  var chunkIndex = CHARS_GLOBAL_REGEXP.lastIndex = 0
  var escapedVal = ''
  var match

  while ((match = CHARS_GLOBAL_REGEXP.exec(val))) {
    escapedVal += val.slice(chunkIndex, match.index) + CHARS_ESCAPE_MAP[match[0]]
    chunkIndex = CHARS_GLOBAL_REGEXP.lastIndex
  }

  // Nothing was escaped
  if (chunkIndex === 0) return val

  if (chunkIndex < val.length) return escapedVal + val.slice(chunkIndex)
  return escapedVal
}

module.exports = escapeString
