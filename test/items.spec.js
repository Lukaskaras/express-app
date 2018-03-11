const request = require('supertest')
const app = require('../app')
const db = require('../database')

const itemBody = {
  id: 1,
  name: 'testItem',
  userId: 1,
  quantity: 1,
  unit: 'kg'
}

const userBody = {
  id: 1,
  name: 'testUser'
}

describe('Item', () => {
  test('Create user, add item', () => {
    return request(app)
      .post('/user')
      .send(userBody)
      .expect(200)
      .then(() => request(app)
        .post('/item')
        .send(itemBody)
        .expect(200)
      )
  })
  test('Get item by id', () => {
    return request(app)
      .get(`/item/${itemBody.id}`)
      .expect(200)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual((itemBody))
      })
  })
  test('Delete item by id', () => {
    return request(app)
      .delete(`/item/${itemBody.id}`)
      .expect(200)
      .then(() => request(app)
        .get(`/item/${itemBody.id}`)
        .expect(404)
      )
  })
})
