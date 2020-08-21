import { RouteConfig } from 'vue-router'
const RootRoutes: RouteConfig = {
  path: '/',
  name: 'Root',
  component: () => import('@/views/root/RootPage.vue')
}
export default RootRoutes
