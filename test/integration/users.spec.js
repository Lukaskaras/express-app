const request = require('supertest')
const sinon = require('sinon')
const app = require('../../app')
const { expect } = require('chai')
const User = require('../../src/models/user')

describe('/users', async () => {
  it('should store users', async () => {
    const createUserStub = sinon.stub(User, 'create')
    createUserStub.resolves({_id: '1'})
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
  })
})
