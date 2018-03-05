const request = require('supertest')
const app = require('../app')
const db = require('../database')

const userBody = {
  id: 1,
  name: 'testUser'
}

describe('Users', () => {
  test('When creating new user, user is created', () => {
    return request(app)
      .post('/user')
      .send(userBody)
      .expect(200)
  })

  test('User is stored in database', () => {
    const result = db.exec(`SELECT * FROM users WHERE id=${userBody.id}`)
    expect(result[0]).toEqual(userBody)
  })

  test('/user - Get user', () => {
    return request(app)
      .get(`/user/${userBody.id}`)
      .expect(200)
      .then((res) => {
        expect(JSON.parse(res.text)).toEqual(userBody)
      })
  })
})
