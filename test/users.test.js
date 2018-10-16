const request = require('supertest')
const app = require('../app')
const db = require('../database')

const userBody = {
  id: 1,
  username: 'testUser',
  password: 'testPassword'
}

describe('Users', () => {
  test('Create new user', () => {
    return request(app)
      .post('/users')
      .send(userBody)
      .expect(200)
  })

  test('Get user by id', () => {
    return request(app)
      .get(`/users/${userBody.id}`)
      .expect(200)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(userBody)
      })
  })
})
