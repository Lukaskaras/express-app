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

describe('Items', () => {
  test('Create user, add item', () => {
    return request(app)
      .post('/users')
      .send(userBody)
      .expect(200)
      .then(() => request(app)
        .post('/items')
        .send(itemBody)
        .expect(200)
      )
  })
  test('Get item by id', () => {
    return request(app)
      .get(`/items/${itemBody.id}`)
      .expect(200)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual((itemBody))
      })
  })
  test('Delete item by id', () => {
    return request(app)
      .delete(`/items/${itemBody.id}`)
      .expect(200)
      .then(() => request(app)
        .get(`/items/${itemBody.id}`)
        .expect(404)
      )
  })
  test('Add items, delete all', () => {
    return request(app)
      .post('/items')
      .send({name: itemBody.name, userId: userBody.id, quantity: itemBody.quantity, unit: itemBody.unit})
      .expect(200)
      .then(() => request(app)
        .post('/items')
        .send({name: itemBody.name, userId: userBody.id, quantity: itemBody.quantity, unit: itemBody.unit})
        .expect(200)
      ).then(() => request(app)
        .delete(`/items/user/${userBody.id}`)
        .expect(200)
      ).then(() => request(app)
        .get(`/items/${itemBody.id}`)
        .expect(404)
      )
  })
})