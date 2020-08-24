// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { RouteConfig } from 'vue-router'
const LoginRoutes: RouteConfig = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/LoginPage.vue')
}
export default LoginRoutes
