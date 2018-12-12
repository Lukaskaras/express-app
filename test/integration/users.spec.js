const request = require('supertest')
const sinon = require('sinon')
const app = require('../../app')
const { expect } = require('chai')
const User = require('../../src/models/user')
const jwt = require('jsonwebtoken')
const { isCorrectPassword } = require('../../src/helpers/auth')
const bcrypt = require('bcrypt')

describe('/users', async () => {
  it('should store users', async () => {
    const createUserStub = sinon.stub(User.prototype, 'save')
    createUserStub.resolves({_id: '1'})
    const findUserStub = sinon.stub(User, 'findOne')
    findUserStub.returns({
      lean: () => {
        return null
      }
    })
    const response = await request(app)
      .post('/users/register')
      .send({
        email: 'test@user.sk',
        password: 'test',
        name: 'test',
        uid: 23
      })
      .expect(200)
    expect(response.body._id).to.equal('1')
    findUserStub.restore()
  })
  it('should log user in', async () => {
    const bcryptCompareStub = sinon.stub(bcrypt, 'compare')
    bcryptCompareStub.returns(true)
    const findUserStub = sinon.stub(User, 'findOne')
    findUserStub.returns({
      lean: () => {
        return {
          _id: 'testId',
          email: 'test@test.sk',
          password: 'test',
          uid: 1,
          name: 'testName'
        }
      }
    })
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'test@test.sk',
        password: 'test'
      })
      .expect(200)
    const token = jwt.decode(response.body.token)
    expect(token.email).to.equal('test@test.sk')
    bcryptCompareStub.restore()
    findUserStub.restore()
  })
})
