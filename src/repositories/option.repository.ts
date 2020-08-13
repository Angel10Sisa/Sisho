// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository } from '@loopback/repository'
import { Option, OptionRelations } from '../models'
import { SishoDataSource } from '../datasources'
import { inject } from '@loopback/core'

export class OptionRepository extends DefaultCrudRepository<
  Option,
  typeof Option.prototype.id,
  OptionRelations
> {
  constructor(@inject('datasources.sishoPGC') dataSource: SishoDataSource) {
    super(Option, dataSource)
  }
}
