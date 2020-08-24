// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { RouteConfig } from 'vue-router'
const ActivateRoutes: RouteConfig = {
  path: '/activate',
  name: 'Activate',
  component: () => import('@/views/activate/ActivatePage.vue')
}
export default ActivateRoutes
