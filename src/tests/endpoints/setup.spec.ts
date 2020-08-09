// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Application } from '../..'
import { createRestAppClient } from '@loopback/testlab'
import { givenHttpServerConfig } from '@loopback/testlab'
import { Client } from '@loopback/testlab'

/**
 * Setup the application with the client.
 */
export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({})

  const app = new Application({
    rest: restConfig
  })

  await app.boot()
  await app.start()

  const client = createRestAppClient(app)

  return { app, client }
}

export interface AppWithClient {
  app: Application
  client: Client
}
