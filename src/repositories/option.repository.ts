// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository } from '@loopback/repository'
import { BelongsToAccessor } from '@loopback/repository'
import { repository } from '@loopback/repository'
import { Option, OptionRelations, Group } from '../models'
import { SishoPgcDataSource } from '../datasources'
import { inject, Getter } from '@loopback/core'
import { GroupRepository } from './group.repository'

export class OptionRepository extends DefaultCrudRepository<
  Option,
  typeof Option.prototype.id,
  OptionRelations
> {
  public readonly group: BelongsToAccessor<Group, typeof Option.prototype.id>

  constructor(
    @inject('datasources.sishoPGC') dataSource: SishoPgcDataSource,
    @repository.getter('GroupRepository')
    protected groupRepositoryGetter: Getter<GroupRepository>
  ) {
    super(Option, dataSource)
    this.group = this.createBelongsToAccessorFor('group', groupRepositoryGetter)
    this.registerInclusionResolver('group', this.group.inclusionResolver)
  }
}
