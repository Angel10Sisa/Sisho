// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core'
import { juggler } from '@loopback/repository'
import { SISHOPGC } from '../configs'

const config = SISHOPGC

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SishoPgcDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'sishoPGC'
  static readonly defaultConfig = config

  constructor(
    @inject('datasources.config.sishoPGC', { optional: true })
    dsConfig: object = config
  ) {
    super(dsConfig)
  }
}
