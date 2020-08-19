// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { authenticate } from '@loopback/authentication'
import { Filter, repository } from '@loopback/repository'
import { get, param } from '@loopback/rest'
import { Module } from '../models'
import { RoleRepository } from '../repositories'
import spec from './specs/module.specs'

@authenticate('jwt')
export class RoleModuleController {
  constructor(@repository(RoleRepository) protected roleRepository: RoleRepository) {}

  @get(
    '/api/role/{id}/modules',
    spec.responseList('Array of Role has many Module through Permission')
  )
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Module>
  ): Promise<Module[]> {
    return this.roleRepository.modules(id).find(filter)
  }
}
