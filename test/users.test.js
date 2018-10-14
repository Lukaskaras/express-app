const request = require('supertest')
const app = require('../app')
const db = require('../database')

const userBody = {
  id: 1,
  name: 'testUser'
}

describe('Users', () => {
  test('Create new user', () => {
    return request(app)
      .post('/users')
      .send(userBody)
      .expect(200)
  })

  test('User is stored in database', () => {
    const result = db.exec(`SELECT * FROM users WHERE id=${userBody.id}`)
    expect(result[0]).toEqual(userBody)
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
