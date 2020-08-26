// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouteConfig } from 'vue-router'
import Root from '@/router/RootRouter'
import Activate from '@/router/ActivateRouter'
import Login from '@/router/LoginRouter'
import app from '@/router/AppRouter'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [Root, Activate, Login, app]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
