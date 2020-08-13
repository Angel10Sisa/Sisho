// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Profile } from '../models'
import { Module } from '../models'
import { Option } from '../models'
import { User } from '../models'
import { Role } from '../models'

/**
 * Default admin role.
 */
export const DEFAULT_ADMIN_ROLE: Role = new Role({
  createdBy: 0,
  name: 'Admin',
  description: 'Usuario de administración'
})
/**
 * Default admin user
 */

export const DEFAULT_ADMIN: User = new User({
  createdBy: 0,
  email: 'admin@sifme.com',
  password: 'adminP4$$',
  isActive: true,
  emailVerified: true
})

export const DEFAULT_PROFILE: Profile = new Profile({
  createdBy: 0,
  firstName: 'admin',
  lastName: 'sifme',
  email: DEFAULT_ADMIN.email,
  address: 'my address'
})

/**
 * System modules
 */
export namespace MODULE {
  export namespace COMPANY {
    export const ID = 1
    export const NAME = 'company'
  }
  export namespace MODULES {
    export const ID = 2
    export const NAME = 'modules'
  }
  export namespace OPTIONS {
    export const ID = 3
    export const NAME = 'options'
  }
  export namespace PERMISSIONS {
    export const ID = 4
    export const NAME = 'permissions'
  }
  export namespace PROFILES {
    export const ID = 5
    export const NAME = 'profiles'
  }
  export namespace ROLES {
    export const ID = 6
    export const NAME = 'roles'
  }
  export namespace USERS {
    export const ID = 7
    export const NAME = 'users'
  }
}

/**
 * Default options.
 */
export const DEFAULT_MODULES: Module[] = [
  new Module({ id: MODULE.COMPANY.ID, name: MODULE.COMPANY.NAME }),
  new Module({ id: MODULE.MODULES.ID, name: MODULE.MODULES.NAME }),
  new Module({ id: MODULE.OPTIONS.ID, name: MODULE.OPTIONS.NAME }),
  new Module({ id: MODULE.PERMISSIONS.ID, name: MODULE.PERMISSIONS.NAME }),
  new Module({ id: MODULE.PROFILES.ID, name: MODULE.PROFILES.NAME }),
  new Module({ id: MODULE.ROLES.ID, name: MODULE.ROLES.NAME }),
  new Module({ id: MODULE.USERS.ID, name: MODULE.USERS.NAME })
]

/**
 * Default options.
 */
export const DEFAULT_OPTIONS: Option[] = [
  new Option({ createdBy: 0, group: 'sangre', name: ' A -' }),
  new Option({ createdBy: 0, group: 'sangre', name: ' A +' }),
  new Option({ createdBy: 0, group: 'sangre', name: 'AB -' }),
  new Option({ createdBy: 0, group: 'sangre', name: 'AB +' }),
  new Option({ createdBy: 0, group: 'sangre', name: ' B -' }),
  new Option({ createdBy: 0, group: 'sangre', name: ' B +' }),
  new Option({ createdBy: 0, group: 'sangre', name: ' O -' }),
  new Option({ createdBy: 0, group: 'sangre', name: ' O +' })
]
