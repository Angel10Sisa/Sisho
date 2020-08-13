// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject } from '@loopback/core'
import { requestBody, post, get, HttpErrors } from '@loopback/rest'
import { TokenService } from '@loopback/authentication'
import { UserService } from '@loopback/authentication'
import { authenticate } from '@loopback/authentication'
import { SecurityBindings } from '@loopback/security'
import { UserProfile } from '@loopback/security'
import { repository } from '@loopback/repository'
import { UserRepository } from '../repositories'
import { Credentials } from 'crypto'
import * as spect from './specs/account.spect'
import { DecryptedHasher } from '../services'
import { AccountService } from '../services'
import { PasswordBindings } from '../keys'
import { AccountBindings } from '../keys'
import { TokenBindings } from '../keys'
import { UserBindings } from '../keys'
import { TOKEN } from '../configs'
import { User } from '../models'

export class AccountController {
  constructor(
    @inject(UserBindings.SERVICE) public userService: UserService<User, Credentials>,
    @inject(AccountBindings.SERVICE) public acountService: AccountService,
    @inject(TokenBindings.SERVICE) public jwtService: TokenService,
    @inject(PasswordBindings.HASHER) public bcrypt: DecryptedHasher,
    @repository(UserRepository) public userRepo: UserRepository
  ) {}

  @post('/api/account/login', spect.logged())
  async login(
    @requestBody(spect.login())
    credentials: Credentials
  ): Promise<{ token: string; duration: number }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials)

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user)

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile)

    return { token, duration: Number(TOKEN.expiresIn) }
  }

  @post('/api/account/activate', spect.logged())
  async activate(
    @requestBody(spect.toActivate()) verifier: Verifier
  ): Promise<{ token: string; duration: number }> {
    let token = ''
    const user = await this.userRepo.findOne({
      where: { email: verifier.email }
    })
    if (user) {
      if (user.verificationToken === verifier.verificationToken) {
        //activate account
        await this.userRepo.updateById(user.id, {
          emailVerified: true,
          verificationToken: '',
          password: await this.bcrypt.encrypt(verifier.password)
        })

        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user)

        // create a JSON Web Token based on the user profile
        token = await this.jwtService.generateToken(userProfile)
      } else {
        throw new HttpErrors.Unauthorized('BAD_TOKEN')
      }
    } else {
      throw new HttpErrors.BadRequest('BAD_ACCOUNT')
    }
    return { token, duration: Number(TOKEN.expiresIn) }
  }

  @authenticate('jwt')
  @get('/api/account/me', spect.me())
  async currentUser(@inject(SecurityBindings.USER) session: UserProfile): Promise<User> {
    return this.acountService.convertToUser(session)
  }
}

type Verifier = {
  email: string
  verificationToken: string
  password: string
}
