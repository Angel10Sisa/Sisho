// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { model } from '@loopback/repository'
import { Audit } from '.'
import { id } from './pg'
import { character } from './pg'

@model({
  settings: {
    indexes: {
      uniqueOptionCombination: {
        keys: { name: 1, group: 1 },
        options: { unique: true }
      }
    }
  }
})
export class Option extends Audit {
  @id() id?: number

  @character({ required: true, length: 30, columnName: 'cgroup' }) group: string

  @character({ required: true, length: 75 }) name: string

  constructor(data?: Partial<Option>) {
    super(data)
  }
}

export interface OptionRelations {
  // describe navigational properties here
}

export type OptionWithRelations = Option & OptionRelations
