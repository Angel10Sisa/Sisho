// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor
} from '@loopback/repository'
import { User, UserRelations, Role } from '../models'
import { SishoDataSource } from '../datasources'
import { inject, Getter } from '@loopback/core'
import { RoleRepository } from './role.repository'

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly role: BelongsToAccessor<Role, typeof User.prototype.id>

  constructor(
    @inject('datasources.sishoPGC') dataSource: SishoDataSource,
    @repository.getter('RoleRepository')
    protected roleRepositoryGetter: Getter<RoleRepository>
  ) {
    super(User, dataSource)
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter)
    this.registerInclusionResolver('role', this.role.inclusionResolver)
  }
}
