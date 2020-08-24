// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { RouteConfig } from 'vue-router'
const RootRoutes: RouteConfig = {
  path: '/',
  name: 'Root',
  component: () => import('@/views/root/RootPage.vue')
}
export default RootRoutes
