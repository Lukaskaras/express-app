const request = require('supertest')
const app = require('../app')
const db = require('../database')

const itemBody = {
  id: 1,
  name: 'testItem',
  userId: 1
}

describe('Items', () => {
  return request(app)
    .post('/items')
    .send(itemBody)
    .expect(200)
})
