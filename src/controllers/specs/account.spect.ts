// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { OPERATION_SECURITY_SPEC } from '../../auth'
import { OperationObject } from '@loopback/rest'
import { getModelSchemaRef } from '@loopback/rest'
import { RequestBodyObject } from '@loopback/rest'
import { User } from '../../models'

/**
 * specifications to response the access token.
 */
export function logged(): OperationObject {
  return {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string'
                },
                duration: {
                  type: 'number'
                }
              }
            }
          }
        }
      }
    }
  }
}

/**
 * Specifications to request login
 */
export function login(): RequestBodyObject {
  return {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            password: {
              type: 'string',
              minLength: 8
            }
          }
        }
      }
    }
  }
}

/**
 * Specifications to request login
 */
export function toActivate(): RequestBodyObject {
  return {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['email', 'verificationToken', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email'
            },
            verificationToken: {
              type: 'string'
            },
            password: {
              type: 'string',
              minLength: 8
            }
          }
        }
      }
    }
  }
}

/**
 * specifications to response information about logged account
 */
export function me(): OperationObject {
  return {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {
              title: 'CreatedUser',
              exclude: [
                'deleted',
                'deletedAt',
                'password',
                'emailVerified',
                'passResetToken'
              ]
            })
          }
        }
      }
    }
  }
}
