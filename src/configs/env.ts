// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

export const SERVER = {
  domain: process.env.SISHO_DOMAIN ?? 'http://localhost:3000'
}

export const SISHOPGC = {
  name: 'sishoPGC',
  connector: 'postgresql',
  host: process.env.SISHO_PGC_HOST ?? 'localhost',
  port: process.env.SISHO_PGC_PORT ?? 5432,
  user: process.env.SISHO_PGC_USER ?? 'postgres',
  password: process.env.SISHO_PGC_PASSWORD ?? 'postgres',
  database: process.env.SISHO_PGC_DATABASE ?? 'sisho'
}
