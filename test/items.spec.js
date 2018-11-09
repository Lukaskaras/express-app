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
  username: 'testUser',
  password: 'testPassword'
}

describe('Items', () => {
  test('Create user, login', () => {
    return request(app)
      .post('/users')
      .send(userBody)
      .expect(200)
      .then(() => request(app)
        .post('/login')
        .send(userBody)
        .expect(200)
        .then((res) => {
          expect(JSON.parse(res.text)).toEqual({
            token: userBody.username
          })
        })
      )
  })
  test('Get item by id', () => {
    return request(app)
      .get(`/items/${itemBody.id}`)
      .set('Authorization', `bearer ${userBody.username}`)
      .expect(200)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual((itemBody))
      })
  })
  test('Get all items', () => {
    return request(app)
      .get('/items')
      .expect(200)
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
