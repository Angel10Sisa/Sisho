// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Group } from '../models'

export const BLOODTYPE: Group = new Group({ id: 1, name: 'Tipo de sangre' })

/**
 * Default groups.
 */
export const GROUPS: Group[] = [BLOODTYPE]
