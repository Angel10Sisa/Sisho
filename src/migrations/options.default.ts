// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Option } from '../models'
import { BLOODTYPE } from '.'
import { CIVILSTATUS } from '.'

/**
 * Default options.
 */
export const OPTIONS: Option[] = [
  new Option({ createdBy: 0, groupId: BLOODTYPE.id, name: ' A -' }),
  new Option({ createdBy: 0, groupId: BLOODTYPE.id, name: ' A +' }),
  new Option({ createdBy: 0, groupId: BLOODTYPE.id, name: 'AB -' }),
  new Option({ createdBy: 0, groupId: BLOODTYPE.id, name: 'AB +' }),
  new Option({ createdBy: 0, groupId: BLOODTYPE.id, name: ' B -' }),
  new Option({ createdBy: 0, groupId: BLOODTYPE.id, name: ' B +' }),
  new Option({ createdBy: 0, groupId: BLOODTYPE.id, name: ' O -' }),
  new Option({ createdBy: 0, groupId: BLOODTYPE.id, name: ' O +' }),

  new Option({ createdBy: 0, groupId: CIVILSTATUS.id, name: 'Soltero/a' }),
  new Option({ createdBy: 0, groupId: CIVILSTATUS.id, name: 'Casado/a' }),
  new Option({ createdBy: 0, groupId: CIVILSTATUS.id, name: 'Divorciado/a' }),
  new Option({ createdBy: 0, groupId: CIVILSTATUS.id, name: 'Viudo/a' })
]
