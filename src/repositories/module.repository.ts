// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository } from '@loopback/repository'
import { Module, ModuleRelations } from '../models'
import { SishoPgcDataSource } from '../datasources'
import { inject } from '@loopback/core'

export class ModuleRepository extends DefaultCrudRepository<
  Module,
  typeof Module.prototype.id,
  ModuleRelations
> {
  constructor(@inject('datasources.sishoPGC') dataSource: SishoPgcDataSource) {
    super(Module, dataSource)
  }
}
