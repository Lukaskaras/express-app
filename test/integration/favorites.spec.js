const request = require('supertest')
const sinon = require('sinon')
const app = require('../../app')
const { expect } = require('chai')
const FavoriteItem = require('../../src/models/favorite-item')

describe('/favorites', async () => {
  it('should store favorite items', async () => {
    const createFavoriteStub = sinon.stub(FavoriteItem, 'create')
    createFavoriteStub.resolves({ _id: '1' })
    const response = await request(app)
      .post('/favorites')
      .send({
        name: 'testItem',
        uid: '23'
      })
      .expect(200)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
    expect(response.body._id).to.equal('1')
    createFavoriteStub.restore()
  })
  it('should retrieve favorites', async () => {
    const findFavoriteStub = sinon.stub(FavoriteItem, 'find')
    findFavoriteStub.resolves([{
      _id: '1'
    }])
    const response = await request(app)
      .get('/favorites/1')
      .expect(200)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
    expect(response.body[0]._id).to.equal('1')
    findFavoriteStub.restore()
  })
  it('should delete favorite item', async () => {
    const findByIdAndRemoveStub = sinon.stub(FavoriteItem, 'findByIdAndRemove')
    findByIdAndRemoveStub.resolves({ _id: '1' })
    const response = await request(app)
      .delete('/favorites/1')
      .expect(200)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
    expect(response.body._id).to.equal('1')
    expect(findByIdAndRemoveStub.called).to.be.true
    findByIdAndRemoveStub.restore()
  })
})
