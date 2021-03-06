// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { OperationObject } from '@loopback/rest'

/**
 * specifications to response for app info.
 */
export function app(): OperationObject {
  return {
    responses: {
      '200': {
        title: 'Application',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                version: { type: 'string' },
                company: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    logo: { type: 'string' },
                    primaryColor: { type: 'string' },
                    secondaryColor: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

export default app()
