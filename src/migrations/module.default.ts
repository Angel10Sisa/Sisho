// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Module } from '../models'

export const PERMISSION: Module = new Module({ id: 1, name: 'permissions' })
export const PROFILE: Module = new Module({ id: 2, name: 'profiles' })
export const COMPANY: Module = new Module({ id: 3, name: 'company' })
export const MODULE: Module = new Module({ id: 4, name: 'modules' })
export const OPTION: Module = new Module({ id: 5, name: 'options' })
export const ROLE: Module = new Module({ id: 6, name: 'roles' })
export const USER: Module = new Module({ id: 7, name: 'users' })

/**
 * Default modules.
 */
export const MODULES: Module[] = [
  COMPANY,
  MODULE,
  OPTION,
  PERMISSION,
  PROFILE,
  ROLE,
  USER
]
