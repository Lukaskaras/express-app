const alasql = require('alasql')
const db = new alasql.Database()

db.exec('CREATE TABLE users (id INT, name STRING)')
db.exec('CREATE TABLE shoppingLists (id INT, name STRING)')

module.exports = db
