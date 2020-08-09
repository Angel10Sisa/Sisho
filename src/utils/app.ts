// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

const pkg = require('../../package.json')

export interface App {
  author: string
  name: string
  description: string
  version: string
}

export const app: App = {
  author: pkg.author,
  name: pkg.name,
  description: pkg.description,
  version: pkg.version
}
