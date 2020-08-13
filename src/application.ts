// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { BootMixin } from '@loopback/boot'
import { ApplicationConfig } from '@loopback/core'
import { RestExplorerComponent } from '@loopback/rest-explorer'
import { RestExplorerBindings } from '@loopback/rest-explorer'
import { RepositoryMixin } from '@loopback/repository'
import { RestApplication } from '@loopback/rest'
import { ServiceMixin } from '@loopback/service-proxy'
import path from 'path'
import { MySequence } from './sequence'
import { PasswordBindings } from './keys'
import { BcryptHasher } from './services'

export { ApplicationConfig }

export class Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication))
) {
  constructor(options: ApplicationConfig = {}) {
    super(options)

    // setup bindings
    this.setUpBindings()

    // Set up the custom sequence
    this.sequence(MySequence)

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'))

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/api/explorer'
    })
    this.component(RestExplorerComponent)

    this.projectRoot = __dirname
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true
      }
    }
  }

  setUpBindings(): void {
    // Bind bcrypt hash services
    this.bind(PasswordBindings.ROUNDS).to(10)
    this.bind(PasswordBindings.HASHER).toClass(BcryptHasher)
  }
}
