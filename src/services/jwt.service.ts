// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { TokenService } from '@loopback/authentication'
import { UserProfile } from '@loopback/security'
import { HttpErrors } from '@loopback/rest'
import { inject } from '@loopback/context'
import { TokenBindings } from '../keys'
import { promisify } from 'util'

const jwt = require('jsonwebtoken')
const signAsync = promisify(jwt.sign)
const verifyAsync = promisify(jwt.verify)

export class JWTService implements TokenService {
  constructor(
    @inject(TokenBindings.SECRET) private jwtSecret: string,
    @inject(TokenBindings.EXPIRES_IN) private jwtExpiresIn: string
  ) {}

  // eslint-disable-next-line
  // @ts-ignore
  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized('NO_TOKEN')
    }

    let userProfile: UserProfile

    try {
      // decode user profile from token
      const decryptedToken = await verifyAsync(token, this.jwtSecret)
      // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
      // eslint-disable-next-line
      // @ts-ignore
      userProfile = Object.assign(
        { id: '', name: '' },
        { id: decryptedToken.id, name: decryptedToken.name }
      )
    } catch (error) {
      throw new HttpErrors.Unauthorized('TOKEN_EXPIRED')
    }

    return userProfile
  }

  // eslint-disable-next-line
  // @ts-ignore
  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized('Error generating token: userProfile is null')
    }

    // Generate a JSON Web Token
    let token: string
    try {
      token = await signAsync(userProfile, this.jwtSecret, {
        expiresIn: Number(this.jwtExpiresIn)
      })
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token: ${error}`)
    }

    return token
  }
}
