// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { BindingKey } from '@loopback/context'
import { DecryptedHasher } from './services'

export namespace PasswordBindings {
  export const HASHER = BindingKey.create<DecryptedHasher>('services.hasher')
  export const ROUNDS = BindingKey.create<number>('services.hasher.round')
}
