// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { post } from '@/services/Service'
import { get } from '@/services/Service'
import { User } from '@/models'

interface Session {
  token: string
  expiresAt: number
}

class AccountService {
  /**
   * Request to obtain the access token.
   * @param email
   * @param password
   */
  async login(email: string, password: string): Promise<Session> {
    const res = await post('/api/account/login', { email, password })
    const data = await res.json()
    const token: string = `Bearer ${data.token}`

    return { token, expiresAt: data.expiresAt }
  }

  /**
   * Request for information on a logged account.
   */
  async me(): Promise<User> {
    const res = await get('/api/account/me')
    return res.json()
  }

  /**
   * Request to activate an account.
   * @param email
   * @param password
   * @param verificationToken
   */
  async activate(
    email: string,
    password: string,
    verificationToken: string
  ): Promise<Session> {
    const res = await post('/api/account/activate', {
      email,
      password,
      verificationToken
    })
    const data = await res.json()

    const token: string = `Bearer ${data.token}`

    return { token, expiresAt: data.expiresAt }
  }
}

export default new AccountService()
