// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Crud } from '@/services/Service'
import { patch } from '@/services/Service'
import { post } from '@/services/Service'
import { get } from '@/services/Service'
import { del } from '@/services/Service'
import { Filter } from '@/utils/query'
import { Where } from '@/utils/query'
import { Profile } from '@/models'

class ProfileService implements Crud<Profile> {
  /**
   * Create a new profile record.
   * @param profile profile to create
   */
  async create(profile: Partial<Profile>): Promise<Profile> {
    const res = await post('/api/profile', profile)
    const data: Profile = res.json()
    return data
  }

  /**
   * Count profile records.
   * @param where search filter
   */
  async count(where?: Where<Profile>): Promise<number> {
    const res = await get('/api/profiles/count', { where })
    const data = await res.json()
    return data.count
  }

  /**
   * Search profile records.
   * @param filter search filter
   */
  async find(filter?: Filter<Profile>): Promise<Profile[]> {
    const res = await get('/api/profiles', { filter })
    const data: Profile[] = await res.json()
    return data
  }

  /**
   * Search for a specific profile record.
   * @param id registration code
   * @param filter search filter
   */
  async findById(id: number, filter?: Filter<Profile>): Promise<Profile> {
    const res = await get({ url: '/api/profile/{id}', params: { id } }, { filter })
    const data: Profile = await res.json()
    return data
  }

  /**
   * Update a specific profile record.
   * @param id registration code
   * @param profile profile to update
   */
  async updateById(id: number, profile: Partial<Profile>): Promise<void> {
    await patch({ url: '/api/profile/{id}', params: { id } }, profile)
  }

  /**
   * Delete a specific profile record.
   * @param id
   */
  async delete(id: number): Promise<void> {
    await del({ url: '/api/profile/{id}', params: { id } })
  }
}
export default new ProfileService()
