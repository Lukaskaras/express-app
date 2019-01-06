const request = require('supertest')
const sinon = require('sinon')
const app = require('../../app')
const { expect } = require('chai')
const ListItem = require('../../src/models/list-item')

describe('/list-items', async () => {
  it('should store list items', async () => {
    const createListItemStub = sinon.stub(ListItem, 'create')
    createListItemStub.resolves({ _id: '1' })
    const response = await request(app)
      .post('/list-items')
      .send({
        name: 'testItem',
        quantity: 1,
        uid: '23'
      })
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
      .expect(200)
    expect(response.body._id).to.equal('1')
    createListItemStub.restore()
  })
  it('should retrieve list items', async () => {
    const findListItemStub = sinon.stub(ListItem, 'find')
    findListItemStub.resolves([{
      _id: '1'
    }])
    const response = await request(app)
      .get('/list-items/1')
      .expect(200)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
    expect(response.body[0]._id).to.equal('1')
    findListItemStub.restore()
  })
  it('should delete list item', async () => {
    const findByIdAndRemoveStub = sinon.stub(ListItem, 'findByIdAndRemove')
    findByIdAndRemoveStub.resolves({ _id: '1' })
    const response = await request(app)
      .delete('/list-items/1')
      .expect(200)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
    expect(response.body._id).to.equal('1')
    expect(findByIdAndRemoveStub.called).to.be.true
    findByIdAndRemoveStub.restore()
  })
})
