const escapeString = require('./')
const sqlString = "Sup'er"
console.log(escapeString(sqlString)) // => Sup''er
