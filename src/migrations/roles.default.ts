// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Role } from '../models'

export const DEFAULT_ADMIN_ROLE: Role = new Role({
  createdBy: 0,
  name: 'Admin',
  description: 'Usuario de administración'
})

/**
 * Default roles.
 */
export const ROLES: Role[] = [DEFAULT_ADMIN_ROLE]
