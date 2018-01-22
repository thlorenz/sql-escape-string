'use strict'

const test = require('tape')
const escapeString = require('../')

test('\nescapeString: valid values backslash supported', function(t) {
  [ [ 'NOW()', "'NOW()'" ]
  , [ 'Super', "'Super'" ]
  , [ 'Sup\0er', "'Sup\\0er'" ]
  , [ 'Super\0', "'Super\\0'" ]
  , [ 'Sup\ber', "'Sup\\ber'" ]
  , [ 'Super\b', "'Super\\b'" ]
  , [ 'Sup\ner', "'Sup\\ner'" ]
  , [ 'Super\n', "'Super\\n'" ]
  , [ 'Sup\rer', "'Sup\\rer'" ]
  , [ 'Super\r', "'Super\\r'" ]
  , [ 'Sup\ter', "'Sup\\ter'" ]
  , [ 'Super\t', "'Super\\t'" ]
  , [ 'Sup\\er', "'Sup\\\\er'" ]
  , [ 'Super\\', "'Super\\\\'" ]
  , [ 'Sup\u001aer', "'Sup\\Zer'" ]
  , [ 'Super\u001a', "'Super\\Z'" ]
  , [ 'Sup\'er', "'Sup\\'er'" ]
  , [ 'Super\'', "'Super\\''" ]
  // eslint-disable-next-line no-useless-escape
  , [ 'Sup"er', "'Sup\\\"er'" ]
  // eslint-disable-next-line no-useless-escape
  , [ 'Super"', "'Super\\\"'" ]

  ].forEach(function check(xs) {
    const s = xs[0]
    const escaped = xs[1]
    const msg = 'escapes: "' + s + '" to "' + escaped + '"'
    const res = escapeString(s, { backslashSupported: true })
    t.equal(res, escaped, msg)
  })

  t.end()
})

test('\nescapeString: valid values backslash not supported', function(t) {
  [ [ 'NOW()', "'NOW()'" ]
  , [ 'Super', "'Super'" ]
  , [ 'Sup\0er', "'Sup\0er'" ]
  , [ 'Super\0', "'Super\0'" ]
  , [ 'Sup\ber', "'Sup\ber'" ]
  , [ 'Super\b', "'Super\b'" ]
  , [ 'Sup\ner', "'Sup\ner'" ]
  , [ 'Super\n', "'Super\n'" ]
  , [ 'Sup\rer', "'Sup\rer'" ]
  , [ 'Super\r', "'Super\r'" ]
  , [ 'Sup\ter', "'Sup\ter'" ]
  , [ 'Super\t', "'Super\t'" ]
  , [ 'Sup\\er', "'Sup\\er'" ]
  , [ 'Super\\', "'Super\\'" ]
  , [ 'Sup\u001aer', "'Sup\u001aer'" ]
  , [ 'Super\u001a', "'Super\u001a'" ]
  , [ 'Sup\'er', "'Sup''er'" ]
  , [ 'Super\'', "'Super'''" ]
  // eslint-disable-next-line no-useless-escape
  , [ 'Sup"er', "'Sup\"\"er'" ]
  // eslint-disable-next-line no-useless-escape
  , [ 'Super"', "'Super\"\"'" ]

  ].forEach(function check(xs) {
    const s = xs[0]
    const escaped = xs[1]
    const msg = 'escapes: "' + s + '" to "' + escaped + '"'
    const res = escapeString(s, { backslashSupported: false })
    t.equal(res, escaped, msg)
  })

  t.end()
})

test('\nescapeString: invalid values', function(t) {
  [ undefined
  , null
  ].forEach(function check(s) {
    const msg = 'escaping "' + s + ' throws'
    t.throws(escapeString.bind(null, s), msg)
  })

  t.end()
})
