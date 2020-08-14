// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { HasOneRepositoryFactory } from '@loopback/repository'
import { DefaultCrudRepository } from '@loopback/repository'
import { repository } from '@loopback/repository'
import { Profile, ProfileRelations, User } from '../models'
import { SishoPgcDataSource } from '../datasources'
import { inject, Getter } from '@loopback/core'
import { UserRepository } from './user.repository'

export class ProfileRepository extends DefaultCrudRepository<
  Profile,
  typeof Profile.prototype.id,
  ProfileRelations
> {
  public readonly user: HasOneRepositoryFactory<User, typeof Profile.prototype.id>

  constructor(
    @inject('datasources.sishoPGC') dataSource: SishoPgcDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>
  ) {
    super(Profile, dataSource)
    this.user = this.createHasOneRepositoryFactoryFor('user', userRepositoryGetter)
    this.registerInclusionResolver('user', this.user.inclusionResolver)
  }
}
