// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { repository, Filter } from '@loopback/repository'
import { authenticate } from '@loopback/authentication'
import { get, param } from '@loopback/rest'
import { Group } from '../models'
import { GroupRepository } from '../repositories'
import spect from './specs/group.specs'

@authenticate('jwt')
export class GroupController {
  constructor(@repository(GroupRepository) public groupRepo: GroupRepository) {}

  @get('/api/groups', spect.responseList())
  async find(@param.filter(Group) filter?: Filter<Group>): Promise<Group[]> {
    return this.groupRepo.find(filter)
  }
}
