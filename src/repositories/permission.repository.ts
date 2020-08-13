// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository } from '@loopback/repository'
import { Permission, PermissionRelations } from '../models'
import { SishoDataSource } from '../datasources'
import { inject } from '@loopback/core'

export class PermissionRepository extends DefaultCrudRepository<
  Permission,
  typeof Permission.prototype.id,
  PermissionRelations
> {
  constructor(@inject('datasources.sishoPGC') dataSource: SishoDataSource) {
    super(Permission, dataSource)
  }
}
