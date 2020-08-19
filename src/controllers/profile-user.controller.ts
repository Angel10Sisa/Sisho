// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { authenticate } from '@loopback/authentication'
import { repository, Filter } from '@loopback/repository'
import { SecurityBindings } from '@loopback/security'
import { UserProfile } from '@loopback/security'
import { requestBody } from '@loopback/rest'
import { inject } from '@loopback/core'
import { param } from '@loopback/rest'
import { post } from '@loopback/rest'
import { get } from '@loopback/rest'
import { ProfileRepository } from '../repositories'
import { AccountService } from '../services'
import { AccountBindings } from '../keys'
import { Profile, User } from '../models'
import { random } from '../utils'
import spec from './specs/user.specs'

@authenticate('jwt')
export class ProfileUserController {
  constructor(
    @repository(ProfileRepository) protected profileRepository: ProfileRepository,
    @inject(AccountBindings.SERVICE) public acountService: AccountService
  ) {}

  @get('/api/profile/{id}/user', spec.responseOne('Profile has one User'))
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<User>
  ): Promise<User> {
    return this.profileRepository.user(id).get(filter)
  }

  @post('/api/profile/{id}/user', spec.responseOne())
  async create(
    @inject(SecurityBindings.USER) session: UserProfile,
    @param.path.number('id') id: typeof Profile.prototype.id,
    @requestBody(spec.requestBody()) user: Omit<User, 'id'>
  ): Promise<User> {
    user.createdBy = (await this.acountService.convertToUser(session)).id ?? 0
    user.verificationToken = random.emailVerifiedCode(user.email)
    return this.profileRepository.user(id).create(user)
  }
}
