const alasql = require('alasql')
const db = new alasql.Database()

db.exec('CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name STRING)')
db.exec('CREATE TABLE items (id INT AUTO_INCREMENT, name STRING, userId INT REFERENCES users(id), quantity INT, unit STRING)')

module.exports = db
