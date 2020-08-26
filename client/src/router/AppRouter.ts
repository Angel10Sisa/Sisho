// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { RouteConfig } from 'vue-router'
const ActivateRoutes: RouteConfig = {
  path: '/app',
  name: 'App',
  component: () => import('@/layouts/app/AppLayout.vue'),
  children: [
    {
      path: '/hospital',
      name: 'Hospital',
      component: () => import('@/views/hospital/HospitalPage.vue')
    },
    {
      path: '/options',
      name: 'Options',
      component: () => import('@/views/option/GroupPage.vue')
    }
  ]
}
export default ActivateRoutes
