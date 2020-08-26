// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

/**
 * Verify if exists a valid access token.
 */
export function hasValidToken(): boolean {
  let isValid: boolean = false
  const token = sessionStorage.getItem('token')
  const expiresAt = sessionStorage.getItem('expiresAt')
  if (expiresAt && token) {
    const now = new Date()
    isValid = now.getTime() < Number(expiresAt) * 1000
  }
  return isValid
}
