// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { TokenService } from '@loopback/authentication'
import { UserService } from '@loopback/authentication'
import { BindingKey } from '@loopback/context'
import { DecryptedHasher } from './services'
import { AccountService } from './services'
import { Credentials } from './utils'
import { User } from './models'

export namespace PasswordBindings {
  export const HASHER = BindingKey.create<DecryptedHasher>('services.hasher')
  export const ROUNDS = BindingKey.create<number>('services.hasher.round')
}

export namespace UserBindings {
  export const SERVICE = BindingKey.create<UserService<User, Credentials>>(
    'services.user.service'
  )
}

export namespace AccountBindings {
  export const SERVICE = BindingKey.create<AccountService>('services.account.service')
}

export namespace TokenBindings {
  export const SECRET = BindingKey.create<string>('authentication.jwt.secret')
  export const EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds'
  )
  export const SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice'
  )
}
