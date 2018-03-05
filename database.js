const alasql = require('alasql')
const db = new alasql.Database()

db.exec('CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name STRING)')
db.exec('CREATE TABLE items (id INT, name STRING, userId INT REFERENCES users(id))')

module.exports = db
