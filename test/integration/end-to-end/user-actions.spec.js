const request = require('supertest')
const { expect } = require('chai')
const app = require('../../../app')

let itemId, listItemId, favoriteId
const userId = '5c3dff877c462653859ddb92'
const itemName = 'potato'
const user = {
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD
}

describe('User logs in, adds item, adds favorite', async () => {
  it('should log in', async () => {
    await request(app)
      .post('/users/login')
      .send(user)
      .expect(200)
  })
  it('should item', async () => {
    const item = {
      name: itemName
    }
    const resItem = await request(app)
      .post('/items')
      .send(item)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
      .expect(200)
    itemId = resItem.body._id
  })
  it('should find the item', async () => {
    const response = await request(app)
      .get(`/items/search?${itemName.substring(0, 2)}`)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
      .expect(200)
    expect(response.body).to.deep.equal([{
      __v: 0,
      _id: itemId,
      name: itemName
    }])
  })
  it('should add list item', async () => {
    const listItem = {
      quantity: 1,
      item: {
        name: itemName,
        itemId: itemId
      },
      userId
    }
    const resListItem = await request(app)
      .post('/list-items')
      .send(listItem)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
      .expect(200)
    listItemId = resListItem.body._id
  })
  it('should get list item', async () => {
    const response = await request(app)
      .get(`/list-items/${userId}`)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
      .expect(200)
    expect(response.body).to.deep.equal([
      {
        __v: 0,
        _id: listItemId,
        item: {
          itemId: itemId,
          name: itemName
        },
        quantity: 1,
        userId
      }
    ])
  })
  it('should add favorite item', async () => {
    const favorite = {
      item: {
        name: itemName,
        itemId: itemId
      },
      userId
    }
    const response = await request(app)
      .post('/favorites')
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
      .send(favorite)
      .expect(200)
    favoriteId = response.body._id
  })
  it('should get favorite item', async () => {
    const response = await request(app)
      .get(`/favorites/${userId}`)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
      .expect(200)
    expect(response.body).to.deep.equal([
      {
        __v: 0,
        _id: favoriteId,
        item: {
          itemId: itemId,
          name: itemName
        },
        userId
      }
    ])
  })
  after(async () => {
    await request(app)
      .delete(`/list-items/${listItemId}`)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
      .expect(200)
    await request(app)
      .delete(`/items/${itemId}`)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
      .expect(200)
    await request(app)
      .delete(`/favorites/${favoriteId}`)
      .set('x-access-token', '4c5192e4-0c8b-41cb-a9ed-bed32205f398')
      .expect(200)
  })
})
