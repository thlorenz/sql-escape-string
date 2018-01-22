const escapeString = require('./')
const sqlString = 'Sup\ter'
console.log(escapeString(sqlString)) // => Sup\\ter
