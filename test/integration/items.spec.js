const request = require('supertest')
const sinon = require('sinon')
const app = require('../../app')
const { expect } = require('chai')
const Item = require('../../src/models/item')

describe('/items', async () => {
  it('should store items', async () => {
    const createItemStub = sinon.stub(Item, 'create')
    createItemStub.resolves({ _id: '1' })
    const response = await request(app)
      .post('/items')
      .send({
        name: 'testItem',
        quantity: 1,
        uid: '23'
      })
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
      .expect(200)
    expect(response.body._id).to.equal('1')
    createItemStub.restore()
  })
  it('should retrieve all items', async () => {
    const findItemStub = sinon.stub(Item, 'find')
    findItemStub.resolves([{
      _id: '1',
      name: 'test'
    }])
    const response = await request(app)
      .get('/items')
      .expect(200)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
    expect(response.body).to.deep.equal([{
      _id: '1',
      name: 'test'
    }])
    findItemStub.restore()
  })
  it('should delete item', async () => {
    const findByIdAndRemoveStub = sinon.stub(Item, 'findByIdAndRemove')
    findByIdAndRemoveStub.resolves({ _id: '1' })
    const response = await request(app)
      .delete('/items/1')
      .expect(200)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
    expect(response.body._id).to.equal('1')
    expect(findByIdAndRemoveStub.called).to.be.true
    findByIdAndRemoveStub.restore()
  })
})
