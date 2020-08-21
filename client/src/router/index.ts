import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouteConfig } from 'vue-router'
import Root from '@/router/RootRouter'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [Root]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
