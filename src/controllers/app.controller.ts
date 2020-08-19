// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject } from '@loopback/core'
import { RestBindings } from '@loopback/rest'
import { Request } from '@loopback/rest'
import { get } from '@loopback/rest'
import { app } from '../utils'
import spect from './specs/app.specs'

export class AppController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/api/app', spect)
  ping(): object {
    return app
  }
}
