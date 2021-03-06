// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Client, expect } from '@loopback/testlab'
import { Application } from '../..'
import { setupApplicationWithToken } from './setup.spec'
import { ProfileRepository } from '../../repositories'
import { UserRepository } from '../../repositories'
import { RoleRepository } from '../../repositories'
import { DEFAULT_ADMIN_ROLE } from '../../migrations'
import { User, Profile, Role } from '../../models'
import { message, random } from '../../utils'

let app: Application
let client: Client
let token: string
let session: User
let testModel: User
let profileModel: Profile
let roleModel: Role | null

const clearUpdated = async () => {
  const repo = await app.getRepository(UserRepository)
  await repo.updateById(testModel.id, { editedAt: undefined, editedBy: undefined })
}

const wasEdited = async (): Promise<boolean> => {
  const repo = await app.getRepository(UserRepository)
  const result = await repo.findById(testModel.id)
  return result.editedAt !== null && result.editedBy === session.id
}

before('setupApplication', async () => {
  ;({ app, client, token, session } = await setupApplicationWithToken())

  const repo = await app.getRepository(RoleRepository)
  roleModel = await repo.findOne({ where: { name: DEFAULT_ADMIN_ROLE.name } })

  const profileRepo = await app.getRepository(ProfileRepository)
  profileModel = await profileRepo.create({
    createdBy: session.id,
    lastName: `ln${Date.now()}`,
    firstName: `fn${Date.now()}`,
    address: `address${Date.now()}`,
    email: random.email()
  })
})

after(async () => {
  await app.stop()
})

describe(message.withAccess('User'), () => {
  it('POST    =>  /api/user', async () => {
    await client
      .post(`/api/profile/${profileModel.id}/user`)
      .send({
        email: random.email(),
        roleId: roleModel?.id,
        profileId: profileModel.id
      })
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('createdAt').to.be.not.null()
        expect(res.body).to.have.property('createdBy').to.be.eql(session.id)
        expect(res.body).to.have.property('isActive').to.be.eql(true)
        expect(res.body).to.have.property('emailVerified').to.be.eql(false)
        // element created
        testModel = res.body
      })
  })

  it('GET     =>  /api/users/count', async () => {
    await client
      .get('/api/users/count')
      .query({})
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('count').to.be.Number()
      })
  })

  it('GET     =>  /api/users', async () => {
    await client
      .get('/api/users')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an.Array()
      })
  })

  it('PATCH   =>  /api/users', async () => {
    await client
      .patch('/api/users')
      .auth(token, { type: 'bearer' })
      .query({ where: { id: testModel.id } })
      .send({ email: `patch.${testModel.email}.edited` })
      .expect(200)
      .then(async res => {
        expect(res.body).to.have.property('count').to.be.Number()
        expect(await wasEdited()).to.be.eql(true)
        await clearUpdated()
      })
  })

  it('GET     =>  /api/user/{id}', async () => {
    await client
      .get(`/api/user/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('createdAt').to.be.equal(testModel.createdAt)
      })
  })

  it('PATCH   =>  /api/user/{id}', async () => {
    await client
      .patch(`/api/user/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .send({ email: `patch.${testModel.email}` })
      .expect(204)
      .then(async () => {
        expect(await wasEdited()).to.be.eql(true)
        await clearUpdated()
      })
  })

  it('DELETE  =>  /api/user/{id}', async () => {
    await client
      .delete(`/api/user/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204)
      .then(async () => {
        const userRepo = await app.getRepository(UserRepository)
        const result = await userRepo.findById(testModel.id)
        expect(result.deleted).to.be.eql(true)
        expect(result.deletedBy).to.be.eql(session.id)
        expect(result.deletedAt).to.be.not.null()
        await userRepo.deleteById(testModel.id)

        const profileRepo = await app.getRepository(ProfileRepository)
        await profileRepo.deleteById(result.profileId)
      })
  })
})

describe(message.noAccess('User'), () => {
  it('POST    =>  /api/user', async () => {
    await client.post('/api/profile/1/user').expect(401)
  })

  it('GET     =>  /api/users/count', async () => {
    await client.get('/api/users').expect(401)
  })

  it('GET     =>  /api/users', async () => {
    await client.get('/api/users').expect(401)
  })

  it('PATCH   =>  /api/users', async () => {
    await client.patch('/api/users').expect(401)
  })

  it('GET     =>  /api/user/{id}', async () => {
    await client.get('/api/user/1').expect(401)
  })

  it('PATCH   =>  /api/user/{id}', async () => {
    await client.patch('/api/user/1').expect(401)
  })

  it('DELETE  =>  /api/user/{id}', async () => {
    await client.delete('/api/user/1').expect(401)
  })
})
